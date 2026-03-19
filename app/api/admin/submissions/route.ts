import { NextResponse } from "next/server"
import { ScanCommand } from "@aws-sdk/lib-dynamodb"
import { db, TABLE_MAIN } from "@/lib/dynamodb"

export async function GET() {
  try {
    const result = await db.send(new ScanCommand({
      TableName: TABLE_MAIN,
    }))

    console.log("TABLE:", TABLE_MAIN)
    console.log("Items found:", result.Items?.length)

    const items = result.Items ?? []
    items.sort((a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )

    return NextResponse.json({ submissions: items })
  } catch (error) {
    console.error("Admin fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch submissions" }, { status: 500 })
  }
}
