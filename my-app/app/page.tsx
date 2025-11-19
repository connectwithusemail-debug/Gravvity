"use client";

import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import WingsPage from "./wings/page";
import { OverallCoordinatorsSection } from "@/components/overall-coordinators-section";
import { FacultyCoordinatorsSection } from "@/components/faculty-coordinators-section";
import IntroVideo from "@/components/intro-video";
import { useState, useEffect, JSX } from "react";
import {
  INTRO_VIDEO_EXPIRY_MS,
  INTRO_VIDEO_STORAGE_KEY,
} from "@/lib/intro-video-config";

export default function Home() {
  const [showIntro, setShowIntro] = useState<boolean>(false);
  const [showContent, setShowContent] = useState<boolean>(false);

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const introParam = params.get("intro");

      if (introParam === "reset") {
        localStorage.removeItem(INTRO_VIDEO_STORAGE_KEY);
        setShowIntro(true);
        setShowContent(false);
        return;
      }

      if (
        introParam === "1" ||
        introParam === "true" ||
        introParam === "force"
      ) {
        setShowIntro(true);
        setShowContent(false);
        return;
      }

      const raw = localStorage.getItem(INTRO_VIDEO_STORAGE_KEY);
      const ts = raw ? Number(raw) : 0;
      const now = Date.now();
      if (!ts || Number.isNaN(ts) || now - ts > INTRO_VIDEO_EXPIRY_MS) {
        setShowIntro(true);
        setShowContent(false);
      } else {
        setShowIntro(false);
        setShowContent(true);
      }
    } catch (e) {
      setShowIntro(true);
    }
  }, []);

  function handleIntroFinish() {
    setShowIntro(false);
    setShowContent(true);
  }

  if (showIntro) {
    return <IntroVideo onFinish={handleIntroFinish} />;
  }

  if (!showContent) {
    return null;
  }

  return (
    <>
      <Navigation />
      <main className="bg-background overflow-x-hidden pt-10">
        <HeroSection />
        <AboutSection />
        <WingsPage />
        <FacultyCoordinatorsSection />
        <OverallCoordinatorsSection />
      </main>
      <Footer />
    </>
  );
}
