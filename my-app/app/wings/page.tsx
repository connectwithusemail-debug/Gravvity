"use client";

import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { wings } from "@/lib/data";
import Link from "next/link";
import MagicBorderCard from "@/components/magic-border-card";
import MagicBorderExact from "@/components/magic-border-exact";
import { useEffect, useRef } from "react";
import { GradualSpacing } from "@/components/Text-Effect";
import { useRouter } from "next/navigation";

export default function WingsPage() {
  // Router hook must be called at top-level, not inside effects
  const router = useRouter();
  const wingsRef = useRef<(HTMLDivElement | null)[]>([]);
  
  const slug = (s: string) =>
    s
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  useEffect(() => {
    const scrollToHash = (hash?: string) => {
      const id = (hash || window.location.hash).replace(/^#/, "");
      if (!id) return;
      const el = document.getElementById(id);
      if (!el) return;
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    scrollToHash();
    const onHashChange = () => scrollToHash(window.location.hash);
    if (typeof window !== "undefined") {
      window.addEventListener("hashchange", onHashChange);
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("hashchange", onHashChange);
      }
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    wingsRef.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section className="min-h-screen bg-background" id="wings">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {/* Header */}
          <div className="text-center mb-16 ">
            <GradualSpacing
              text="Our Seven Wings"
              className="text-5xl md:text-6xl font-bold gradient-text mb-4 select-none"
            />

            <p className="text-xl text-foreground/70">
              Excellence across all domains of technology
            </p>
          </div>

          {/* Wings Grid */}
          <div className="space-y-12">
            {wings.map((wing, index) => {
              const AnimationComponent = wing.animationComponent;

              return (
                <div
                  key={wing.id}
                  id={`wing-${slug(wing.name)}`}
                  className={`grid md:grid-cols-2 gap-8 items-center ${
                    index % 2 === 1 ? "md:flex-row-reverse" : ""
                  }`}
                >
                  <div
                    ref={(el) => { wingsRef.current[index * 2] = el }}
                    className={`${index % 2 === 1 ? "md:order-2" : ""} wings-animate ${index % 2 === 0 ? "fade-in-right" : "fade-in-left"}`}
                    style={{ animationDelay: '0ms' }}
                  >
                    <div
                      className="w-full cursor-pointer max-w-3xl mx-auto"
                      onClick={() => {
                        router.push(`/members?wing=${wing.name}`);
                      }}
                    >
                      <MagicBorderExact
                        className="h-full w-full rounded-2xl"
                        innerClassName="h-full w-full flex items-center justify-center rounded-2xl p-3 sm:p-4 md:p-3 bg-slate-950/60 overflow-hidden"
                      >
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="w-full h-full flex items-center justify-center">
                            {AnimationComponent ? (
                              <AnimationComponent />
                            ) : (
                              wing.icon
                            )}
                          </div>
                        </div>
                      </MagicBorderExact>
                    </div>
                  </div>

                  <div
                    ref={(el) => { wingsRef.current[index * 2 + 1] = el }}
                    className={`${index % 2 === 1 ? "md:order-1" : ""} wings-animate ${index % 2 === 0 ? "fade-in-left" : "fade-in-right"}`}
                    style={{ animationDelay: '100ms' }}
                  >
                    <div className="text-5xl mb-4 gap-3 flex justify-center items-center">
                      <span className="mb-3">{wing.icon}</span>
                      <h2 className="text-4xl font-bold mb-4">{wing.name}</h2>
                    </div>
                    <p className="text-lg text-foreground/70 leading-relaxed mb-6">
                      {wing.description}
                    </p>

                    {/* Wing-specific content */}
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-purple-500 mt-2 shrink-0" />
                        <p className="text-foreground/70">
                          Regular competitions and contests
                        </p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2 shrink-0" />
                        <p className="text-foreground/70">
                          Workshops and skill development
                        </p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-purple-500 mt-2 shrink-0" />
                        <p className="text-foreground/70">
                          Collaborative projects and mentorship
                        </p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2 shrink-0" />
                        <p className="text-foreground/70">
                          Network with industry professionals
                        </p>
                      </div>
                      {/* More link to members page for this wing */}
                      <div className="pt-2">
                        <Link
                          href={{
                            pathname: "/members",
                            query: { wing: wing.name },
                          }}
                          className="inline-flex items-center gap-2 font-semibold text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-cyan-400 hover:opacity-90 transition-opacity"
                        >
                          More...
                          <span aria-hidden>→</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
