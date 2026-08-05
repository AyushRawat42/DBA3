/**
 * Build the official Aspire Academy logo assets from the supplied source artwork.
 *
 * Both sources are JPEGs with an opaque backdrop, so each badge is cropped to its
 * circle and masked to transparency in order to sit cleanly on the light header
 * and on tinted cards.
 *
 * Usage: node scripts/build-logo.mjs <sports-source> <defence-source>
 * Either argument may be omitted to skip that logo.
 */
import { statSync } from "node:fs"
import { join } from "node:path"
import { fileURLToPath } from "node:url"
import sharp from "sharp"

const ROOT = join(fileURLToPath(new URL(".", import.meta.url)), "..")
const PUBLIC = join(ROOT, "public")
const APP = join(ROOT, "app")
const SIZE = 512

// Circle geometry measured from each source image
const LOGOS = {
  sports: { out: "aspire-logo.png", cx: 511, cy: 490, r: 416, icons: true },
  defence: { out: "aspire-defence-logo.png", cx: 514, cy: 490, r: 448 },
}

// The sources are JPEGs, so their gradients carry noise that defeats lossless PNG.
// Palette quantisation keeps the flat brand colours crisp at a fraction of the size.
const PNG_OPTS = { compressionLevel: 9, palette: true, quality: 90, effort: 10 }

// The mask is applied after the resize, so it must match the output size
const MASK = Buffer.from(
  `<svg width="${SIZE}" height="${SIZE}"><circle cx="${SIZE / 2}" cy="${SIZE / 2}" r="${SIZE / 2}" fill="#fff"/></svg>`,
)

async function build(src, { out, cx, cy, r, icons }) {
  const crop = { left: cx - r, top: cy - r, width: r * 2, height: r * 2 }
  const circular = () =>
    sharp(src).extract(crop).resize(SIZE, SIZE).composite([{ input: MASK, blend: "dest-in" }])

  await circular().png(PNG_OPTS).toFile(join(PUBLIC, out))
  report(PUBLIC, out)

  if (!icons) return

  // Browser tab icon, derived from the finished badge so it stays identical.
  // Kept small so the favicon isn't a 512px download.
  await sharp(join(PUBLIC, out)).resize(64, 64).png(PNG_OPTS).toFile(join(APP, "icon.png"))
  report(APP, "icon.png")

  // iOS renders alpha as black, so the touch icon is flattened onto the brand backdrop
  await sharp(src)
    .extract(crop)
    .resize(180, 180)
    .flatten({ background: { r: 0, g: 0, b: 0 } })
    .png(PNG_OPTS)
    .toFile(join(APP, "apple-icon.png"))
  report(APP, "apple-icon.png")
}

function report(dir, name) {
  console.log(`${name}: ${(statSync(join(dir, name)).size / 1024).toFixed(1)} KB`)
}

const [sportsSrc, defenceSrc] = process.argv.slice(2)
if (!sportsSrc && !defenceSrc) {
  console.error("Usage: node scripts/build-logo.mjs <sports-source> <defence-source>")
  process.exit(1)
}
if (sportsSrc) await build(sportsSrc, LOGOS.sports)
if (defenceSrc) await build(defenceSrc, LOGOS.defence)
