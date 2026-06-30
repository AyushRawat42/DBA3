import { NextResponse } from "next/server"
import { UpdateCommand } from "@aws-sdk/lib-dynamodb"
import { z } from "zod"

import {
  admissionStatusSchema,
  normalizeSubmissionId,
  normalizeSubmissionItem,
  requireAdminCookie,
  toSubmissionKey,
} from "@/lib/admissions"
import { db, TABLE_MAIN } from "@/lib/dynamodb"

const updateSchema = z
  .object({
    status: admissionStatusSchema.optional(),
    notes: z.string().max(5000).optional(),
  })
  .refine((value) => value.status !== undefined || value.notes !== undefined, {
    message: "No updates provided",
  })

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await requireAdminCookie())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id: rawId } = await params
  const id = normalizeSubmissionId(rawId)

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 })
  }

  let body: unknown

  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }

  const parsed = updateSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }

  const updates: string[] = ["updatedAt = :updatedAt"]
  const names: Record<string, string> = {}
  const values: Record<string, string> = {
    ":updatedAt": new Date().toISOString(),
  }

  if (parsed.data.status) {
    updates.push("#status = :status")
    names["#status"] = "status"
    values[":status"] = parsed.data.status
  }

  if (parsed.data.notes !== undefined) {
    updates.push("notes = :notes")
    values[":notes"] = parsed.data.notes
  }

  try {
    const result = await db.send(
      new UpdateCommand({
        TableName: TABLE_MAIN,
        Key: toSubmissionKey(id),
        UpdateExpression: `SET ${updates.join(", ")}`,
        ExpressionAttributeNames: Object.keys(names).length ? names : undefined,
        ExpressionAttributeValues: values,
        ConditionExpression: "attribute_exists(PK)",
        ReturnValues: "ALL_NEW",
      })
    )

    if (!result.Attributes) {
      return NextResponse.json({ error: "Submission not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      submission: normalizeSubmissionItem(result.Attributes as Record<string, unknown>),
    })
  } catch (error) {
    if (error instanceof Error && error.name === "ConditionalCheckFailedException") {
      return NextResponse.json({ error: "Submission not found" }, { status: 404 })
    }

    console.error("Admin admission update error:", error)
    return NextResponse.json({ error: "Failed to update submission" }, { status: 500 })
  }
}
