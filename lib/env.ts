import { z } from "zod"

const envSchema = z.object({
  APP_AWS_REGION: z.string().min(1),
  APP_AWS_ACCESS_KEY_ID: z.string().min(1).optional(),
  APP_AWS_SECRET_ACCESS_KEY: z.string().min(1).optional(),

  S3_BUCKET_NAME: z.string().min(1),
  DDB_TABLE_MAIN: z.string().min(1),
  DDB_TABLE_QUEUE: z.string().min(1),

})

export const env = envSchema.parse({
  APP_AWS_REGION: process.env.APP_AWS_REGION,
  APP_AWS_ACCESS_KEY_ID: process.env.APP_AWS_ACCESS_KEY_ID,
  APP_AWS_SECRET_ACCESS_KEY: process.env.APP_AWS_SECRET_ACCESS_KEY,
  S3_BUCKET_NAME: process.env.S3_BUCKET_NAME,
  DDB_TABLE_MAIN: process.env.DDB_TABLE_MAIN,
  DDB_TABLE_QUEUE: process.env.DDB_TABLE_QUEUE,
})
