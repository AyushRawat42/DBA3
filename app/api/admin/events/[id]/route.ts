import { NextResponse } from "next/server"
import { DeleteCommand } from "@aws-sdk/lib-dynamodb"
import { db, TABLE_EVENTS } from "@/lib/dynamodb"

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  try {
    await db.send(new DeleteCommand({
      TableName: TABLE_EVENTS,
      Key: {
        PK: `EVENT#${id}`,
        SK: `EVENT#${id}`,
      },
    }))
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Delete event error:", error)
    return NextResponse.json({ error: "Failed to delete event" }, { status: 500 })
  }
}
