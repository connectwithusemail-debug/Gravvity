"use client"

import { useEffect, useState } from "react"
import type { Member } from "@/lib/types"

export function useMembers() {
  const [members, setMembers] = useState<Member[]>([])

  useEffect(() => {
    let cancelled = false

    const loadMembers = async () => {
      try {
        const res = await fetch(`/api/public/members`, {
          headers: { "Content-Type": "application/json" },
        })
        if (!res.ok) return
        const data = (await res.json()) as Member[]
        if (!cancelled) setMembers(data)
      } catch (e) {
        console.error("Failed to load members", e)
      }
    }

    void loadMembers()

    return () => {
      cancelled = true
    }
  }, [])

  return members
}
