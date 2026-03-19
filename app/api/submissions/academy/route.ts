import { NextResponse } from "next/server"
import { PutCommand, ScanCommand } from "@aws-sdk/lib-dynamodb"
import { db, TABLE_MAIN } from "@/lib/dynamodb"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const item = {
      id: crypto.randomUUID(),
      type: "academy",
      createdAt: new Date().toISOString(),
      academyName: body.academyName,
      ownerName: body.ownerName,
      email: body.email,
      phone: body.phone,
      address: body.address,
      gstin: body.gstin ?? "",
      dbaMembershipNumber: body.dbaMembershipNumber,
    }

    await db.send(new PutCommand({
      TableName: TABLE_MAIN,
      Item: item,
    }))

    return NextResponse.json({ success: true, item })
  } catch (error) {
    console.error("Academy submission error:", error)
    return NextResponse.json({ error: "Failed to save submission" }, { status: 500 })
  }
}

export async function GET() {
  try {
    const result = await db.send(new ScanCommand({
      TableName: TABLE_MAIN,
      FilterExpression: "#type = :type",
      ExpressionAttributeNames: { "#type": "type" },
      ExpressionAttributeValues: { ":type": "academy" },
    }))

    return NextResponse.json({ submissions: result.Items ?? [] })
  } catch (error) {
    console.error("Fetch academies error:", error)
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 })
  }
}
