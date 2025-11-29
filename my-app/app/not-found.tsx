"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import dynamic from "next/dynamic";
const LiquidEther = dynamic(() => import("@/components/LiquidEther"), {
  ssr: false,
  loading: () => <div />,
});
import { useState } from "react";
import MagicButton from "@/components/magic-button";
import { LettersPullUp } from "@/components/Text-Effect";
import { Navigation } from "@/components/navigation";

export default function NotFound() {
  const [isSpinning, setIsSpinning] = useState(false);

  return (
    <>
      <Navigation />
      <section className="relative   h-screen flex items-center justify-center overflow-hidden">
        {/* Liquid Ether background covering the whole hero */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <LiquidEther
            colors={["#5227FF", "#FF9FFC", "#B19EEF"]}
            mouseForce={20}
            cursorSize={100}
            isViscous={false}
            viscous={30}
            iterationsViscous={32}
            iterationsPoisson={32}
            resolution={0.5}
            isBounce={false}
            autoDemo={true}
            autoSpeed={0.5}
            autoIntensity={2.2}
            takeoverDuration={0.25}
            autoResumeDelay={3000}
            autoRampDuration={0.6}
            style={{ width: "100%", height: "100%" }}
          />
        </div>

        {/* Content overlay centered */}
        <div className="relative mt-10 sm:mt-0  z-10 max-w-5xl px-4 sm:px-6 lg:px-8 mx-auto text-center flex flex-col justify-center">
          {/* Animated 404 with Gravity Logo */}
          <div className="flex items-center  justify-center gap-4 md:gap-6 mb-4">
            <div
              className={(
                "inline-flex items-center justify-center " +
                (isSpinning ? "logo-spin-once" : "")
              ).trim()}
              onClick={() => setIsSpinning(true)}
              onAnimationEnd={() => setIsSpinning(false)}
              role="img"
              aria-label="Gravity Logo"
            >
              <img
                src="/gravity-logo.ico"
                alt="Gravity Logo"
                className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 object-contain drop-shadow-[0_0_20px_rgba(124,92,255,0.5)] float-animation transition-all duration-300 ease-out hover:scale-110 hover:-rotate-6 hover:drop-shadow-[0_0_30px_rgba(124,92,255,0.8)] cursor-pointer"
              />
            </div>
          </div>

          {/* Main 404 Heading with dramatic styling */}
          <div className="mb-3">
            <LettersPullUp
              text="404"
              className="text-[100px] md:text-[140px] lg:text-[160px] font-black gradient-text select-none leading-none tracking-tighter"
            />
          </div>

          {/* Error Title */}
          <div className="mb-3">
            <LettersPullUp
              text="LOST IN SPACE"
              className="text-xl md:text-3xl lg:text-4xl font-bold select-none bg-clip-text text-transparent bg-linear-to-r from-purple-400 via-pink-400 to-cyan-400"
            />
          </div>

          {/* Subheading with personality */}
          <p className="text-sm md:text-base lg:text-lg selection:bg-[#65555563] selection:text-white text-foreground/80 mb-2 max-w-2xl mx-auto leading-relaxed font-medium">
            Oops! Looks like this page got lost in the{" "}
            <span className="gradient-text font-bold">multiverse</span>.
          </p>
          <p className="text-xs md:text-sm lg:text-base text-foreground/60 mb-6 max-w-2xl mx-auto">
            The page you're looking for doesn't exist, or it might have been
            moved to another dimension.
          </p>

          {/* CTA Buttons with better styling */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
            <MagicButton
              href="/"
              className="font-bold w-56 sm:w-auto self-center text-sm md:text-base"
            >
              <span>Return Home</span>
              <ArrowRight size={18} />
            </MagicButton>
            <MagicButton
              href="/#wings"
              className="font-bold w-56 sm:w-auto self-center text-sm md:text-base"
              heightClass="h-11"
            >
              <span>Explore Wings</span>
            </MagicButton>
          </div>

          {/* Helpful links section */}
          

        </div>
      </section>
    </>
  );
}
