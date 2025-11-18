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
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 24 24"
        >
          <g
            fill="none"
            stroke="#fff"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
          >
            <path d="M3 21v-4a4 4 0 1 1 4 4z" />
            <path d="M21 3A16 16 0 0 0 8.2 13.2M21 3a16 16 0 0 1-10.2 12.8" />
            <path d="M10.6 9a9 9 0 0 1 4.4 4.4" />
          </g>
        </svg>
      ),
      label: "Pen",
      color: "from-pink-500 to-rose-500",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 20 20"
        >
          <path
            fill="#fff"
            d="M5.77 3.166c2.373-1.454 5.173-1.59 7.927-.174c3.976 2.042 5.502 6.162 4.187 10.435c-.415 1.35-1.245 2.698-2.371 3.59c-1.14.902-2.604 1.347-4.206.799c-1.102-.377-1.79-.967-2.203-1.68c-.404-.696-.52-1.462-.574-2.132a26 26 0 0 1-.039-.586l-.022-.369a5 5 0 0 0-.101-.76a1.2 1.2 0 0 0-.206-.466a.75.75 0 0 0-.386-.244c-.518-.159-.874-.126-1.156-.036c-.248.078-.447.2-.689.346l-.197.119c-.316.186-.72.396-1.238.37c-.514-.025-1.045-.275-1.656-.773c-.67-.546-.934-1.31-.938-2.112c-.003-.788.243-1.635.614-2.434c.737-1.59 2.043-3.15 3.254-3.893M9.75 6.75a1 1 0 1 0 0-2a1 1 0 0 0 0 2m3 1a1 1 0 1 0 0-2a1 1 0 0 0 0 2M15.5 9a1 1 0 1 0-2 0a1 1 0 0 0 2 0m-1 4a1 1 0 1 0 0-2a1 1 0 0 0 0 2m-1 1a1 1 0 1 0-2 0a1 1 0 0 0 2 0"
          />
        </svg>
      ),
      label: "Brush",
      color: "from-purple-500 to-violet-500",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 16 16"
        >
          <path
            fill="#fff"
            d="M6.886.773C7.29-.231 8.71-.231 9.114.773l1.472 3.667l3.943.268c1.08.073 1.518 1.424.688 2.118L12.185 9.36l.964 3.832c.264 1.05-.886 1.884-1.802 1.31L8 12.4l-3.347 2.101c-.916.575-2.066-.26-1.802-1.309l.964-3.832L.783 6.826c-.83-.694-.391-2.045.688-2.118l3.943-.268z"
          />
        </svg>
      ),
      label: "Shape",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
        >
          <path
            fill="#fff"
            d="M4.35 3A1.35 1.35 0 0 0 3 4.35v1.575c0 .186.151.338.337.338H4.35c7.394 0 13.388 5.993 13.388 13.387v1.013c0 .186.15.337.337.337h1.575A1.35 1.35 0 0 0 21 19.65C21 10.455 13.546 3 4.35 3"
          />
          <path
            fill="#fff"
            d="M3 7.106c0-.186.151-.337.337-.337H4.35c7.114 0 12.881 5.767 12.881 12.881v1.013a.337.337 0 0 1-.337.337h-2.588a.34.34 0 0 1-.337-.337V19.65a9.62 9.62 0 0 0-9.619-9.619H3.338A.337.337 0 0 1 3 9.694z"
          />
          <path
            fill="#fff"
            d="M3 10.875c0-.186.151-.338.337-.338H4.35a9.11 9.11 0 0 1 9.113 9.113v1.013a.337.337 0 0 1-.338.337H11.55a1.35 1.35 0 0 1-1.35-1.35a5.85 5.85 0 0 0-5.85-5.85A1.35 1.35 0 0 1 3 12.45z"
          />
        </svg>
      ),
      label: "Color",
      color: "from-orange-500 to-yellow-500",
    },
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
