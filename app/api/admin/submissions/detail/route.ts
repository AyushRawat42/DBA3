import { NextResponse } from "next/server"
import { QueryCommand } from "@aws-sdk/lib-dynamodb"
import { db, TABLE_MAIN } from "@/lib/dynamodb"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const pk = searchParams.get("pk")
   console.log("Detail API received PK:", pk) 
  if (!pk) return NextResponse.json({ error: "Missing pk" }, { status: 400 })

  try {
    const result = await db.send(new QueryCommand({
      TableName: TABLE_MAIN,
      KeyConditionExpression: "PK = :pk",
      ExpressionAttributeValues: { ":pk": pk },
    }))
     console.log("Scan found items:", result.Items?.length)  
    console.log("Looking for PK:", pk)  
    return NextResponse.json({ submission: result.Items?.[0] ?? null })
  } catch (error) {
    console.error("Detail fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 })
  }
}
