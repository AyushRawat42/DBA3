import { NextResponse } from "next/server"
import { ScanCommand } from "@aws-sdk/lib-dynamodb"

import {
  admissionStatusSchema,
  formTypeSchema,
  normalizeSubmissionItem,
  requireAdminCookie,
} from "@/lib/admissions"
import { db, TABLE_MAIN } from "@/lib/dynamodb"

function csvEscape(value: unknown) {
  const text = value == null ? "" : String(value)
  return `"${text.replace(/"/g, '""')}"`
}

function parseFilterDate(value: string, endOfDay: boolean) {
  const parsed = new Date(`${value}T${endOfDay ? "23:59:59.999" : "00:00:00.000"}Z`)
  const time = parsed.getTime()

  if (Number.isNaN(time)) {
    return null
  }

  return time
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

  if (formType && formType !== "all" && !formTypeSchema.safeParse(formType).success) {
    return NextResponse.json({ error: "Invalid formType filter" }, { status: 400 })
  }

  if (status && status !== "all" && !admissionStatusSchema.safeParse(status).success) {
    return NextResponse.json({ error: "Invalid status filter" }, { status: 400 })
  }

  if (dateFrom && parseFilterDate(dateFrom, false) === null) {
    return NextResponse.json({ error: "Invalid dateFrom filter" }, { status: 400 })
  }

  if (dateTo && parseFilterDate(dateTo, true) === null) {
    return NextResponse.json({ error: "Invalid dateTo filter" }, { status: 400 })
  }

  try {
    const items: Record<string, unknown>[] = []
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

      items.push(...((result.Items ?? []) as Record<string, unknown>[]))
      exclusiveStartKey = result.LastEvaluatedKey
    } while (exclusiveStartKey)

    let filteredItems = items.map(normalizeSubmissionItem)

    if (formType && formType !== "all") {
      const parsed = formTypeSchema.parse(formType)
      filteredItems = filteredItems.filter((item) => item.formType === parsed)
    }

    if (status && status !== "all") {
      const parsed = admissionStatusSchema.parse(status)
      filteredItems = filteredItems.filter((item) => item.status === parsed)
    }

    if (dateFrom) {
      const fromTime = parseFilterDate(dateFrom, false)!
      filteredItems = filteredItems.filter(
        (item) => new Date(String(item.createdAt)).getTime() >= fromTime
      )
    }

    if (dateTo) {
      const toTime = parseFilterDate(dateTo, true)!
      filteredItems = filteredItems.filter(
        (item) => new Date(String(item.createdAt)).getTime() <= toTime
      )
    }

    filteredItems.sort(
      (a, b) => new Date(String(b.createdAt)).getTime() - new Date(String(a.createdAt)).getTime()
    )

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
        "consent",
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
