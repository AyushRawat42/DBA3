import { NextResponse } from "next/server"
import { PutCommand } from "@aws-sdk/lib-dynamodb"

import { createSubmissionItem, parseSubmissionBody } from "@/lib/admissions"
import { db, TABLE_MAIN } from "@/lib/dynamodb"
import { coachingRegistrationSchema } from "@/lib/validations"

export async function POST(req: Request) {
  const parsed = await parseSubmissionBody(req, coachingRegistrationSchema)

  if (!parsed.ok) {
    if (parsed.reason === "invalid_json") {
      return NextResponse.json({ error: "Invalid submission" }, { status: 400 })
    }

    return NextResponse.json(
      { error: "Invalid submission", issues: parsed.issues },
      { status: 400 }
    )
  }

  const id = crypto.randomUUID()
  const item = createSubmissionItem(id, "coaching", parsed.data)

  try {
    await db.send(
      new PutCommand({
        TableName: TABLE_MAIN,
        Item: item,
        ConditionExpression: "attribute_not_exists(PK)",
      })
    )
  } catch (error) {
    console.error("Coaching admission submission error:", error)
    return NextResponse.json({ error: "Failed to save submission" }, { status: 500 })
  }

  return NextResponse.json({ ok: true }, { status: 201 })
}
