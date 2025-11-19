"use client";

import { useEffect, useState, useMemo } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Calendar, MapPin, X } from "lucide-react";
import MagicButton from "@/components/magic-button";
import { useEvents } from "@/hooks/use-events";
import type { Event } from "@/lib/types";

type EventCardProps = {
  event: Event;
  index: number;
  setSelected: (e: Event | null) => void;
};

function EventCard({ event, index, setSelected }: EventCardProps) {
  return (
    <div
      key={event.id}
      className="card-glow overflow-hidden group slide-in-up flex flex-col hover:scale-101 mx-auto w-full max-w-[440px] h-full"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Image Section */}
      <div className="relative w-full  aspect-square sm:aspect-3/2 md:aspect-square bg-black overflow-hidden">
        <img
          src={event.image || "/gravity-logo.png"}
          alt={event.title}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover object-center transform transition-transform duration-700 ease-out"
        />
      </div>

      {/* Content */}
      <div className="px-4 py-3 sm:px-5 sm:py-4 md:px-6 md:py-5 flex flex-col flex-1">
        <div className="inline-block px-3 py-0.5 rounded-full bg-purple-500/20 border border-purple-500/30 text-xs font-medium text-purple-300 mb-2">
          {event.wing}
        </div>

        <h3 className="text-base sm:text-lg font-semibold group-hover:gradient-text transition-all line-clamp-2">
          {event.title}
        </h3>

        {/* Date + Venue */}
        <div className="pt-3 border-t border-border mt-2 flex flex-wrap justify-between gap-3 text-sm text-foreground/60">
          <div className="flex items-center gap-1.5">
            <Calendar size={15} />
            <span>{new Date(event.date).toLocaleDateString()}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <MapPin size={15} />
            <span>Campus</span>
          </div>
        </div>

        <button
          onClick={() => setSelected(event)}
          className="mt-3 text-sm font-medium text-primary hover:opacity-80 transition inline-flex items-center gap-1 self-start"
        >
          More <span aria-hidden>→</span>
        </button>
      </div>
    </div>
  );
}



export default function EventsPage() {
  const events = useEvents();
  const [selected, setSelected] = useState<Event | null>(null);
  const [email, setEmail] = useState("");
  const [subStatus, setSubStatus] = useState<
    "idle" | "loading" | "ok" | "error"
  >("idle");
  const [subMessage, setSubMessage] = useState("");

  // Close on ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  const [showAll, setShowAll] = useState(false);
  const VISIBLE_LIMIT = 6;
  const sorted = useMemo(() => {
    // Sort by numeric id (new additions get higher Date.now id) fallback to date
    return [...events].sort((a, b) => {
      const idDiff = Number(b.id) - Number(a.id);
      if (!isNaN(idDiff) && idDiff !== 0) return idDiff;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }, [events]);

  const visibleEvents = showAll ? sorted : sorted.slice(0, VISIBLE_LIMIT);

  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-20 sm:pt-24 md:pt-28 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16 lg:py-20">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12 md:mb-16 slide-in-up">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold gradient-text mb-3 sm:mb-4">
              Events & Activities
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-foreground/70 px-4">
              Join our exciting events and competitions
            </p>
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
            {visibleEvents.map((event, index) => (
              <EventCard
                key={event.id}
                event={event}
                index={index}
                setSelected={setSelected}
              />
            ))}
          </div>

          {/* Toggle show all */}
          <div className="mt-6 sm:mt-8 flex justify-center px-4">
            {sorted.length > VISIBLE_LIMIT && (
              <button
                onClick={() => setShowAll((s) => !s)}
                className="px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg bg-card border border-border hover:bg-card/80 transition-all text-sm sm:text-base font-medium hover:scale-105"
              >
                {showAll ? "Show Less" : `Show All (${sorted.length})`}
              </button>
            )}
          </div>

          {/* Modal Overlay for selected event */}
          {selected && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/60 backdrop-blur-sm"
              onClick={() => setSelected(null)}
              role="dialog"
              aria-modal="true"
              aria-label={selected.title}
            >
              <div
                className="relative card-glow bg-card border border-border w-full max-w-6xl max-h-[90vh] overflow-hidden rounded-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close button */}
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-2 right-2 sm:top-3 sm:right-3 z-20 rounded-lg p-1.5 sm:p-2 bg-black/70 hover:bg-black/90 text-white transition-colors shadow-lg"
                  aria-label="Close"
                >
                  <X size={18} className="sm:w-5 sm:h-5" />
                </button>

                {/* Responsive layout: stack on mobile, side-by-side on desktop */}
                <div className="flex flex-col md:flex-row max-h-[90vh] overflow-y-auto custom-scrollbar">
                  {/* Left: Image */}
                  <div className="relative flex items-center justify-center bg-black/20 p-4 sm:p-6 md:p-8 lg:p-10 md:w-1/2 md:min-h-[500px]">
                    <img
                      src={selected.image || "/gravity-logo.png"}
                      alt={selected.title}
                      loading="lazy"
                      className="w-full h-auto max-h-[250px] sm:max-h-[300px] md:max-h-[450px] object-contain rounded-xl transition-transform duration-500 ease-out hover:scale-105"
                    />
                  </div>

                  {/* Right: Text content */}
                  <div className="flex flex-col md:w-1/2 p-4 sm:p-5 md:p-6 lg:p-8 md:overflow-y-auto custom-scrollbar">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-3 sm:mb-4 text-foreground pr-8">
                      {selected.title}
                    </h3>
                    <div className="text-xs sm:text-sm md:text-base text-foreground/80 leading-relaxed whitespace-pre-line">
                      {selected.description}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Call to Action */}
          <div className="mt-8 sm:mt-12 md:mt-16 card-glow p-5 sm:p-6 md:p-8 text-center slide-in-up">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">
              Stay Updated
            </h2>
            <p className="text-sm sm:text-base text-foreground/70 mb-4 sm:mb-6 px-4">
              Subscribe to get notifications about upcoming events
            </p>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 max-w-md mx-auto px-4">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full sm:flex-1 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg bg-card border border-border text-sm sm:text-base text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              />
              <MagicButton
                onClick={async () => {
                  const valid =
                    /^(?:[a-zA-Z0-9_.'+\-]+)@(?:[a-zA-Z0-9\-]+\.)+[a-zA-Z]{2,}$/.test(
                      email
                    );
                  if (!valid) {
                    setSubStatus("error");
                    setSubMessage("Enter a valid email");
                    return;
                  }
                  try {
                    setSubStatus("loading");
                    const res = await fetch("/api/subscribe", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ email }),
                    });
                    const data = await res.json();
                    if (res.ok && data.ok) {
                      setSubStatus("ok");
                      setSubMessage("You're subscribed!");
                      setEmail("");
                    } else {
                      setSubStatus("error");
                      setSubMessage(data?.error || "Something went wrong");
                    }
                  } catch (e) {
                    setSubStatus("error");
                    setSubMessage("Network error");
                  }
                }}
                disabled={subStatus === "loading"}
                heightClass="h-10"
                className="w-5/6 sm:w-auto self-center"
              >
                {subStatus === "loading" ? "Subscribing…" : "Subscribe"}
              </MagicButton>
            </div>
            {subStatus !== "idle" && (
              <p
                className={`mt-3 text-sm ${
                  subStatus === "ok" ? "text-green-400" : "text-red-400"
                }`}
              >
                {subMessage}
              </p>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
