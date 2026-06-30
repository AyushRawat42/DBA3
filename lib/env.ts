import "server-only"

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

function resolvePasswordHash() {
  const encodedHash = cleanEnvValue(process.env.ADMIN_PASSWORD_HASH_BASE64, "")

  if (encodedHash) {
    return Buffer.from(encodedHash, "base64").toString("utf8")
  }

  return cleanEnvValue(process.env.ADMIN_PASSWORD_HASH, "")
}

export const awsRegion =
  process.env.AWS_REGION ?? process.env.APP_AWS_REGION ?? "ap-south-1"

export const awsAccessKeyId =
  process.env.AWS_ACCESS_KEY_ID ?? process.env.APP_AWS_ACCESS_KEY_ID

export const awsSecretAccessKey =
  process.env.AWS_SECRET_ACCESS_KEY ?? process.env.APP_AWS_SECRET_ACCESS_KEY

export const TABLE_MAIN =
  process.env.ADMISSIONS_TABLE_NAME ??
  process.env.DDB_TABLE_MAIN ??
  "AspireAdmissions"

export const adminEmail = cleanEnvValue(
  process.env.ADMIN_EMAIL,
  process.env.NODE_ENV === "production" ? "" : "admin@local.test"
)

export const adminPasswordHash = resolvePasswordHash()

export const adminSessionSecret =
  process.env.ADMIN_SESSION_SECRET ??
  process.env.ADMIN_PASSWORD_HASH ??
  (process.env.NODE_ENV === "production" ? "" : "local-admin-session-secret")
