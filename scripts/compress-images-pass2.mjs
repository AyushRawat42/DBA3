/**
 * Second pass: convert photo PNGs → JPEG, force-recompress stubborn JPEGs.
 */
import { readdirSync, statSync, renameSync, unlinkSync, copyFileSync, existsSync } from "node:fs"
import { join, extname, dirname, basename } from "node:path"
import { fileURLToPath } from "node:url"
import sharp from "sharp"

const PROJECT = join(fileURLToPath(new URL(".", import.meta.url)), "..")
const IMAGES = join(PROJECT, "public", "images")
const MAX_EDGE = 2400
const JPEG_QUALITY = 80

const PNG_TO_JPEG = [
  "sports/pickleball.png",
  "homepage/IMG_5136.png",
  "coaching/IMG_5136.png",
  "coaching-form/IMG_5136.png",
  "coaching/Gemini_Generated_Image_fr0pkkfr0pkkfr0p.png",
  "coaching-form/Gemini_Generated_Image_fr0pkkfr0pkkfr0p.png",
]

async function pngToJpeg(rel) {
  const src = join(IMAGES, rel)
  if (!existsSync(src)) {
    console.log(`SKIP missing ${rel}`)
    return
  }
  const dest = src.replace(/\.png$/i, ".jpg")
  const before = statSync(src).length
  const image = sharp(src, { failOn: "none" })
  const meta = await image.metadata()
  const longEdge = Math.max(meta.width ?? 0, meta.height ?? 0)

  let pipeline = image.rotate().flatten({ background: { r: 255, g: 255, b: 255 } })
  if (longEdge > MAX_EDGE) {
    pipeline = pipeline.resize({
      width: (meta.width ?? 0) >= (meta.height ?? 0) ? MAX_EDGE : undefined,
      height: (meta.height ?? 0) > (meta.width ?? 0) ? MAX_EDGE : undefined,
      fit: "inside",
      withoutEnlargement: true,
    })
  }

  await pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true }).toFile(dest)
  const after = statSync(dest).length
  unlinkSync(src)
  console.log(
    `PNG→JPG ${rel}  ${Math.round(before / 1024)}→${Math.round(after / 1024)} KB  (${meta.width}x${meta.height})`,
  )
}

async function forceJpeg(rel) {
  const src = join(IMAGES, rel)
  if (!existsSync(src)) return
  const before = statSync(src).length
  if (before < 400 * 1024) return

  const tmp = join(dirname(src), `.tmp-${basename(src)}`)
  const image = sharp(src, { failOn: "none" })
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

  await pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true }).toFile(tmp)
  const after = statSync(tmp).length
  if (after < before) {
    unlinkSync(src)
    renameSync(tmp, src)
    console.log(
      `FORCE ${rel}  ${Math.round(before / 1024)}→${Math.round(after / 1024)} KB`,
    )
  } else {
    unlinkSync(tmp)
    console.log(`KEEP ${rel}  already ${Math.round(before / 1024)} KB (re-encode not smaller)`)
  }
}

function walkJpeg(dir, acc = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name)
    if (entry.isDirectory()) walkJpeg(p, acc)
    else if ([".jpg", ".jpeg"].includes(extname(entry.name).toLowerCase())) {
      if (statSync(p).length >= 400 * 1024) acc.push(p)
    }
  }
  return acc
}

for (const rel of PNG_TO_JPEG) {
  await pngToJpeg(rel)
}

console.log("--- force recompress JPEGs ≥400KB ---")
for (const file of walkJpeg(IMAGES)) {
  const rel = file.slice(IMAGES.length + 1).replace(/\\/g, "/")
  await forceJpeg(rel)
}

console.log("done")
