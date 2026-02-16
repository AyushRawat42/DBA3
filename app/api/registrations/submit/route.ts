import { NextResponse } from "next/server"
import { z } from "zod"
import { GetCommand, PutCommand, QueryCommand } from "@aws-sdk/lib-dynamodb"

import { ddbDoc } from "@/lib/aws.server"
import { env } from "@/lib/env"
import { REQUIRED_DOCS } from "@/lib/required-docs"

const schema = z.object({
  regId: z.string().min(1),
  type: z.enum(["athlete", "coach", "academy"]),
})

export async function POST(req: Request) {
  const body = await req.json()
  const { regId, type } = schema.parse(body)

  // 1) Check payment
  const pay = await ddbDoc.send(
    new GetCommand({
      TableName: env.DDB_TABLE_MAIN,
      Key: { PK: `REG#${regId}`, SK: "PAY#LATEST" },
    })
  )

  if (!pay.Item || pay.Item.paymentStatus !== "PAID") {
    return NextResponse.json(
      { error: "Payment not completed" },
      { status: 400 }
    )
  }

  // 2) Fetch docs for regId
  const docs = await ddbDoc.send(
    new QueryCommand({
      TableName: env.DDB_TABLE_MAIN,
      KeyConditionExpression: "PK = :pk AND begins_with(SK, :doc)",
      ExpressionAttributeValues: {
        ":pk": `REG#${regId}`,
        ":doc": "DOC#",
      },
    })
  )

  const present = new Set(
    (docs.Items ?? []).map((i) => String(i.docType ?? "").trim())
  )

  const required = REQUIRED_DOCS[type]
  const missing = required.filter((d) => !present.has(d))

  if (missing.length > 0) {
    return NextResponse.json(
      { error: "Missing required documents", missing },
      { status: 400 }
    )
  }

  // 3) Mark submitted (simple overwrite)
  const submittedAt = new Date().toISOString()

  // Read META first so we don't lose formData
  const meta = await ddbDoc.send(
    new GetCommand({
      TableName: env.DDB_TABLE_MAIN,
      Key: { PK: `REG#${regId}`, SK: "META" },
    })
  )

  if (!meta.Item) {
    return NextResponse.json({ error: "Registration not found" }, { status: 404 })
  }

  await ddbDoc.send(
    new PutCommand({
      TableName: env.DDB_TABLE_MAIN,
      Item: {
        ...meta.Item,
        status: "SUBMITTED",
        submittedAt,
        updatedAt: submittedAt,
      },
    })
  )

  // 4) Add to review queue
  await ddbDoc.send(
    new PutCommand({
      TableName: env.DDB_TABLE_QUEUE,
      Item: {
        PK: "STATUS#SUBMITTED",
        SK: `${submittedAt}#REG#${regId}`,
        regId,
        type,
        submittedAt,
      },
    })
  )

  return NextResponse.json({ ok: true, status: "SUBMITTED" })
}
