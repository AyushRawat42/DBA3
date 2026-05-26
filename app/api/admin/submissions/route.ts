import { NextResponse } from "next/server"
import { ScanCommand } from "@aws-sdk/lib-dynamodb"

import { formTypeSchema, requireAdminCookie, admissionStatusSchema } from "@/lib/admissions"
import { db, TABLE_MAIN } from "@/lib/dynamodb"

function csvEscape(value: unknown) {
  const text = value == null ? "" : String(value)
  return `"${text.replace(/"/g, '""')}"`
}

export async function GET(req: Request) {
  if (!(await requireAdminCookie())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const formType = searchParams.get("formType")
  const status = searchParams.get("status")
  const dateFrom = searchParams.get("dateFrom")
  const dateTo = searchParams.get("dateTo")
  const exportFormat = searchParams.get("export")

  try {
    const items = []
    let exclusiveStartKey: Record<string, unknown> | undefined

    do {
      const result = await db.send(
        new ScanCommand({
          TableName: TABLE_MAIN,
          ExclusiveStartKey: exclusiveStartKey,
          FilterExpression: "begins_with(PK, :prefix) AND SK = :meta",
          ExpressionAttributeValues: {
            ":prefix": "SUBMISSION#",
            ":meta": "META",
          },
        })
      )

      items.push(...(result.Items ?? []))
      exclusiveStartKey = result.LastEvaluatedKey
    } while (exclusiveStartKey)

    let filteredItems = items

    if (formType && formType !== "all") {
      const parsed = formTypeSchema.safeParse(formType)
      filteredItems = parsed.success ? filteredItems.filter((item) => item.formType === parsed.data) : []
    }

    if (status && status !== "all") {
      const parsed = admissionStatusSchema.safeParse(status)
      filteredItems = parsed.success ? filteredItems.filter((item) => item.status === parsed.data) : []
    }

    if (dateFrom) {
      const fromTime = new Date(`${dateFrom}T00:00:00.000Z`).getTime()
      filteredItems = filteredItems.filter((item) => new Date(String(item.createdAt)).getTime() >= fromTime)
    }

    if (dateTo) {
      const toTime = new Date(`${dateTo}T23:59:59.999Z`).getTime()
      filteredItems = filteredItems.filter((item) => new Date(String(item.createdAt)).getTime() <= toTime)
    }

    filteredItems.sort((a, b) => new Date(String(b.createdAt)).getTime() - new Date(String(a.createdAt)).getTime())

    if (exportFormat === "csv") {
      const columns = [
        "id",
        "formType",
        "createdAt",
        "status",
        "studentFullName",
        "parentGuardianName",
        "mobile",
        "alternateMobile",
        "email",
        "age",
        "currentClass",
        "city",
        "sportInterestedIn",
        "preferredBatchTiming",
        "courseInterestedIn",
        "schoolName",
        "previousExperience",
        "message",
        "notes",
      ]

      const csv = [
        columns.join(","),
        ...filteredItems.map((item) => columns.map((column) => csvEscape(item[column])).join(",")),
      ].join("\n")

      return new Response(csv, {
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": `attachment; filename="aspire-admissions-${new Date().toISOString().slice(0, 10)}.csv"`,
        },
      })
    }

    return NextResponse.json({ submissions: filteredItems })
  } catch (error) {
    console.error("Admin admissions fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch submissions" }, { status: 500 })
  }
}
