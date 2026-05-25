import { NextResponse } from "next/server"
import { UpdateCommand } from "@aws-sdk/lib-dynamodb"
import { z } from "zod"

import { admissionStatusSchema, requireAdminCookie, toSubmissionKey } from "@/lib/admissions"
import { db, TABLE_MAIN } from "@/lib/dynamodb"

const updateSchema = z.object({
  status: admissionStatusSchema.optional(),
  notes: z.string().max(5000).optional(),
})

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await requireAdminCookie())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id } = await params
  const body = await req.json()
  const parsed = updateSchema.parse(body)
  const updates: string[] = ["updatedAt = :updatedAt"]
  const names: Record<string, string> = {}
  const values: Record<string, string> = {
    ":updatedAt": new Date().toISOString(),
  }

  if (parsed.status) {
    updates.push("#status = :status")
    names["#status"] = "status"
    values[":status"] = parsed.status
  }

  if (parsed.notes !== undefined) {
    updates.push("notes = :notes")
    values[":notes"] = parsed.notes
  }

  try {
    const result = await db.send(
      new UpdateCommand({
        TableName: TABLE_MAIN,
        Key: toSubmissionKey(decodeURIComponent(id)),
        UpdateExpression: `SET ${updates.join(", ")}`,
        ExpressionAttributeNames: Object.keys(names).length ? names : undefined,
        ExpressionAttributeValues: values,
        ReturnValues: "ALL_NEW",
      })
    )

    return NextResponse.json({ success: true, submission: result.Attributes })
  } catch (error) {
    console.error("Admin admission update error:", error)
    return NextResponse.json({ error: "Failed to update submission" }, { status: 500 })
  }
}
