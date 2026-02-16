import { randomUUID } from "crypto"

export function newRegistrationId() {
  // readable + safe enough for ids; UUID avoids collisions
  return `reg_${randomUUID()}`
}
