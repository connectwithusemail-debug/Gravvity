"use client";

import { useEffect, useState } from "react";

export function DesignAnimation() {
  const [rotation, setRotation] = useState(0);
  const [selectedTool, setSelectedTool] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => (prev + 45) % 360);
      setSelectedTool((prev) => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const tools = [
    { icon: "✏️", label: "Pen", color: "from-pink-500 to-rose-500" },
    { icon: "🎨", label: "Brush", color: "from-purple-500 to-violet-500" },
    { icon: "⭐", label: "Shape", color: "from-blue-500 to-cyan-500" },
    { icon: "🌈", label: "Color", color: "from-orange-500 to-yellow-500" },
  ];

  return (
    <div
      className="w-full h-full flex items-center justify-center overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Inner container uses h-auto and distributes space vertically so bottom panel won't be clipped */}
      <div
        className={`w-full h-full max-h-full flex flex-col justify-between gap-3 sm:gap-4 transition-transform duration-300 ${
          isHovered ? "scale-[1.02]" : "scale-100"
        }`}
      >
        <div className="relative w-full h-full mx-auto">
          <div className="bg-slate-800/50 rounded-2xl p-3 sm:p-4 backdrop-blur-sm border border-slate-700/50 flex flex-col">
            {/* Toolbar */}
            <div className="flex justify-center gap-1.5 mb-2 flex-wrap sm:flex-nowrap">
              {tools.map((tool, i) => (
                <button
                  key={i}
                  className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center text-sm sm:text-base transition-all duration-300 ${
                    selectedTool === i
                      ? `bg-linear-to-br ${tool.color} scale-110 shadow-lg`
                      : "bg-slate-700/50 hover:bg-slate-600/50"
                  }`}
                >
                  {tool.icon}
                </button>
              ))}
            </div>

            {/* Canvas: slightly reduced height so bottom panel fits */}
            <div className="bg-slate-900/80 rounded-xl h-32 sm:h-36 lg:h-40 relative overflow-hidden border border-slate-700 mb-2">
              {/* Grid (light opacity) */}
              <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="grid grid-cols-8 grid-rows-8 h-full">
                  {Array.from({ length: 64 }).map((_, i) => (
                    <div key={i} className="border border-slate-600" />
                  ))}
                </div>
              </div>

              {/* Shapes */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-20 h-20 sm:w-24 sm:h-24">
                  <div
                    className="absolute inset-0 rounded-full opacity-40 animate-spin"
                    style={{
                      background:
                        "conic-gradient(from 0deg, #f43f5e, #ec4899, #a855f7, #6366f1, #3b82f6, #06b6d4, #10b981, #f59e0b, #f43f5e)",
                      animationDuration: "6s",
                    }}
                  />

                  <div
                    className="absolute inset-0 flex items-center justify-center transition-transform duration-1000"
                    style={{ transform: `rotate(${rotation}deg)` }}
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-linear-to-br from-pink-500 via-purple-500 to-cyan-500 rounded-lg shadow-2xl" />
                  </div>

                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="absolute w-2 h-2 rounded-full bg-linear-to-br from-pink-400 to-purple-400"
                      style={{
                        top: `${
                          30 +
                          Math.sin(((rotation + i * 120) * Math.PI) / 180) * 32
                        }%`,
                        left: `${
                          30 +
                          Math.cos(((rotation + i * 120) * Math.PI) / 180) * 32
                        }%`,
                        transition: "all 1s ease-in-out",
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Palette (keeps inside the main card, reduced gap) */}
            <div className="flex justify-center gap-1.5 flex-wrap">
              {[
                "from-red-500",
                "from-pink-500",
                "from-purple-500",
                "from-blue-500",
                "from-cyan-500",
              ].map((color, i) => (
                <div
                  key={i}
                  className={`w-6 h-6 rounded-lg bg-linear-to-br ${color} to-transparent cursor-pointer hover:scale-110 transition-transform border-2 ${
                    i === 2 ? "border-white" : "border-transparent"
                  }`}
                  style={{ animationDelay: `${i * 100}ms` }}
                />
              ))}
            </div>
          </div>

          {/* Layers Panel: placed after main card but still inside the parent's vertical distribution */}
          <div className="mt-2 bg-slate-800/30 rounded-lg p-2 backdrop-blur-sm border border-slate-700/30 mx-auto">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Layers</span>
              <div className="flex gap-1">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-0.5 h-3 bg-pink-500 rounded animate-pulse"
                    style={{ animationDelay: `${i * 200}ms` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
