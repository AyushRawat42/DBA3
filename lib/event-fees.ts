export function daysUntil(dateISO: string) {
  const today = new Date()
  const eventDate = new Date(dateISO)
  const ms = eventDate.getTime() - today.getTime()
  return Math.ceil(ms / (1000 * 60 * 60 * 24))
}

/**
 * Fee rule:
 * - First 30 days window: fee = baseFee (X)
 * - Final 15–20 days window: fee = baseFee + 500
 *
 * Implementation:
 * - If daysUntilEvent <= lateFeeWindowDays => late fee
 * - Otherwise base fee
 */
export function getEventFee({
  eventDateISO,
  baseFee,
  lateFeeWindowDays = 20,
  lateFeeAdd = 500,
}: {
  eventDateISO: string
  baseFee: number
  lateFeeWindowDays?: number
  lateFeeAdd?: number
}) {
  const d = daysUntil(eventDateISO)
  const isLate = d <= lateFeeWindowDays
  return {
    daysUntilEvent: d,
    amount: isLate ? baseFee + lateFeeAdd : baseFee,
    isLate,
    baseFee,
    lateFeeAdd,
    lateFeeWindowDays,
  }
}
