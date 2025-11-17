"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Github, ExternalLink } from "lucide-react"
import { useEffect, useState } from "react"
import MagicButton from "@/components/magic-button"

export default function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([])

  useEffect(() => {
    let mounted = true
    async function load() {
      try {
        const res = await fetch('/api/projects')
        if (!res.ok) return
        const data = await res.json()
        if (mounted) setProjects(data)
      } catch (e) {
        console.error('Failed to fetch projects', e)
      }
    }
    load()
    return () => { mounted = false }
  }, [])
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {/* Header */}
          <div className="text-center mb-16 slide-in-up">
            <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-4">Our Projects</h1>
            <p className="text-xl text-foreground/70">Showcasing innovation across all wings</p>
          </div>

          {/* Projects Grid - responsive 1 / 2 / 3 columns like Events */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="card-glow overflow-hidden group slide-in-up h-[440px] flex flex-col"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Project Image on top (match Events proportions) */}
                <div className="relative w-full h-[75%] overflow-hidden">
                  <img
                    src={project.image || "/gravity-logo.ico"}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                {/* Project Content below */}
                <div className="p-5 flex-1 flex flex-col">
                  <div className="self-start w-auto inline-flex items-center px-2 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-xs font-medium text-cyan-300 mb-2">
                    {project.wing}
                  </div>

                  <div className="flex-1">
                    <h3 className="text-lg font-bold mb-1 group-hover:gradient-text transition-all line-clamp-2">{project.title}</h3>
                    {project.description ? (
                      <p className="text-foreground/70 text-sm mt-1">{project.description}</p>
                    ) : null}

                    <div className="mt-3 flex flex-wrap gap-2">
                      {(project.tags?.length ? project.tags : (project.technologies || [])).map((tech: string, idx: number) => (
                        <span key={idx} className="px-2 py-1 rounded text-xs bg-purple-500/20 text-purple-300">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-border mt-4 flex gap-2">
                    {project.githubLink ? (
                      <a href={project.githubLink} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-card hover:bg-card/80 text-sm font-medium transition-all">
                        <Github size={16} />
                        Code
                      </a>
                    ) : (
                      <button disabled className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-card text-foreground/40 cursor-not-allowed text-sm font-medium">
                        <Github size={16} />
                        Code
                      </button>
                    )}
                    {project.devfolioLink ? (
                      <a href={project.devfolioLink} target="_blank" rel="noreferrer" className="flex-1">
                        <MagicButton className="w-full" heightClass="h-10">
                          <ExternalLink size={16} />
                          <span>Devfolio</span>
                        </MagicButton>
                      </a>
                    ) : (
                      <button disabled className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-card text-foreground/40 cursor-not-allowed text-sm font-medium">
                        <ExternalLink size={16} />
                        Devfolio
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
