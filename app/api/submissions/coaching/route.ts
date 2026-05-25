import { NextResponse } from "next/server"
import { PutCommand } from "@aws-sdk/lib-dynamodb"
import { z } from "zod"

import { toSubmissionKey } from "@/lib/admissions"
import { db, TABLE_MAIN } from "@/lib/dynamodb"
import { coachingRegistrationSchema } from "@/lib/validations"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const fields = coachingRegistrationSchema.parse(body)
    const id = crypto.randomUUID()
    const now = new Date().toISOString()

    const item = {
      ...toSubmissionKey(id),
      id,
      formType: "coaching",
      createdAt: now,
      updatedAt: now,
      status: "New",
      notes: "",
      ...fields,
    }

    await db.send(
      new PutCommand({
        TableName: TABLE_MAIN,
        Item: item,
        ConditionExpression: "attribute_not_exists(PK)",
      })
    )

    return NextResponse.json({ ok: true, submission: item }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid submission", issues: error.flatten() }, { status: 400 })
    }

    console.error("Coaching admission submission error:", error)
    return NextResponse.json({ error: "Failed to save submission" }, { status: 500 })
  }
}
