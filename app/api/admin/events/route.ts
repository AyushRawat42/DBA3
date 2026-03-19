import { NextResponse } from "next/server"
import { ScanCommand, PutCommand } from "@aws-sdk/lib-dynamodb"
import { db, TABLE_EVENTS } from "@/lib/dynamodb"

export async function GET() {
  try {
    const result = await db.send(new ScanCommand({ TableName: TABLE_EVENTS }))
    const items = (result.Items ?? []).sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    )
    return NextResponse.json({ events: items })
  } catch (error) {
    console.error("Fetch events error:", error)
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const id = crypto.randomUUID()

    const item = {
      PK: `EVENT#${id}`,
      SK: `EVENT#${id}`,
      id,
      title: body.title,
      date: body.date,
      location: body.location,
      description: body.description ?? "",
      category: body.category ?? "General",
      createdAt: new Date().toISOString(),
    }

    await db.send(new PutCommand({ TableName: TABLE_EVENTS, Item: item }))
    return NextResponse.json({ success: true, event: item })
  } catch (error) {
    console.error("Create event error:", error)
    return NextResponse.json({ error: "Failed to create event" }, { status: 500 })
  }
}
