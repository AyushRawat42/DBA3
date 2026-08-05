/**
 * Find (and optionally delete) unused images under public/.
 * Usage:
 *   node scripts/remove-unused-images.mjs          # dry-run list
 *   node scripts/remove-unused-images.mjs --delete # delete unused
 */
import { readdirSync, statSync, readFileSync, unlinkSync, rmdirSync } from "node:fs"
import { join, extname, basename, relative, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const PROJECT = join(fileURLToPath(new URL(".", import.meta.url)), "..")
const PUBLIC = join(PROJECT, "public")
const CODE_DIRS = ["app", "components", "lib"]
const EXTRA_FILES = ["app/layout.tsx", "app/globals.css", "next.config.mjs"]
const IMG_EXT = new Set([".jpg", ".jpeg", ".png", ".svg", ".webp", ".avif", ".gif"])
const DELETE = process.argv.includes("--delete")

function walk(dir, acc = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    const st = statSync(p)
    if (st.isDirectory()) walk(p, acc)
    else acc.push(p)
  }
  return acc
}

function collectRefs() {
  const basenames = new Set()
  const paths = new Set()
  const re = /["'`]([^"'`]*?\.(?:jpg|jpeg|png|svg|webp|avif|gif))["'`]/gi

  function scan(file) {
    let text
    try {
      text = readFileSync(file, "utf8")
    } catch {
      return
    }
    let m
    while ((m = re.exec(text))) {
      let ref = m[1].replace(/^\/+/, "")
      try {
        ref = decodeURIComponent(ref)
      } catch {
        /* keep raw */
      }
      ref = ref.replace(/\\/g, "/")
      basenames.add(basename(ref).toLowerCase())
      paths.add(ref.toLowerCase())
      if (ref.toLowerCase().startsWith("images/")) {
        paths.add(ref.slice(7).toLowerCase())
      }
    }
  }

  for (const dir of CODE_DIRS) {
    for (const f of walk(join(PROJECT, dir))) {
      if ([".ts", ".tsx", ".js", ".jsx", ".mjs", ".css"].includes(extname(f))) {
        scan(f)
      }
    }
  }
  for (const extra of EXTRA_FILES) scan(join(PROJECT, extra))

  return { basenames, paths }
}

const { basenames, paths } = collectRefs()
const existing = walk(PUBLIC).filter((f) => IMG_EXT.has(extname(f).toLowerCase()))

const unused = []
const used = []

for (const file of existing) {
  const rel = relative(PUBLIC, file).replace(/\\/g, "/")
  const relLower = rel.toLowerCase()
  const base = basename(file).toLowerCase()

  const hit =
    basenames.has(base) ||
    paths.has(relLower) ||
    paths.has(`images/${relLower}`) ||
    [...paths].some((r) => r === base || r.endsWith(`/${base}`))

  if (hit) used.push(rel)
  else unused.push({ file, rel, size: statSync(file).size })
}

unused.sort((a, b) => a.rel.localeCompare(b.rel))

console.log(`Existing images: ${existing.length}`)
console.log(`Referenced basenames: ${basenames.size}`)
console.log(`Used: ${used.length}`)
console.log(`Unused: ${unused.length}`)
console.log(`Unused size: ${(unused.reduce((s, u) => s + u.size, 0) / 1024 / 1024).toFixed(1)} MB`)
console.log(DELETE ? "--- DELETING ---" : "--- DRY RUN (pass --delete to remove) ---")

let deletedBytes = 0
for (const u of unused) {
  console.log(`${Math.round(u.size / 1024)}KB  ${u.rel}`)
  if (DELETE) {
    unlinkSync(u.file)
    deletedBytes += u.size
  }
}

if (DELETE) {
  // Remove empty directories under public/images
  function removeEmpty(dir) {
    for (const name of readdirSync(dir)) {
      const p = join(dir, name)
      if (statSync(p).isDirectory()) removeEmpty(p)
    }
    if (dir !== PUBLIC && readdirSync(dir).length === 0) {
      rmdirSync(dir)
      console.log(`Removed empty dir: ${relative(PUBLIC, dir)}`)
    }
  }
  removeEmpty(join(PUBLIC, "images"))
  console.log(`Deleted ${unused.length} files (~${(deletedBytes / 1024 / 1024).toFixed(1)} MB)`)
}
