import { NextResponse } from "next/server"
import { UpdateCommand } from "@aws-sdk/lib-dynamodb"
import { db, TABLE_MAIN } from "@/lib/dynamodb"

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const { status, sk } = await req.json() // status: "approved" | "rejected"

  try {
    await db.send(new UpdateCommand({
      TableName: TABLE_MAIN,
      Key: { PK: decodeURIComponent(id), SK: sk },
      UpdateExpression: "SET #status = :status, reviewedAt = :reviewedAt",
      ExpressionAttributeNames: { "#status": "status" },
      ExpressionAttributeValues: {
        ":status": status,
        ":reviewedAt": new Date().toISOString(),
      },
    }))

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Update error:", error)
    return NextResponse.json({ error: "Failed to update status" }, { status: 500 })
  }
}
