import { NextResponse } from "next/server"
import { z } from "zod"
import { PutCommand } from "@aws-sdk/lib-dynamodb"

import { ddbDoc } from "@/lib/aws.server"
import { env } from "@/lib/env"

const schema = z.object({
  regId: z.string().min(1),
  registrationType: z.enum(["athlete", "coach", "academy"]),
  amount: z.number().int().positive(),
})

export async function POST(req: Request) {
  const body = await req.json()
  const { regId, registrationType, amount } = schema.parse(body)

  const now = new Date().toISOString()
  const paymentId = `MOCK_${Date.now()}`

  await ddbDoc.send(
    new PutCommand({
      TableName: env.DDB_TABLE_MAIN,
      Item: {
        PK: `REG#${regId}`,
        SK: "PAY#LATEST",
        regId,
        registrationType,
        amount,
        provider: "mock",
        paymentStatus: "PAID",
        paymentId,
        paidAt: now,
        createdAt: now,
      },
    })
  )

  return NextResponse.json({ paymentId })
}
