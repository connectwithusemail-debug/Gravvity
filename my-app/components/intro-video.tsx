"use client";

import { useEffect, useRef, useState } from "react";
import "./intro-video.css";

const STORAGE_KEY = "introVideoSeenAt";
const EXPIRY_MS = 24 * 60 * 60 * 1000;

export default function IntroVideo({ onFinish }: { onFinish?: () => void }) {
  const [shouldShow, setShouldShow] = useState<boolean>(false);
  const [animating, setAnimating] = useState<boolean>(false);
  const [videoSrc, setVideoSrc] = useState<string>("/introvideonew.mp4");
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
      const raw = localStorage.getItem(STORAGE_KEY);
      const ts = raw ? Number(raw) : 0;
      const now = Date.now();
      if (!ts || Number.isNaN(ts) || now - ts > EXPIRY_MS) {
        setShouldShow(true);
      }
    } catch (e) {
      setShouldShow(true);
    }
  }, []);

  useEffect(() => {
    if (shouldShow && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [shouldShow]);

  function handleEnded() {
    setAnimating(true);
    try {
      localStorage.setItem(STORAGE_KEY, String(Date.now()));
    } catch (e) {}

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

  if (!shouldShow) return null;

  return (
    <div
      className={`intro-overlay ${animating ? "intro-overlay-fade" : ""}`}
      aria-hidden={!shouldShow}
    >
      <video
        ref={videoRef}
        className={`intro-video ${
          videoSrc === "/introvideo.mp4"
            ? "intro-video-desktop"
            : "intro-video-mobile"
        }`}
        src={videoSrc}
        playsInline
        autoPlay
        muted
        onEnded={handleEnded}
      />
    </div>
  );
}
