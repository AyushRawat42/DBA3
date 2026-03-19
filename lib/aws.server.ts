import "server-only"
import { S3Client } from "@aws-sdk/client-s3"
import { DynamoDBClient } from "@aws-sdk/client-dynamodb"
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb"

const baseConfig = { region: process.env.AWS_REGION ?? "ap-south-1" }

export const s3 = new S3Client(baseConfig)
const ddb = new DynamoDBClient(baseConfig)
export const ddbDoc = DynamoDBDocumentClient.from(ddb)
