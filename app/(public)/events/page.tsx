import type { Metadata } from "next"
import { EventsClient } from "./events_client"

export const metadata: Metadata = {
  title: "Events & Calendar | Dehradun Boxing Association",
  description: "Boxing events, championships, and training workshops in Dehradun",
}

export default function EventsPage() {
  return <EventsClient />
}
