import "server-only"
import { DynamoDBClient, type DynamoDBClientConfig } from "@aws-sdk/client-dynamodb"
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb"
import { awsAccessKeyId, awsRegion, awsSecretAccessKey } from "@/lib/env"

const baseConfig: DynamoDBClientConfig = {
  region: awsRegion,
  ...(awsAccessKeyId && awsSecretAccessKey
    ? {
        credentials: {
          accessKeyId: awsAccessKeyId,
          secretAccessKey: awsSecretAccessKey,
        },
      }
    : {}),
}

const ddb = new DynamoDBClient(baseConfig)
export const ddbDoc = DynamoDBDocumentClient.from(ddb)
