"use client"

import { useState } from "react"
import MagicButton from "@/components/magic-button"

export interface ProjectInput {
  title: string
  wing: string
  githubLink?: string
  devfolioLink?: string
  image?: string
  tags: string[]
  description?: string
}

export function ProjectForm({ onSubmit, onCancel }: { onSubmit: (p: ProjectInput) => void; onCancel: () => void }) {
  const [title, setTitle] = useState("")
  const [wing, setWing] = useState("")
  const [github, setGithub] = useState("")
  const [devfolio, setDevfolio] = useState("")
  const [image, setImage] = useState("")
  const [tagInput, setTagInput] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [description, setDescription] = useState("")

  const addTag = () => {
    const t = tagInput.trim()
    if (!t) return
    if (!tags.includes(t)) setTags((prev) => [...prev, t])
    setTagInput("")
  }

  const removeTag = (t: string) => setTags((prev) => prev.filter((x) => x !== t))

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (!title.trim() || !wing.trim()) return
        onSubmit({
          title: title.trim(),
          wing: wing.trim(),
          githubLink: github.trim() || undefined,
          devfolioLink: devfolio.trim() || undefined,
          image: image.trim() || undefined,
          tags,
          description: description.trim() || undefined,
        })
      }}
    >
      <div>
        <label className="block text-sm font-semibold mb-1">Title *</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-3 py-2 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-purple-500" />
      </div>
      <div>
        <label className="block text-sm font-semibold mb-1">Wing *</label>
        <input value={wing} onChange={(e) => setWing(e.target.value)} className="w-full px-3 py-2 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-purple-500" />
      </div>
      <div>
        <label className="block text-sm font-semibold mb-1">GitHub Code Link</label>
        <input value={github} onChange={(e) => setGithub(e.target.value)} placeholder="https://github.com/..." className="w-full px-3 py-2 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-purple-500" />
      </div>
      <div>
        <label className="block text-sm font-semibold mb-1">Devfolio Link</label>
        <input value={devfolio} onChange={(e) => setDevfolio(e.target.value)} placeholder="https://devfolio.co/..." className="w-full px-3 py-2 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-purple-500" />
      </div>
      <div>
        <label className="block text-sm font-semibold mb-1">Image URL</label>
        <input value={image} onChange={(e) => setImage(e.target.value)} placeholder="Leave empty to use /gravity-logo.png" className="w-full px-3 py-2 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-purple-500" />
      </div>
      <div>
        <label className="block text-sm font-semibold mb-1">Tags</label>
        <div className="flex gap-2">
          <input
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ',') {
                e.preventDefault();
                addTag();
              }
            }}
            placeholder="e.g. React, MongoDB"
            className="flex-1 px-3 py-2 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button type="button" onClick={addTag} className="px-4 py-2 rounded-lg bg-card border border-border hover:bg-card/80">Add</button>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {tags.map((t) => (
            <span key={t} className="px-2 py-1 rounded text-xs bg-purple-500/20 text-purple-300 cursor-pointer" onClick={() => removeTag(t)}>
              {t} ×
            </span>
          ))}
        </div>
      </div>
      <div>
        <label className="block text-sm font-semibold mb-1">Description</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="w-full px-3 py-2 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-purple-500" />
      </div>
      <div className="flex gap-3 pt-2">
        <MagicButton type="submit" className="flex-1" heightClass="h-11">Save Project</MagicButton>
        <button type="button" onClick={onCancel} className="flex-1 px-4 py-2 rounded-lg bg-card border border-border hover:bg-card/80">Cancel</button>
      </div>
    </form>
  )
}
