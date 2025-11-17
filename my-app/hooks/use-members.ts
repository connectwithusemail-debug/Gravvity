"use client"

import { useEffect, useState } from "react"
import type { Member } from "@/lib/types"

const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000"

export function useMembers() {
  const [members, setMembers] = useState<Member[]>([])

  useEffect(() => {
    let cancelled = false

    const loadMembers = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/public/members`, {
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
