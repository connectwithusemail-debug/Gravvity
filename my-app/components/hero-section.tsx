"use client";

import Link from "next/link";
import { ArrowRight, Grab } from "lucide-react";
import LiquidEther from "./LiquidEther";
import { useState, useEffect, useRef } from "react";
import MagicButton from "@/components/magic-button";
import { LettersPullUp } from "@/components/Text-Effect";
import { motion, useAnimation } from "framer-motion";

export function HeroSection() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [counter, setcounter] = useState(0);
  const [data, setdata] = useState(false);

  const [_k, _sk] = useState("");
  const [_b, _sb] = useState<Array<{ id: number; text: string; pos: number }>>(
    []
  );
  const [_id, _sid] = useState(0);
  const [_fm, _sfm] = useState(false);
  const _controls = useAnimation();
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scheduleReset = (delay = 2000) => {
    if (resetTimer.current) {
      clearTimeout(resetTimer.current);
    }
    resetTimer.current = setTimeout(() => {
      _controls.start({
        x: 0,
        y: 0,
        transition: { duration: 0.2, ease: "easeOut" },
      });
      resetTimer.current = null;
    }, delay);
  };

  useEffect(() => {
    console.log(
      "%cCTRL+SPACE ^_^ ",
      "color: rgb(255,255,255); background: BLACK; font-size: 24px;border-radius:100px; font-weight: bold; padding: 10px;"
    );
  }, []);

  useEffect(() => {
    const _h = (e: KeyboardEvent) => {
      const _c = e.shiftKey && e.key === "G" ? "g" : e.key.toLowerCase();
      const _n = _k + _c;
      const _i = _n.length - 1;

      if (_k.length > 0 && _i < _t.length && _c === _t[_i]) {
        _sk(_n);
        if (_i < _m.length) {
          const _nid = _id + 1;
          _sid(_nid);
          _sb((p) => [
            ...p,
            {
              id: _nid,
              text: _m[_i],
              pos: Math.floor(10 + Math.random() * 60),
            },
          ]);
          setTimeout(() => _sb((p) => p.filter((b) => b.id !== _nid)), 4000);
        }
        if (_n === _t) setTimeout(() => _sk(""), 5000);
      } else if (_c === "g" && e.shiftKey) {
        _sk("g");
        const _nid = _id + 1;
        _sid(_nid);
        _sb([
          { id: _nid, text: _m[0], pos: Math.floor(10 + Math.random() * 60) },
        ]);
        setTimeout(() => _sb((p) => p.filter((b) => b.id !== _nid)), 4000);
      } else {
        _sk("");
      }
    };
    window.addEventListener("keydown", _h);
    return () => window.removeEventListener("keydown", _h);
  }, [_k, _id]);

  useEffect(() => {
    const _togg = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.code === "Space") {
        try {
          e.preventDefault();
        } catch {}
        _sfm((p) => {
          const n = !p;
          if (!n) {
            if (resetTimer.current) {
              clearTimeout(resetTimer.current);
              resetTimer.current = null;
            }
            _controls.start({ x: 0, y: 0, transition: { duration: 0.3 } });
          } else {
            scheduleReset(2000);
          }
          return n;
        });
      }
    };
    window.addEventListener("keydown", _togg);
    return () => window.removeEventListener("keydown", _togg);
  }, []);

  useEffect(() => {
    return () => {
      if (resetTimer.current) {
        clearTimeout(resetTimer.current);
        resetTimer.current = null;
      }
    };
  }, []);

  const handleLogoClick = () => {
    setIsSpinning(true);
    const newCount = counter + 1;
    setcounter(newCount);

    if (newCount === 10) {
      setdata(true);

      setTimeout(() => {
        setdata(false);
        setcounter(0);
      }, 5000);
    }
  };

  return (
    <section className="relative min-h-[88vh] flex items-center justify-center overflow-hidden pt-4 md:pt-8">
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

      <div className="relative z-10 max-w-5xl px-4 sm:px-6 lg:px-8 mx-auto text-center">
        <div className="pt-8 flex justify-center">
          <motion.div
            className={`${
              !_fm ? "cursor-pointer" : "cursor-grab"
            } z-100 active:cursor-grabbing inline-flex mb-2 `}
            drag
            animate={_controls}
            initial={{ x: 0, y: 0 }}
            dragElastic={0.5}
            dragTransition={{ bounceStiffness: 500, bounceDamping: 10 }}
            dragConstraints={{
              top: -70,
              left: -500,
              right: 500,
              bottom: 350,
            }}
            dragListener={
              typeof window !== "undefined" && window.innerWidth >= 1024 && _fm
            }
            onDragStart={() => {
              if (resetTimer.current) {
                clearTimeout(resetTimer.current);
                resetTimer.current = null;
              }
              _controls.stop();
            }}
            onDragEnd={() => {
              scheduleReset(100);
            }}
            onPointerDown={() => {
              if (resetTimer.current) {
                clearTimeout(resetTimer.current);
                resetTimer.current = null;
              }
            }}
          >
            <div
              className={(
                "inline-flex items-center justify-center " +
                (isSpinning ? "logo-spin-once" : "")
              ).trim()}
              onClick={handleLogoClick}
              onAnimationEnd={() => setIsSpinning(false)}
              role="img"
              aria-label="Gravity Logo"
            >
              <img
                src="/gravity-logo.ico"
                alt="Gravity Logo"
                className="sm:w-25 sm:h-25 h-20 w-20 object-contain drop-shadow-[0_0_12px_rgba(124,92,255,0.35)] float-animation transition-all duration-300 ease-out hover:scale-105 hover:-rotate-2 hover:drop-shadow-[0_0_18px_rgba(124,92,255,0.6)] select-none pointer-events-none opacity-100!"
                draggable={false}
                style={{ opacity: 1 }}
              />
            </div>
          </motion.div>
        </div>

        {/* Main Heading */}
        <div>
          <LettersPullUp
            text={`GRAVITY`}
            className="gradient-text  select-none"
          />
          <LettersPullUp text={`TECHNICAL SOCIETY`} className="select-none" />
        </div>

        {/* Subheading */}
        <p className="text-sm md:text-2xl selection:bg-[#65555563] selection:text-white  text-foreground/70 mb-8 max-w-2xl mx-auto leading-relaxed">
          Seven wings of innovation: Competitive Coding, Web Development,
          Design, FOSS, Private AI, Blockchain, and Metaverse
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <MagicButton
            href="#wings"
            className="font-bold w-60 sm:w-auto self-center"
          >
            <span>Explore Wings</span>
            <ArrowRight size={20} />
          </MagicButton>
          <MagicButton
            href="/contact"
            className="font-bold w-56 sm:w-auto self-center"
            heightClass="h-12"
          >
            Get in Touch
          </MagicButton>
        </div>

      </div>

      {data && <S1 />}
      <S2 __b={_b} />
    </section>
  );
}











































































