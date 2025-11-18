"use client";

import { useEffect, useState } from "react";

export function MetaverseAnimation() {
  const [rotation, setRotation] = useState(0);
  const [objects, setObjects] = useState<{ x: number; y: number; z: number }[]>(
    []
  );
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Initialize floating objects
    setObjects(
      Array.from({ length: 8 }, (_, i) => ({
        x: Math.cos((i * Math.PI * 2) / 8) * 40,
        y: Math.sin((i * Math.PI * 2) / 8) * 40,
        z: Math.random(),
      }))
    );

    const interval = setInterval(() => {
      setRotation((prev) => (prev + 2) % 360);
      setObjects((prev) =>
        prev.map((obj, i) => ({
          x: Math.cos(((rotation + i * 45) * Math.PI) / 180) * 40,
          y: Math.sin(((rotation + i * 45) * Math.PI) / 180) * 40,
          z: (obj.z + 0.01) % 1,
        }))
      );
    }, 50);
    return () => clearInterval(interval);
  }, [rotation]);

  return (
    <div
      className="relative w-full h-full flex items-center justify-center bg-linear-to-br from-slate-950 via-indigo-950/30 to-slate-950 rounded-lg p-3 sm:p-4 transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`relative w-full flex flex-col justify-center h-full gap-3 mx-auto transition-transform duration-300 ${
          isHovered ? "scale-105" : "scale-100"
        }`}
      >
        {/* VR Headset View */}
        <div className="bg-slate-900/80 rounded-2xl p-2 backdrop-blur-sm border border-indigo-500/30">
          {/* VR HUD Header */}
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-6 rounded-lg bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-sm">
                🌌
              </div>
              <div>
                <div className="text-xs font-semibold text-slate-200">
                  Virtual Space
                </div>
                <div className="text-xs text-slate-400">Immersive Mode</div>
              </div>
            </div>
            <div className="flex gap-0.5">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-0.5 h-2 bg-indigo-500 rounded animate-pulse"
                  style={{ animationDelay: `${i * 150}ms` }}
                />
              ))}
            </div>
          </div>

          {/* 3D Space Viewport */}
          <div className="relative h-36 sm:h-48 lg:h-56 bg-linear-to-b from-slate-950 to-indigo-950/50 rounded-xl overflow-hidden border border-slate-700/50">
            {/* Grid Floor */}
            <div className="absolute inset-0 opacity-20">
              <svg className="w-full h-full">
                <defs>
                  <pattern
                    id="grid"
                    width="20"
                    height="20"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M 20 0 L 0 0 0 20"
                      fill="none"
                      stroke="rgba(99, 102, 241, 0.3)"
                      strokeWidth="0.5"
                    />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>

            {/* Center Portal */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="relative w-16 h-16"
                style={{
                  transform: `rotateY(${rotation}deg) rotateX(20deg)`,
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Portal Ring */}
                <div className="absolute inset-0 rounded-full border-2 border-indigo-500/50 animate-pulse" />
                <div
                  className="absolute inset-1 rounded-full border-2 border-purple-500/50 animate-pulse"
                  style={{ animationDelay: "0.5s" }}
                />
                <div
                  className="absolute inset-2 rounded-full border-2 border-cyan-500/50 animate-pulse"
                  style={{ animationDelay: "1s" }}
                />

                {/* Center Glow */}
                <div className="absolute inset-4 rounded-full bg-linear-to-br from-indigo-500 via-purple-500 to-cyan-500 blur-xl animate-pulse" />
              </div>

              {/* Floating Objects */}
              {objects.map((obj, i) => (
                <div
                  key={i}
                  className="absolute w-3 h-3 rounded bg-linear-to-br from-indigo-400 to-purple-500 shadow-lg"
                  style={{
                    transform: `translate(${obj.x}px, ${obj.y}px) scale(${
                      0.5 + obj.z * 0.5
                    })`,
                    opacity: 0.4 + obj.z * 0.6,
                    transition: "all 0.05s linear",
                  }}
                />
              ))}
            </div>

            {/* Particles */}
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="absolute w-0.5 h-0.5 bg-white rounded-full animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${3 + Math.random() * 2}s`,
                }}
              />
            ))}

            {/* HUD Overlay */}
            <div className="absolute top-1.5 left-1.5 text-xs font-mono text-cyan-400 space-y-0.5">
              <div>X: {Math.floor(rotation % 100)}</div>
              <div>Y: {Math.floor((rotation * 1.3) % 100)}</div>
            </div>

            <div className="absolute top-1.5 right-1.5 text-xs font-mono text-green-400">
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                <span>ONLINE</span>
              </div>
            </div>
          </div>

          {/* VR Controls */}
          <div className="mt-1.5 grid grid-cols-3 gap-1">
            {[
              { icon: "🎮", label: "Control" },
              { icon: "👁️", label: "Track" },
              { icon: "🎵", label: "Audio" },
            ].map((control, i) => (
              <div
                key={i}
                className="bg-slate-800/50 rounded-lg p-1 text-center border border-slate-700/50 hover:border-indigo-500/50 transition-colors"
              >
                <div className="text-xs mb-0.5">{control.icon}</div>
                <div className="text-xs text-slate-400">{control.label}</div>
              </div>
            ))}
          </div>

          {/* Status Bar */}
          <div className="mt-1.5 flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5">
              <span className="px-1.5 py-0.5 bg-indigo-500/20 text-indigo-400 rounded-full border border-indigo-500/30 text-xs">
                VR Active
              </span>
              <span className="text-slate-400">FPS: 90</span>
            </div>
            <div className="text-slate-400">
              Users: {Math.floor(100 + Math.random() * 50)}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) scale(1);
            opacity: 0;
          }
          50% {
            transform: translateY(-30px) scale(1.2);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
