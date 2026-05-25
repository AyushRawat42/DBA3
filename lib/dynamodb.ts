import "server-only"
import { ddbDoc } from "@/lib/aws.server"

export const db = ddbDoc
export const TABLE_MAIN =
  process.env.ADMISSIONS_TABLE_NAME ??
  process.env.DDB_TABLE_MAIN ??
  "AspireAdmissions"
