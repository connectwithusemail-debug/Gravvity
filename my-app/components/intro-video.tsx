"use client";

import { useEffect, useRef, useState } from "react";
import "./intro-video.css";
import {
  INTRO_VIDEO_EXPIRY_MS,
  INTRO_VIDEO_STORAGE_KEY,
} from "@/lib/intro-video-config";

export default function IntroVideo({ onFinish }: { onFinish?: () => void }) {
  const [shouldShow, setShouldShow] = useState<boolean>(false);
  const [animating, setAnimating] = useState<boolean>(false);
  const [videoSrc, setVideoSrc] = useState<string>("/introvideonew.mp4");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    // Detect screen size and set appropriate video
    const updateVideoSrc = () => {
      if (window.innerWidth >= 1200) {
        setVideoSrc("/introvideo.mp4");
      } else {
        setVideoSrc("/introvideonew.mp4");
      }
    };

    updateVideoSrc();
    window.addEventListener("resize", updateVideoSrc);

    return () => window.removeEventListener("resize", updateVideoSrc);
  }, []);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(INTRO_VIDEO_STORAGE_KEY);
      const ts = raw ? Number(raw) : 0;
      const now = Date.now();
      if (!ts || Number.isNaN(ts) || now - ts > INTRO_VIDEO_EXPIRY_MS) {
        setShouldShow(true);
      }
    } catch (e) {
      setShouldShow(true);
    }
  }, []);

  useEffect(() => {
    if (shouldShow && videoRef.current) {
      const v = videoRef.current;
      // Wait for enough data, then mark loaded and try to play
      const tryPlay = () => v.play().catch(() => {});
      const handleCanPlay = () => {
        setIsLoading(false);
        tryPlay();
      };
      if (v.readyState >= 3) {
        handleCanPlay();
      } else {
        v.addEventListener("canplaythrough", handleCanPlay, { once: true });
      }

      return () => {
        v.removeEventListener("canplaythrough", handleCanPlay as any);
      };
    }
  }, [shouldShow, videoSrc]);

  function handleSkip() {
    try {
      localStorage.setItem(INTRO_VIDEO_STORAGE_KEY, String(Date.now()));
    } catch (e) {}

    setAnimating(true);
    const ANIM_MS = 800;
    setTimeout(() => {
      setShouldShow(false);
      setAnimating(false);
      try {
        onFinish?.();
      } catch (e) {
        // ignore
      }
    }, ANIM_MS);
  }

  function handleEnded() {
    handleSkip();
  }
  function handleError() {
    // If video fails, just skip without setting the seen flag
    setAnimating(false);
    setShouldShow(false);
    try {
      onFinish?.();
    } catch {}
  }

  if (!shouldShow) return null;

  return (
    <div
      className={`intro-overlay ${animating ? "intro-overlay-fade" : ""}`}
      aria-hidden={!shouldShow}
    >
      {isLoading && (
        <div className="intro-loader" role="status" aria-live="polite">
          <div className="loader-logo" aria-hidden="true">
            <img src="/gravity-logo.png" alt="" />
          </div>
          <p className="loader-text">Loading...</p>
        </div>
      )}

      <video
        ref={videoRef}
        className={`intro-video ${
          videoSrc === "/introvideo.mp4"
            ? "intro-video-desktop"
            : "intro-video-mobile"
        } ${animating ? "intro-video-hidden" : ""} ${
          isLoading ? "video-hidden" : ""
        }`}
        src={videoSrc}
        poster="/gravity-logo.svg"
        playsInline
        muted
        preload="auto"
        onEnded={handleEnded}
        onError={handleError}
      />

      {!isLoading && (
        <button
          className="intro-skip-btn"
          onClick={handleSkip}
          aria-label="Skip intro"
        >
          Skip
        </button>
      )}
    </div>
  );
}
