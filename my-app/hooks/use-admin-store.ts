"use client"

import { useState, useEffect, useCallback } from "react"
import type { Member, Event } from "@/lib/types"

const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000"

const TOKEN_KEY = "gravity_admin_token"

export function useAdminStore() {
  const [members, setMembers] = useState<Member[]>([])
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [authChecked, setAuthChecked] = useState(false)
  const [events, setEvents] = useState<Event[]>([])

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem(TOKEN_KEY) : null
    setIsLoggedIn(!!token)

    const load = async () => {
      try {
        if (!token) {
          // Load public, read-only data
            const [membersRes, eventsRes] = await Promise.all([
              fetch(`${API_BASE}/api/public/members`),
              fetch(`${API_BASE}/api/public/events`),
            ])
            if (membersRes.ok) {
              setMembers(await membersRes.json())
            }
            if (eventsRes.ok) {
              setEvents(await eventsRes.json())
            }
        } else {
          const headers: HeadersInit = {
            Authorization: `Bearer ${token}`,
          }
          const [membersRes, eventsRes] = await Promise.all([
            fetch(`${API_BASE}/api/members`, { headers }),
            fetch(`${API_BASE}/api/events`, { headers }),
          ])
          if (membersRes.ok) setMembers(await membersRes.json())
          if (eventsRes.ok) setEvents(await eventsRes.json())
        }
      } catch (e) {
        console.error("Failed to load admin/public data", e)
      } finally {
        setIsLoading(false)
        setAuthChecked(true)
      }
    }

    void load()
  }, [])

  const login = useCallback(async (id: string, password: string): Promise<boolean> => {
    try {
      const res = await fetch(`${API_BASE}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, password }),
      })

      if (!res.ok) return false

      const data = (await res.json()) as { token?: string }
      if (!data.token) return false

      if (typeof window !== "undefined") {
        localStorage.setItem(TOKEN_KEY, data.token)
      }
      setIsLoggedIn(true)
      return true
    } catch (e) {
      console.error("Admin login failed", e)
      return false
    }
  }, [])

  const logout = useCallback(() => {
    setIsLoggedIn(false)
    if (typeof window !== "undefined") {
      localStorage.removeItem(TOKEN_KEY)
    }
  }, [])
  const authHeaders = (): Record<string, string> => {
    if (typeof window === "undefined") return {}
    const token = localStorage.getItem(TOKEN_KEY)
    return token ? { Authorization: `Bearer ${token}` } : {}
  }

  const saveMember = useCallback(async (member: Member) => {
    try {
      const res = await fetch(`${API_BASE}/api/members/${member.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", ...authHeaders() },
        body: JSON.stringify(member),
      })
      if (!res.ok) return
      const updated = (await res.json()) as Member
      setMembers((prev) => prev.map((m) => (m.id === updated.id ? updated : m)))
    } catch (e) {
      console.error("Failed to save member", e)
    }
  }, [])

  const addMember = useCallback(async (member: Omit<Member, "id" | "createdAt">) => {
    try {
      const res = await fetch(`${API_BASE}/api/members`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...authHeaders() },
        body: JSON.stringify(member),
      })
      if (!res.ok) throw new Error("Failed to create member")
      const created = (await res.json()) as Member
      setMembers((prev) => [...prev, created])
      return created
    } catch (e) {
      console.error("Failed to add member", e)
      throw e
    }
  }, [])

  const deleteMember = useCallback(async (id: string) => {
    try {
      const res = await fetch(`${API_BASE}/api/members/${id}`, {
        method: "DELETE",
        headers: authHeaders(),
      })
      if (!res.ok && res.status !== 204) return
      setMembers((prev) => prev.filter((m) => m.id !== id))
    } catch (e) {
      console.error("Failed to delete member", e)
    }
  }, [])

  // Events CRUD
  const addEvent = useCallback(async (event: Omit<Event, "id" | "createdAt">) => {
    try {
      const res = await fetch(`${API_BASE}/api/events`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...authHeaders() },
        body: JSON.stringify(event),
      })
      if (!res.ok) throw new Error("Failed to create event")
      const created = (await res.json()) as Event
      setEvents((prev) => [...prev, created])
      return created
    } catch (e) {
      console.error("Failed to add event", e)
      throw e
    }
  }, [])

  const saveEvent = useCallback(async (event: Event) => {
    try {
      const res = await fetch(`${API_BASE}/api/events/${event.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", ...authHeaders() },
        body: JSON.stringify(event),
      })
      if (!res.ok) return
      const updated = (await res.json()) as Event
      setEvents((prev) => prev.map((e) => (e.id === updated.id ? updated : e)))
    } catch (e) {
      console.error("Failed to save event", e)
    }
  }, [])

  const deleteEvent = useCallback(async (id: string) => {
    try {
      const res = await fetch(`${API_BASE}/api/events/${id}`, {
        method: "DELETE",
        headers: authHeaders(),
      })
      if (!res.ok && res.status !== 204) return
      setEvents((prev) => prev.filter((e) => e.id !== id))
    } catch (e) {
      console.error("Failed to delete event", e)
    }
  }, [])

  // Deprecated external auth check; state is established once on mount.
  const checkAuth = useCallback(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem(TOKEN_KEY) : null
    setIsLoggedIn(!!token)
    setAuthChecked(true)
  }, [])

  return {
    members,
    events,
    isLoggedIn,
    isLoading,
    login,
    logout,
    saveMember,
    addMember,
    deleteMember,
    addEvent,
    saveEvent,
    deleteEvent,
    checkAuth,
    authChecked,
  }
}
