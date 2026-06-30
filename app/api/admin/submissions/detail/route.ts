import { NextResponse } from "next/server"
import { GetCommand } from "@aws-sdk/lib-dynamodb"

import {
  normalizeSubmissionId,
  normalizeSubmissionItem,
  requireAdminCookie,
  toSubmissionKey,
} from "@/lib/admissions"
import { db, TABLE_MAIN } from "@/lib/dynamodb"

export async function GET(req: Request) {
  if (!(await requireAdminCookie())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const id = normalizeSubmissionId(searchParams.get("id") ?? searchParams.get("pk"))

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 })
  }

  try {
    const result = await db.send(
      new GetCommand({
        TableName: TABLE_MAIN,
        Key: toSubmissionKey(id),
      })
    )

    if (!result.Item) {
      return NextResponse.json({ error: "Submission not found" }, { status: 404 })
    }

    return NextResponse.json({
      submission: normalizeSubmissionItem(result.Item as Record<string, unknown>),
    })
  } catch (error) {
    console.error("Admin admission detail fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch submission" }, { status: 500 })
  }
}
