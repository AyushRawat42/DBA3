// scripts/hash-admin-password.js
const bcrypt = require("bcrypt")

async function main() {
  const password = process.argv[2]

  if (!password || password.length < 8) {
    console.error('Usage: node scripts/hash-admin-password.js "your-password"')
    process.exit(1)
  }

  const hash = await bcrypt.hash(password, 10)
  console.log(`ADMIN_PASSWORD_HASH_BASE64=${Buffer.from(hash, "utf8").toString("base64")}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
