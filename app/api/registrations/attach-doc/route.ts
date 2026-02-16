import { NextResponse } from "next/server"
import { z } from "zod"
import { PutCommand } from "@aws-sdk/lib-dynamodb"

import { ddbDoc } from "@/lib/aws.server"
import { env } from "@/lib/env"

const schema = z.object({
  regId: z.string().min(1),
  docType: z.string().min(1),
  s3Key: z.string().min(1),
  mimeType: z.string().min(1),
  size: z.number().int().nonnegative(),
})

export async function POST(req: Request) {
  const body = await req.json()
  const { regId, docType, s3Key, mimeType, size } = schema.parse(body)

  const now = new Date().toISOString()

  await ddbDoc.send(
    new PutCommand({
      TableName: env.DDB_TABLE_MAIN,
      Item: {
        PK: `REG#${regId}`,
        SK: `DOC#${docType}`,
        regId,
        docType,
        s3Key,
        mimeType,
        size,
        uploadedAt: now,
      },
    })
  )

  return NextResponse.json({ ok: true })
}
