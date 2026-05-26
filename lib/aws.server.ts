import "server-only"
import { DynamoDBClient, type DynamoDBClientConfig } from "@aws-sdk/client-dynamodb"
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb"

const accessKeyId = process.env.AWS_ACCESS_KEY_ID ?? process.env.APP_AWS_ACCESS_KEY_ID
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY ?? process.env.APP_AWS_SECRET_ACCESS_KEY

const baseConfig: DynamoDBClientConfig = {
  region: process.env.AWS_REGION ?? process.env.APP_AWS_REGION ?? "ap-south-1",
  ...(accessKeyId && secretAccessKey
    ? {
        credentials: {
          accessKeyId,
          secretAccessKey,
        },
      }
    : {}),
}

const ddb = new DynamoDBClient(baseConfig)
export const ddbDoc = DynamoDBDocumentClient.from(ddb)
