import bcrypt from "bcrypt"
import { adminEmail, adminPasswordHash } from "@/lib/env"

export async function verifyPassword(plain: string, hash: string) {
  if (!hash) {
    return false
  }

  try {
    return await bcrypt.compare(plain, hash)
  } catch {
    return false
  }
}

// For now, keep a single admin user in env.
// Later, replace with DynamoDB lookup.
export function getStaticAdmin() {
  return {
    adminId: adminEmail,
    email: adminEmail,
    passwordHash: adminPasswordHash,
  }
}
