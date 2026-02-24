// scripts/hash-admin-password.js
const bcrypt = require("bcrypt")

async function main() {
  const password = "MyNewAdminPass#123" // choose your real admin password
  const hash = await bcrypt.hash(password, 10)
  console.log("ADMIN_PASSWORD_HASH:", hash)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
