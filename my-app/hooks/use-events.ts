"use client"

import { useEffect, useState } from "react"
import type { Event } from "@/lib/types"

export function useEvents() {
  const [events, setEvents] = useState<Event[]>([])

  useEffect(() => {
    let cancelled = false

    const load = async () => {
      try {
        const res = await fetch(`/api/public/events`, {
          headers: { "Content-Type": "application/json" },
        })
        if (!res.ok) return
        const data = (await res.json()) as Event[]
        if (!cancelled) setEvents(data)
      } catch (e) {
        console.error("Failed to load events", e)
      }
    }

    void load()
    return () => { cancelled = true }
  }, [])

  return events
}
