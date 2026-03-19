import { NextResponse } from "next/server"
import { ScanCommand } from "@aws-sdk/lib-dynamodb"
import { db, TABLE_EVENTS } from "@/lib/dynamodb"

export async function GET() {
  try {
    const result = await db.send(new ScanCommand({ TableName: TABLE_EVENTS }))
    const items = (result.Items ?? []).sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    )
    return NextResponse.json({ events: items })
  } catch (error) {
    console.error("Public events fetch error:", error)
    return NextResponse.json({ events: [] })
  }
}
