import bcrypt from "bcrypt"

export async function hashPassword(plain: string) {
  return bcrypt.hash(plain, 10)
}

export async function verifyPassword(plain: string, hash: string) {
  return bcrypt.compare(plain, hash)
}

// For now, keep a single admin user in env.
// Later, replace with DynamoDB lookup.
export function getStaticAdmin() {
  return {
    adminId: process.env.ADMIN_EMAIL ?? "admin@local.test",
    email: process.env.ADMIN_EMAIL ?? "admin@local.test",
    passwordHash:
      process.env.ADMIN_PASSWORD_HASH ??
      "$2b$10$dQL2KzjIaG.ev3.QOkmjz./.MAGwOTegUCUJPE4t/sixKhfZeERpC",
  }
}
