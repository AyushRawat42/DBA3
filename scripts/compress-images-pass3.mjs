/**
 * Third pass: force re-encode every JPEG still ≥ 500 KB at q78.
 */
import { readdirSync, statSync, unlinkSync, renameSync } from "node:fs"
import { join, extname, dirname, basename } from "node:path"
import { fileURLToPath } from "node:url"
import sharp from "sharp"

const ROOT = join(fileURLToPath(new URL(".", import.meta.url)), "..", "public", "images")
const MAX_EDGE = 2400
const QUALITY = 78
const MIN = 500 * 1024

function walk(dir, acc = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    const st = statSync(p)
    if (st.isDirectory()) walk(p, acc)
    else if ([".jpg", ".jpeg"].includes(extname(name).toLowerCase()) && st.size >= MIN) {
      acc.push(p)
    }
  }
  return acc
}

const files = walk(ROOT)
console.log(`Force-reencoding ${files.length} JPEGs ≥ 500 KB ...`)

let saved = 0
for (const file of files) {
  const before = statSync(file).size
  const tmp = join(dirname(file), `.tmp-${basename(file)}`)
  try {
    const image = sharp(file, { failOn: "none" })
    const meta = await image.metadata()
    const longEdge = Math.max(meta.width ?? 0, meta.height ?? 0)
    let pipeline = image.rotate()
    if (longEdge > MAX_EDGE) {
      pipeline = pipeline.resize({
        width: (meta.width ?? 0) >= (meta.height ?? 0) ? MAX_EDGE : undefined,
        height: (meta.height ?? 0) > (meta.width ?? 0) ? MAX_EDGE : undefined,
        fit: "inside",
        withoutEnlargement: true,
      })
    }
    await pipeline.jpeg({ quality: QUALITY, mozjpeg: true }).toFile(tmp)
    const after = statSync(tmp).size
    if (after < before) {
      unlinkSync(file)
      renameSync(tmp, file)
      const rel = file.slice(ROOT.length + 1).replace(/\\/g, "/")
      console.log(`OK  ${rel}  ${Math.round(before / 1024)}→${Math.round(after / 1024)} KB`)
      saved += before - after
    } else {
      unlinkSync(tmp)
    }
  } catch (err) {
    try {
      unlinkSync(tmp)
    } catch {
      /* ignore */
    }
    console.log(`FAIL ${file}: ${err.message}`)
  }
}

console.log(`Saved ~${(saved / 1024 / 1024).toFixed(1)} MB`)
