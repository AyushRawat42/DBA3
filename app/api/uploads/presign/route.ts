import { NextResponse } from "next/server"
import { z } from "zod"
import { PutObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"

import { s3 } from "@/lib/aws.server"
import { env } from "@/lib/env"

const schema = z.object({
  regId: z.string().min(1),
  docType: z.string().min(1), // we’ll tighten this to DocType union later
  mimeType: z.string().min(1),
})

export async function POST(req: Request) {
  const body = await req.json()
  const { regId, docType, mimeType } = schema.parse(body)

  // Key structure: easy to audit + avoids collisions
  const safeDocType = docType.replace(/[^a-zA-Z0-9_-]/g, "")
  const ext =
    mimeType === "application/pdf"
      ? "pdf"
      : mimeType.startsWith("image/")
        ? "jpg"
        : "bin"

  const s3Key = `registrations/${regId}/${safeDocType}.${ext}`

  const command = new PutObjectCommand({
    Bucket: env.S3_BUCKET_NAME,
    Key: s3Key,
    ContentType: mimeType,
  })

  const url = await getSignedUrl(s3, command, { expiresIn: 60 * 5 }) // 5 minutes

  return NextResponse.json({ url, s3Key })
}
