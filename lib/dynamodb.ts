import "server-only"
import { ddbDoc } from "@/lib/aws.server"
import { TABLE_MAIN } from "@/lib/env"

export const db = ddbDoc
export { TABLE_MAIN }
