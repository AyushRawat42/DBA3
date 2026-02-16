import { z } from "zod"

const envSchema = z.object({
  AWS_REGION: z.string().min(1),
  AWS_ACCESS_KEY_ID: z.string().min(1).optional(),
  AWS_SECRET_ACCESS_KEY: z.string().min(1).optional(),

  S3_BUCKET_NAME: z.string().min(1),
  DDB_TABLE_MAIN: z.string().min(1),
  DDB_TABLE_QUEUE: z.string().min(1),
})

export const env = envSchema.parse({
  AWS_REGION: process.env.AWS_REGION,
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
  S3_BUCKET_NAME: process.env.S3_BUCKET_NAME,
  DDB_TABLE_MAIN: process.env.DDB_TABLE_MAIN,
  DDB_TABLE_QUEUE: process.env.DDB_TABLE_QUEUE,
})
