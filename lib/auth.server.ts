import bcrypt from "bcrypt"

export async function hashPassword(plain: string) {
  return bcrypt.hash(plain, 10)
}

export async function verifyPassword(plain: string, hash: string) {
  return bcrypt.compare(plain, hash)
}

function cleanEnvValue(value: string | undefined, fallback: string) {
  const resolved = value ?? fallback
  const trimmed = resolved.trim()

  if (
    (trimmed.startsWith("'") && trimmed.endsWith("'")) ||
    (trimmed.startsWith("\"") && trimmed.endsWith("\""))
  ) {
    return trimmed.slice(1, -1)
  }

  return trimmed
}

function getPasswordHash() {
  const encodedHash = cleanEnvValue(process.env.ADMIN_PASSWORD_HASH_BASE64, "")

  if (encodedHash) {
    return Buffer.from(encodedHash, "base64").toString("utf8")
  }

  return cleanEnvValue(process.env.ADMIN_PASSWORD_HASH, "")
}

// For now, keep a single admin user in env.
// Later, replace with DynamoDB lookup.
export function getStaticAdmin() {
  const email = cleanEnvValue(process.env.ADMIN_EMAIL, "admin@local.test")

  return {
    adminId: email,
    email,
    passwordHash: getPasswordHash(),
  }
}
