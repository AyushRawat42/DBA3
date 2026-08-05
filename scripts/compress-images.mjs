/**
 * Pre-compress oversized photos under public/images/.
 * - Targets files > 200 KB (jpg/jpeg/png)
 * - Max long edge: 2400px
 * - JPEG quality ~80 (mozjpeg)
 * - PNG: strip unused alpha where possible; high compression
 * - Overwrites in place; keeps the same filename/extension
 */
import { readdirSync, statSync, renameSync, unlinkSync } from "node:fs"
import { join, extname, dirname, basename } from "node:path"
import { fileURLToPath } from "node:url"
import sharp from "sharp"

const ROOT = join(fileURLToPath(new URL(".", import.meta.url)), "..", "public", "images")
const MIN_BYTES = 200 * 1024
const MAX_EDGE = 2400
const JPEG_QUALITY = 80
const IMG_EXT = new Set([".jpg", ".jpeg", ".png"])

function walk(dir, acc = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name)
    if (entry.isDirectory()) walk(p, acc)
    else if (IMG_EXT.has(extname(entry.name).toLowerCase())) acc.push(p)
  }
  return acc
}

async function compressOne(filePath) {
  const before = statSync(filePath).length
  if (before <= MIN_BYTES) return null

  const ext = extname(filePath).toLowerCase()
  const tmp = join(dirname(filePath), `.tmp-${basename(filePath)}`)

  try {
    const image = sharp(filePath, { failOn: "none" })
    const meta = await image.metadata()
    const w = meta.width ?? 0
    const h = meta.height ?? 0
    const longEdge = Math.max(w, h)
    const needsResize = longEdge > MAX_EDGE

    let pipeline = image.rotate() // honor EXIF orientation
    if (needsResize) {
      pipeline = pipeline.resize({
        width: w >= h ? MAX_EDGE : undefined,
        height: h > w ? MAX_EDGE : undefined,
        fit: "inside",
        withoutEnlargement: true,
      })
    }

    if (ext === ".png") {
      // Keep PNG for transparency; otherwise still PNG path to avoid breaking refs
      const hasAlpha = meta.hasAlpha === true
      if (!hasAlpha) {
        // Photo-like PNG without alpha → still write PNG but heavily compressed
        await pipeline.png({ compressionLevel: 9, palette: false }).toFile(tmp)
      } else {
        await pipeline.png({ compressionLevel: 9 }).toFile(tmp)
      }
    } else {
      await pipeline
        .jpeg({ quality: JPEG_QUALITY, mozjpeg: true, chromaSubsampling: "4:2:0" })
        .toFile(tmp)
    }

    const after = statSync(tmp).length
    // Only replace if we actually saved space (or resized)
    if (after < before || needsResize) {
      unlinkSync(filePath)
      renameSync(tmp, filePath)
      return {
        file: filePath.replace(/\\/g, "/").split("/public/images/")[1] ?? filePath,
        beforeKb: Math.round(before / 1024),
        afterKb: Math.round(after / 1024),
        resized: needsResize,
        dims: `${w}x${h}${needsResize ? `→≤${MAX_EDGE}` : ""}`,
      }
    }

    unlinkSync(tmp)
    return null
  } catch (err) {
    try {
      unlinkSync(tmp)
    } catch {
      /* ignore */
    }
    return {
      file: filePath,
      error: err instanceof Error ? err.message : String(err),
    }
  }
}

const files = walk(ROOT)
console.log(`Scanning ${files.length} images under public/images/ ...`)

const results = []
for (const file of files) {
  const result = await compressOne(file)
  if (result) {
    results.push(result)
    if (result.error) {
      console.log(`FAIL  ${result.file}: ${result.error}`)
    } else {
      console.log(
        `OK    ${result.file}  ${result.beforeKb}→${result.afterKb} KB  ${result.dims}`,
      )
    }
  }
}

const ok = results.filter((r) => !r.error)
const fail = results.filter((r) => r.error)
const saved = ok.reduce((sum, r) => sum + (r.beforeKb - r.afterKb), 0)

console.log("---")
console.log(`Compressed: ${ok.length}`)
console.log(`Failed: ${fail.length}`)
console.log(`Saved: ~${(saved / 1024).toFixed(1)} MB`)
