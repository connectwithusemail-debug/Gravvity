"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { defaultBlogs } from "@/lib/data"
import { useEffect, useMemo, useState } from "react"
import BlogSubmitModal from "@/components/blog-submit-modal"
import { Calendar, User, Tag, Search, X } from "lucide-react"
import MagicButton from "@/components/magic-button"

export default function BlogsPage() {
  const formatDate = (input: string | number | Date) =>
    new Date(input).toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: '2-digit' })

  const [open, setOpen] = useState(false)
  const [approved, setApproved] = useState(() => [] as any[])
  const [query, setQuery] = useState("")

  useEffect(() => {
    // Load approved blogs from server on mount and when window regains focus
    let mounted = true
    async function fetchApproved() {
      try {
        const res = await fetch('/api/public/blogs')
        if (!res.ok) return
        const data = await res.json()
        if (mounted) setApproved(data)
      } catch (e) {
        console.error('Failed to fetch approved blogs', e)
      }
    }
    fetchApproved()
    const onFocus = () => fetchApproved()
    window.addEventListener('focus', onFocus)
    return () => {
      mounted = false
      window.removeEventListener('focus', onFocus)
    }
  }, [])

  const communityCards = useMemo(() => approved.map((b) => (
    <a key={b.id} href={b.mediumUrl} target="_blank" rel="noreferrer"
       className="block card-glow overflow-hidden group cursor-pointer slide-in-up">
      <div className="p-6 grid md:grid-cols-3 gap-6">
        <div className="md:col-span-1 h-48 md:h-auto rounded-lg overflow-hidden wing-card-gradient flex items-center justify-center text-6xl">✍️</div>
        <div className="md:col-span-2 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm font-medium text-purple-300 bg-purple-500/20 px-3 py-1 rounded-full">Community</span>
            </div>
            <h2 className="text-2xl font-bold mb-3 group-hover:gradient-text transition-all">Medium Article</h2>
            <p className="text-foreground/70 break-all mb-2">{b.mediumUrl}</p>
          </div>
            <div className="flex flex-wrap gap-4 text-sm text-foreground/60 pt-4 border-t border-border">
            <div className="flex items-center gap-1"><span>By</span><span className="font-medium">{b.name}</span></div>
            <div className="flex items-center gap-1"><span>Roll</span><span className="font-medium">{b.rollNumber}</span></div>
            <div className="flex items-center gap-1"><span>{formatDate(b.createdAt)}</span></div>
          </div>
        </div>
      </div>
    </a>
  )), [approved])

  const staticPosts = useMemo(() =>
    [...defaultBlogs].sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  , [])

  const normalizedQuery = query.trim().toLowerCase()

  const filteredApproved = useMemo(() => {
    if (!normalizedQuery) return approved
    return approved.filter(b => {
      return (
        b.name.toLowerCase().includes(normalizedQuery) ||
        b.rollNumber.toLowerCase().includes(normalizedQuery) ||
        b.mediumUrl.toLowerCase().includes(normalizedQuery)
      )
    })
  }, [approved, normalizedQuery])

  const filteredStaticPosts = useMemo(() => {
    if (!normalizedQuery) return staticPosts
    return staticPosts.filter(p => {
      return (
        p.title.toLowerCase().includes(normalizedQuery) ||
        (p.author || "").toLowerCase().includes(normalizedQuery)
      )
    })
  }, [staticPosts, normalizedQuery])
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {/* Header with search */}
          <div className="mb-10 slide-in-up">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="text-left">
                <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-2">Blog & Articles</h1>
                <p className="text-base md:text-lg text-foreground/70">Insights and stories from our community</p>
              </div>

                <div className="flex items-center gap-2 w-full md:w-1/3">
                <div className="relative flex-1">
                  <input
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    placeholder="Search by name, title or roll..."
                    className="w-full pl-10 pr-10 py-2 rounded-lg bg-card border border-border text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/50" />
                  {query ? (
                    <button onClick={() => setQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/50">
                      <X />
                    </button>
                  ) : null}
                </div>
                <button
                  onClick={() => {
                    // normalize query to trigger any filtering and remove focus
                    setQuery(q => q.trim())
                    const el = document.querySelector('#blog-search-input') as HTMLInputElement | null
                    if (el) el.blur()
                  }}
                  className="px-4 py-2 rounded-lg bg-card border border-border hover:bg-card/80 text-sm flex items-center gap-2"
                  aria-label="Search blogs"
                >
                  <Search />
                  <span>Search</span>
                </button>
              </div>
            </div>
          </div>

          {/* Blog Posts (latest on top) - grid like Events/Projects */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/** Community submissions first */}
            {filteredApproved.map((b, idx) => (
              <a
                key={b.id}
                href={b.mediumUrl}
                target="_blank"
                rel="noreferrer"
                className="block card-glow overflow-hidden group cursor-pointer slide-in-up h-[440px] flex flex-col"
                style={{ animationDelay: `${idx * 0.06}s` }}
              >
                {/* Top area: matching card background with centered logo */}
                <div className="relative w-full h-[75%] overflow-hidden bg-card flex items-center justify-center rounded-t-lg">
                  <div className="rounded-full bg-black/80 p-3 transition-transform duration-300 group-hover:scale-105">
                    <img
                      src="/gravity-logo.png"
                      alt="Gravity logo"
                      className="w-40 h-40 object-contain"
                    />
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-sm font-medium text-purple-300 bg-purple-500/20 px-3 py-1 rounded-full">Community</span>
                  </div>

                  <div className="flex-1">
                    <h2 className="text-lg font-bold mb-2 group-hover:gradient-text transition-all line-clamp-2">Medium Article</h2>
                    <p className="text-foreground/70 break-all text-sm mb-2">{b.mediumUrl}</p>
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm text-foreground/60 pt-3 border-t border-border mt-4">
                    <div className="flex items-center gap-1"><span>By</span><span className="font-medium">{b.name}</span></div>
                    <div className="flex items-center gap-1"><span>Roll</span><span className="font-medium">{b.rollNumber}</span></div>
                    <div className="flex items-center gap-1"><span>{new Date(b.createdAt).toLocaleDateString()}</span></div>
                  </div>
                </div>
              </a>
            ))}

            {filteredStaticPosts.map((post, index) => (
              <article
                key={post.id}
                className="card-glow overflow-hidden group cursor-pointer slide-in-up h-[440px] flex flex-col"
                style={{ animationDelay: `${index * 0.06}s` }}
              >
                <div className="relative w-full h-[75%] overflow-hidden">
                  <img
                    src={post.image || "/placeholder.svg?key=blog"}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-3">
                    <Tag size={16} className="text-purple-500" />
                    <span className="text-sm font-medium text-purple-300 bg-purple-500/20 px-3 py-1 rounded-full">{post.category}</span>
                  </div>

                  <div className="flex-1">
                    <h2 className="text-lg font-bold mb-2 group-hover:gradient-text transition-all line-clamp-2">{post.title}</h2>
                    <p className="text-foreground/70 text-sm line-clamp-3 mb-3">{post.content}</p>
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm text-foreground/60 pt-3 border-t border-border mt-4">
                    <div className="flex items-center gap-1">
                      <User size={16} />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar size={16} />
                      <span>{formatDate(post.date)}</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filteredApproved.length === 0 && filteredStaticPosts.length === 0 && (
            <div className="mt-8 text-center text-foreground/60">No results found for "{query}"</div>
          )}

          {/* CTA for more blogs */}
          <div className="mt-16 card-glow p-8 text-center slide-in-up">
            <h2 className="text-3xl font-bold mb-4">Share Your Story</h2>
            <p className="text-foreground/70 mb-6">
              Are you working on something interesting? Share your insights with the Gravity community!
            </p>
            <MagicButton heightClass="h-11" onClick={()=>setOpen(true)}>
              Submit Article
            </MagicButton>
          </div>
        </div>
      </main>
      <BlogSubmitModal open={open} onClose={()=>{ setOpen(false); (async()=>{ try { const res = await fetch('/api/public/blogs'); if(res.ok){ setApproved(await res.json()) } } catch {} })() }} />
      <Footer />
    </>
  )
}