const S1: React.FC = (): React.JSX.Element => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 20 }}
    transition={{ duration: 1 }}
    className="fixed bottom-8 left-1/2 translate-x-1/2 z-50 px-6 py-3 rounded-full backdrop-blur-xs bg-white/10 border border-white/20 shadow-lg"
  >
    <p className="text-white text-sm font-medium">
      🎉 You found one of the secrets, Try saying the one-word secret. ;&gt;
    </p>
  </motion.div>
);

const S2: React.FC<{
  __b: Array<{ id: number; text: string; pos: number }>;
}> = ({ __b }) => (
  <>
    {__b.map((_bb) => (
      <motion.div
        key={_bb.id}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: [0, 1, 1, 0], y: -200 }}
        transition={{ duration: 3.5, ease: "easeOut" }}
        className="fixed z-50 px-4 py-2 rounded-full backdrop-blur-md bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-white/30 shadow-xl pointer-events-none"
        style={{
          right: `${10 + (_bb.id % 5) * 15}%`,
          top: `${_bb.pos}%`,
        }}
      >
        <span className="text-white font-medium text-sm">{_bb.text}</span>
      </motion.div>
    ))}
  </>
);

let _m = ["Hey,", "the", "footer", "seems", "a", "bit", "sus."];
let _t = "gravity";
