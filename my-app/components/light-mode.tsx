"use client"

import { useEffect } from "react"

/**
 * LightModeController sets a global flag when the device appears low-power
 * or when the user prefers reduced motion. It sets `document.documentElement.dataset.light = '1'`
 * and adjusts `--anim-scale` to reduce animation durations and effects.
 */
export default function LightModeController() {
  useEffect(() => {
    try {
      const doc = document.documentElement

      // Default scale
      const setLight = (scale: number) => {
        doc.dataset.light = scale < 1 ? '1' : '0'
        doc.style.setProperty('--anim-scale', String(scale))
      }

      // 1) Respect user prefers-reduced-motion
      const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
      if (prefersReduced) {
        setLight(0.35)
        return
      }

      // 2) Device heuristics: low deviceMemory or low cores -> be lighter
      const mem = (navigator as any).deviceMemory || 0
      const cores = navigator.hardwareConcurrency || 0
      if (mem && mem <= 2) {
        setLight(0.45)
        return
      }
      if (cores && cores <= 2) {
        setLight(0.6)
        return
      }

      // 3) Quick FPS probe (short) — measure a few frames and decide
      let frames = 0
      let last = performance.now()
      let totalDt = 0
      let rafId: number | null = null

      const probe = (t: number) => {
        const dt = t - last
        last = t
        totalDt += dt
        frames++
        if (frames >= 10) {
          const avg = totalDt / frames
          const fps = 1000 / avg
          // If fps is low, reduce animations
          if (fps < 45) setLight(0.6)
          else if (fps < 55) setLight(0.8)
          else setLight(1)
        } else {
          rafId = requestAnimationFrame(probe)
        }
      }

      rafId = requestAnimationFrame(probe)

      return () => {
        if (rafId) cancelAnimationFrame(rafId)
      }
    } catch (e) {
      // Safe fallback: do nothing
    }
  }, [])

  return null
}
