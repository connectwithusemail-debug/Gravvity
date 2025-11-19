"use client";

import { useState, useEffect, useCallback } from "react";
import type { Member, Event } from "@/lib/types";

const TOKEN_KEY = "gravity_admin_token";

export function useAdminStore() {
  const [members, setMembers] = useState<Member[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem(TOKEN_KEY) : null;
    setIsLoggedIn(!!token);

    const load = async () => {
      if (!token) {
        setIsLoading(false);
        setAuthChecked(true);
        return;
      }

      try {
        const headers: HeadersInit = {
          Authorization: `Bearer ${token}`,
        };

        const [membersRes, eventsRes] = await Promise.all([
          fetch(`/api/members`, { headers }),
          fetch(`/api/events`, { headers }),
        ]);

        if (membersRes.status === 401 || eventsRes.status === 401) {
          // Token invalid or expired: clear and reflect logged-out state
          if (typeof window !== "undefined") localStorage.removeItem(TOKEN_KEY);
          setIsLoggedIn(false);
        }

        if (membersRes.ok) {
          const data = (await membersRes.json()) as Member[];
          setMembers(data);
          try {
            localStorage.setItem("gravity_members", JSON.stringify(data));
            window.dispatchEvent(
              new StorageEvent("storage", {
                key: "gravity_members",
                newValue: JSON.stringify(data),
              })
            );
          } catch {}
        }

        if (eventsRes.ok) {
          const data = (await eventsRes.json()) as Event[];
          setEvents(data);
          try {
            localStorage.setItem("gravity_events", JSON.stringify(data));
            window.dispatchEvent(
              new StorageEvent("storage", {
                key: "gravity_events",
                newValue: JSON.stringify(data),
              })
            );
          } catch {}
        }
      } catch (e) {
        console.error("Failed to load admin data", e);
      } finally {
        setIsLoading(false);
        setAuthChecked(true);
      }
    };

    void load();
  }, []);

  const login = useCallback(
    async (id: string, password: string): Promise<boolean> => {
      try {
        setIsLoading(true);
        const res = await fetch(`/api/admin/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id, password }),
        });

        if (!res.ok) return false;

        const data = (await res.json()) as { token?: string };
        if (!data.token) return false;

        if (typeof window !== "undefined") {
          localStorage.setItem(TOKEN_KEY, data.token);
        }
        setIsLoggedIn(true);
        return true;
      } catch (e) {
        console.error("Admin login failed", e);
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    if (typeof window !== "undefined") {
      localStorage.removeItem(TOKEN_KEY);
    }
  }, []);
  const authHeaders = (): Record<string, string> => {
    if (typeof window === "undefined") return {};
    const token = localStorage.getItem(TOKEN_KEY);
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const saveMember = useCallback(async (member: Member) => {
    try {
      const res = await fetch(`/api/members/${member.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", ...authHeaders() },
        body: JSON.stringify(member),
      });
      if (!res.ok) return;
      const updated = (await res.json()) as Member;
      setMembers((prev) => {
        const next = prev.map((m) => (m.id === updated.id ? updated : m));
        try {
          localStorage.setItem("gravity_members", JSON.stringify(next));
          window.dispatchEvent(
            new StorageEvent("storage", {
              key: "gravity_members",
              newValue: JSON.stringify(next),
            })
          );
        } catch {}
        return next;
      });
    } catch (e) {
      console.error("Failed to save member", e);
    }
  }, []);

  const addMember = useCallback(
    async (member: Omit<Member, "id" | "createdAt">) => {
      try {
        // Client-side validation to prevent sending incomplete payloads
        if (!member || !member.name || !member.role) {
          throw new Error('Member must include name and role')
        }
        if (member.role !== 'coordinator' && !member.wing) {
          throw new Error('Member must include a wing unless coordinator')
        }
        const res = await fetch(`/api/members`, {
          method: "POST",
          headers: { "Content-Type": "application/json", ...authHeaders() },
          body: JSON.stringify(member),
        });
        if (!res.ok) {
          const text = await res.text().catch(() => '')
          throw new Error(`Failed to create member: ${res.status} ${text}`)
        }
        const created = (await res.json()) as Member;
        setMembers((prev) => {
          const next = [...prev, created];
          try {
            localStorage.setItem("gravity_members", JSON.stringify(next));
            window.dispatchEvent(
              new StorageEvent("storage", {
                key: "gravity_members",
                newValue: JSON.stringify(next),
              })
            );
          } catch {}
          return next;
        });
        return created;
      } catch (e) {
        console.error("Failed to add member", e);
        throw e;
      }
    },
    []
  );

  const deleteMember = useCallback(async (id: string) => {
    try {
      const res = await fetch(`/api/members/${id}`, {
        method: "DELETE",
        headers: authHeaders(),
      });
      if (!res.ok && res.status !== 204) return;
      setMembers((prev) => {
        const next = prev.filter((m) => m.id !== id);
        try {
          localStorage.setItem("gravity_members", JSON.stringify(next));
          window.dispatchEvent(
            new StorageEvent("storage", {
              key: "gravity_members",
              newValue: JSON.stringify(next),
            })
          );
        } catch {}
        return next;
      });
    } catch (e) {
      console.error("Failed to delete member", e);
    }
  }, []);

  // Events CRUD
  const addEvent = useCallback(
    async (event: Omit<Event, "id" | "createdAt">) => {
      try {
        // Basic client-side validation to catch missing required fields early
        if (!event || !event.title || !event.date || !event.wing || !event.description) {
          throw new Error('Event payload missing required fields: title, date, wing, description')
        }
        const res = await fetch(`/api/events`, {
          method: "POST",
          headers: { "Content-Type": "application/json", ...authHeaders() },
          body: JSON.stringify(event),
        });
        if (!res.ok) {
          const text = await res.text().catch(() => '')
          throw new Error(`Failed to create event: ${res.status} ${text}`)
        }
        const created = (await res.json()) as Event;
        setEvents((prev) => {
          const next = [...prev, created];
          try {
            localStorage.setItem("gravity_events", JSON.stringify(next));
            window.dispatchEvent(
              new StorageEvent("storage", {
                key: "gravity_events",
                newValue: JSON.stringify(next),
              })
            );
          } catch {}
          return next;
        });
        return created;
      } catch (e) {
        console.error("Failed to add event", e);
        throw e;
      }
    },
    []
  );

  const saveEvent = useCallback(async (event: Event) => {
    try {
      const res = await fetch(`/api/events/${event.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", ...authHeaders() },
        body: JSON.stringify(event),
      });
      if (!res.ok) return;
      const updated = (await res.json()) as Event;
      setEvents((prev) => {
        const next = prev.map((e) => (e.id === updated.id ? updated : e));
        try {
          localStorage.setItem("gravity_events", JSON.stringify(next));
          window.dispatchEvent(
            new StorageEvent("storage", {
              key: "gravity_events",
              newValue: JSON.stringify(next),
            })
          );
        } catch {}
        return next;
      });
    } catch (e) {
      console.error("Failed to save event", e);
    }
  }, []);

  const deleteEvent = useCallback(async (id: string) => {
    try {
      const res = await fetch(`/api/events/${id}`, {
        method: "DELETE",
        headers: authHeaders(),
      });
      if (!res.ok && res.status !== 204) return;
      setEvents((prev) => {
        const next = prev.filter((e) => e.id !== id);
        try {
          localStorage.setItem("gravity_events", JSON.stringify(next));
          window.dispatchEvent(
            new StorageEvent("storage", {
              key: "gravity_events",
              newValue: JSON.stringify(next),
            })
          );
        } catch {}
        return next;
      });
    } catch (e) {
      console.error("Failed to delete event", e);
    }
  }, []);

  // Deprecated external auth check; state is established once on mount.
  const checkAuth = useCallback(() => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem(TOKEN_KEY) : null;
    setIsLoggedIn(!!token);
    setAuthChecked(true);
  }, []);

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
  };
}
