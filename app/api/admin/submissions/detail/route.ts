import { NextResponse } from "next/server"
import { GetCommand } from "@aws-sdk/lib-dynamodb"

import { requireAdminCookie, toSubmissionKey } from "@/lib/admissions"
import { db, TABLE_MAIN } from "@/lib/dynamodb"

export async function GET(req: Request) {
  if (!(await requireAdminCookie())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const id = searchParams.get("id") ?? searchParams.get("pk")?.replace(/^SUBMISSION#/, "")

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

    return NextResponse.json({ submission: result.Item ?? null })
  } catch (error) {
    console.error("Admin admission detail fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch submission" }, { status: 500 })
  }
}
