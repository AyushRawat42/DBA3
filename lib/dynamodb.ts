import { DynamoDBClient } from "@aws-sdk/client-dynamodb"
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb"

const client = new DynamoDBClient({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
})

export const db = DynamoDBDocumentClient.from(client)
export const TABLE_MAIN = process.env.DDB_TABLE_MAIN!
export const TABLE_QUEUE = process.env.DDB_TABLE_QUEUE!
export const TABLE_EVENTS = process.env.DDB_TABLE_EVENTS!

