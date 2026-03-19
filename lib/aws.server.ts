import "server-only"

import { S3Client } from "@aws-sdk/client-s3"
import { DynamoDBClient } from "@aws-sdk/client-dynamodb"
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb"
import { env } from "@/lib/env"

const baseConfig = {
  region: env.APP_AWS_REGION,
   credentials: {
    accessKeyId: env.APP_AWS_ACCESS_KEY_ID!,      // ← added
    secretAccessKey: env.APP_AWS_SECRET_ACCESS_KEY!,  // ← added
  },
}

export const s3 = new S3Client(baseConfig)

const ddb = new DynamoDBClient(baseConfig)
export const ddbDoc = DynamoDBDocumentClient.from(ddb)
