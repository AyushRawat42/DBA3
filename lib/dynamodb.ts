import "server-only"
import { ddbDoc } from "@/lib/aws.server"

export const db = ddbDoc
export const TABLE_MAIN =
  process.env.ADMISSIONS_TABLE_NAME ??
  process.env.DDB_TABLE_MAIN ??
  "AspireAdmissions"

export const TABLE_QUEUE = process.env.DDB_TABLE_QUEUE ?? "DBA3_ReviewQueue"
export const TABLE_EVENTS = process.env.DDB_TABLE_EVENTS ?? "DBA3_Events"
