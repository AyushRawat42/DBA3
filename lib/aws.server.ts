import "server-only"
import { DynamoDBClient } from "@aws-sdk/client-dynamodb"
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb"

const baseConfig = { region: process.env.AWS_REGION ?? "ap-south-1" }

const ddb = new DynamoDBClient(baseConfig)
export const ddbDoc = DynamoDBDocumentClient.from(ddb)
