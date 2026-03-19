import { NextResponse } from "next/server"
import { PutCommand, ScanCommand } from "@aws-sdk/lib-dynamodb"
import { db, TABLE_MAIN } from "@/lib/dynamodb"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const item = {
      id: crypto.randomUUID(),
      type: "athlete",
      createdAt: new Date().toISOString(),
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      phone: body.phone,
      dateOfBirth: body.dateOfBirth,
      gender: body.gender,
      aadhaar: body.aadhaar,
      educationalQualification: body.educationalQualification,
    }

    await db.send(new PutCommand({
      TableName: TABLE_MAIN,
      Item: item,
    }))

    return NextResponse.json({ success: true, item })
  } catch (error) {
    console.error("Athlete submission error:", error)
    return NextResponse.json({ error: "Failed to save submission" }, { status: 500 })
  }
}

export async function GET() {
  try {
    const result = await db.send(new ScanCommand({
      TableName: TABLE_MAIN,
      FilterExpression: "#type = :type",
      ExpressionAttributeNames: { "#type": "type" },
      ExpressionAttributeValues: { ":type": "athlete" },
    }))

    return NextResponse.json({ submissions: result.Items ?? [] })
  } catch (error) {
    console.error("Fetch athletes error:", error)
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 })
  }
}
