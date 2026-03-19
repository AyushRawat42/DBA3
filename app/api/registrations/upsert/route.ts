import { NextResponse } from "next/server"
import { z } from "zod"
import { PutCommand } from "@aws-sdk/lib-dynamodb"

import { ddbDoc } from "@/lib/aws.server"
import { env } from "@/lib/env"
import { newRegistrationId } from "@/lib/ids"
import type { RegistrationStatus, RegistrationType } from "@/lib/types"

const upsertSchema = z.object({
  regId: z.string().min(1).optional(),
  type: z.enum(["athlete", "coach", "academy"]),
  formData: z.record(z.any()),
})

export async function POST(req: Request) {
   try {
    console.log("ENV CHECK", {
      region: process.env.APP_AWS_REGION,
      table: process.env.DDB_TABLE_MAIN,
      hasKey: !!process.env.APP_AWS_ACCESS_KEY_ID,
      hasSecret: !!process.env.APP_AWS_SECRET_ACCESS_KEY,
    })
  const body = await req.json()
  const { regId: regIdInput, type, formData } = upsertSchema.parse(body)

  const regId = regIdInput ?? newRegistrationId()
  const now = new Date().toISOString()

  const item: {
    PK: string
    SK: string
    regId: string
    type: RegistrationType
    status: RegistrationStatus
    formData: Record<string, unknown>
    createdAt: string
    updatedAt: string
  } = {
    PK: `REG#${regId}`,
    SK: "META",
    regId,
    type,
    status: "DRAFT",
    formData,
    createdAt: now,
    updatedAt: now,
  }

  await ddbDoc.send(
    new PutCommand({
      TableName: env.DDB_TABLE_MAIN,
      Item: item,
    })
  )

  return NextResponse.json({ regId })
 } catch (e) {
    console.error("UPSERT CRASH:", e)  // ← this will appear in Amplify logs
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : String(e) }),
      { status: 500 }
    )
  }
}
