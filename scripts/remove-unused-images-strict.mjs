/**
 * Stricter unused-image removal: match exact public paths, not just basenames.
 * Understands imagePath(folder, file) / aboutImage(file) patterns via
 * reconstructing /images/{folder}/{file} from string-literal refs.
 *
 * Usage:
 *   node scripts/remove-unused-images-strict.mjs
 *   node scripts/remove-unused-images-strict.mjs --delete
 */
import { readdirSync, statSync, readFileSync, unlinkSync, rmdirSync } from "node:fs"
import { join, extname, basename, relative } from "node:path"
import { fileURLToPath } from "node:url"

const PROJECT = join(fileURLToPath(new URL(".", import.meta.url)), "..")
const PUBLIC = join(PROJECT, "public")
const DELETE = process.argv.includes("--delete")
const IMG_EXT = new Set([".jpg", ".jpeg", ".png", ".svg", ".webp", ".avif", ".gif"])

function walk(dir, acc = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    if (statSync(p).isDirectory()) walk(p, acc)
    else acc.push(p)
  }
  return acc
}

/** Exact public-relative paths that code may request (lowercase, no leading slash). */
function collectExactPaths() {
  const exact = new Set()
  const codeFiles = []
  for (const dir of ["app", "components", "lib"]) {
    codeFiles.push(...walk(join(PROJECT, dir)).filter((f) => [".ts", ".tsx", ".mjs", ".css"].includes(extname(f))))
  }
  for (const extra of ["app/layout.tsx", "next.config.mjs"]) {
    codeFiles.push(join(PROJECT, extra))
  }

  const directRe = /["'`](\/?[^"'`]*?\.(?:jpg|jpeg|png|svg|webp|avif|gif))["'`]/gi

  // imagePath(imageFolders.X, "file") or imagePath("folder", "file")
  // aboutImage("file") / sportsImage("file") → need folder context from each lib file
  const folderConst = {
    homepage: "homepage",
    about: "about",
    sports: "sports",
    coaching: "coaching",
  }

  for (const file of codeFiles) {
    let text
    try {
      text = readFileSync(file, "utf8")
    } catch {
      continue
    }

    let m
    while ((m = directRe.exec(text))) {
      let ref = m[1].replace(/^\/+/, "")
      try {
        ref = decodeURIComponent(ref)
      } catch {
        /* keep */
      }
      exact.add(ref.replace(/\\/g, "/").toLowerCase())
    }

    // imagePath(imageFolders.about, "DSC.jpg") or imagePath("about", "DSC.jpg")
    const imagePathRe =
      /imagePath\(\s*(?:imageFolders\.(\w+)|["'](\w+)["'])\s*,\s*["']([^"']+)["']\s*\)/g
    while ((m = imagePathRe.exec(text))) {
      const folder = m[1] || m[2]
      const fname = m[3]
      const mapped = folderConst[folder] || folder
      exact.add(`images/${mapped}/${fname}`.toLowerCase())
    }

    // aboutImage("file") in page-images → about folder
    if (file.replace(/\\/g, "/").includes("/lib/page-images")) {
      const aboutRe = /aboutImage\(\s*["']([^"']+)["']/g
      while ((m = aboutRe.exec(text))) {
        exact.add(`images/about/${m[1]}`.toLowerCase())
      }
    }

    // sportsImage("file") in sports-academy-content → sports folder
    if (file.replace(/\\/g, "/").includes("sports-academy-content")) {
      const sportsRe = /sportsImage\(\s*["']([^"']+)["']/g
      while ((m = sportsRe.exec(text))) {
        exact.add(`images/sports/${m[1]}`.toLowerCase())
      }
    }

    // coachingImage("file") in defence-academy-content → coaching folder
    if (file.replace(/\\/g, "/").includes("defence-academy-content")) {
      const coachRe = /coachingImage\(\s*["']([^"']+)["']/g
      while ((m = coachRe.exec(text))) {
        exact.add(`images/coaching/${m[1]}`.toLowerCase())
      }
    }
  }

  return exact
}

const exact = collectExactPaths()
const existing = walk(PUBLIC).filter((f) => IMG_EXT.has(extname(f).toLowerCase()))

const unused = []
const used = []

for (const file of existing) {
  const rel = relative(PUBLIC, file).replace(/\\/g, "/")
  const relLower = rel.toLowerCase()
  if (exact.has(relLower)) {
    used.push(rel)
  } else {
    unused.push({ file, rel, size: statSync(file).size })
  }
}

unused.sort((a, b) => a.rel.localeCompare(b.rel))

console.log(`Exact referenced paths: ${exact.size}`)
console.log(`Existing: ${existing.length}`)
console.log(`Used (exact path): ${used.length}`)
console.log(`Unused (incl. duplicate copies): ${unused.length}`)
console.log(`Unused MB: ${(unused.reduce((s, u) => s + u.size, 0) / 1024 / 1024).toFixed(1)}`)
console.log(DELETE ? "--- DELETING ---" : "--- DRY RUN ---")
for (const u of unused) {
  console.log(`${Math.round(u.size / 1024)}KB  ${u.rel}`)
  if (DELETE) unlinkSync(u.file)
}

if (DELETE) {
  function removeEmpty(dir) {
    if (!statSync(dir).isDirectory()) return
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
  console.log(`Deleted ${unused.length} files`)
}

// Safety: print any exact refs that don't exist
const missing = [...exact].filter((p) => {
  try {
    return !statSync(join(PUBLIC, p)).isFile()
  } catch {
    return true
  }
})
if (missing.length) {
  console.log("--- WARNING: referenced but missing ---")
  for (const m of missing) console.log(m)
}
