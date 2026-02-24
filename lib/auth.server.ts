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
    adminId: 'admin@local.test',
    email: 'admin@local.test',
    passwordHash: '$2b$10$dQL2KzjIaG.ev3.QOkmjz./.MAGwOTegUCUJPE4t/sixKhfZeERpC'
  }
}
