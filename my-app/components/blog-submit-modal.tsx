"use client"

import { useEffect, useState } from "react"
import MagicButton from "@/components/magic-button"
import { submitBlog } from "@/lib/blog-store"

function isMediumUrl(url: string) {
  try {
    const u = new URL(url)
    const host = u.hostname.toLowerCase()
    // Accept medium.com or *.medium.com or link.medium.com
    return host === "medium.com" || host.endsWith(".medium.com")
  } catch {
    return false
  }
}

export default function BlogSubmitModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [name, setName] = useState("")
  const [roll, setRoll] = useState("")
  const [link, setLink] = useState("")
  const [error, setError] = useState<string>("")

  useEffect(() => {
    if (open) {
      setName("")
      setRoll("")
      setLink("")
      setError("")
    }
  }, [open])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md card-glow p-6 rounded-2xl bg-card">
        <h3 className="text-xl font-bold mb-4">Submit Medium Blog</h3>
        {error && <div className="mb-3 text-sm text-red-400">{error}</div>}
        <form
          onSubmit={(e) => {
            e.preventDefault()
            const trimmed = link.trim()
            if (!name.trim() || !roll.trim() || !trimmed) {
              setError("All fields are required")
              return
            }
            if (!isMediumUrl(trimmed)) {
              setError("Only Medium links are allowed (medium.com)")
              return
            }
            submitBlog({ name, rollNumber: roll, mediumUrl: trimmed })
            onClose()
            alert("Submitted! Awaiting admin approval.")
          }}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm font-semibold mb-1">Name</label>
            <input
              value={name}
              onChange={e=>setName(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Your full name"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Roll Number</label>
            <input
              value={roll}
              onChange={e=>setRoll(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="e.g. 23BCS1234"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Medium Link</label>
            <input
              value={link}
              onChange={e=>setLink(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="https://medium.com/@username/article"
            />
          </div>
          <div className="flex gap-3 pt-2">
            <MagicButton type="submit" className="flex-1" heightClass="h-11">Submit</MagicButton>
            <button type="button" onClick={onClose} className="flex-1 px-4 py-2 rounded-lg bg-card border border-border hover:bg-card/80">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  )
}
