"use client";

import { useEffect, useState } from "react";

export function WebDevelopmentAnimation() {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          setShowContent(true);
          return 0;
        }
        return prev + 10;
      });
    }, 200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="w-full h-full flex items-center justify-center overflow-hidden 
                 bg-linear-to-br from-slate-950 via-blue-950/40 to-slate-950 rounded-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`
    w-full h-full 
    flex flex-col flex-1
    min-h-0
    overflow-hidden
    transition-transform duration-300
    ${isHovered ? "scale-[1.02]" : "scale-100"}
  `}
      >
        {/* Browser Chrome */}
        <div className="bg-slate-800/90 rounded-t-xl px-2.5 py-1.5 flex items-center gap-2 border-b border-slate-700 shadow-lg">
          <div className="flex gap-1">
            <div className="w-2 h-2 rounded-full bg-red-500 hover:bg-red-600 transition-colors" />
            <div className="w-2 h-2 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors" />
            <div className="w-2 h-2 rounded-full bg-green-500 hover:bg-green-600 transition-colors" />
          </div>

          <div className="flex-1 bg-slate-900/80 rounded-lg px-2 py-0.5 flex items-center gap-1.5">
            <svg
              className="w-2.5 h-2.5 text-green-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            <span className="text-slate-400 text-xs font-mono">
              localhost:3000
            </span>
          </div>

          <div className="flex gap-0.5">
            <div className="w-4 h-4 rounded flex items-center justify-center hover:bg-slate-700 transition-colors">
              <svg
                className="w-2.5 h-2.5 text-slate-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Browser Content */}
        <div className="bg-slate-900/90 rounded-b-xl min-h-[140px] sm:min-h-[180px] relative overflow-hidden">
          {loadingProgress > 0 && loadingProgress < 100 && (
            <div
              className="absolute top-0 left-0 h-0.5 bg-linear-to-r from-green-500 via-emerald-400 to-cyan-400 transition-all duration-200"
              style={{ width: `${loadingProgress}%` }}
            />
          )}

          <div className="p-2 sm:p-3 flex flex-col gap-2 sm:gap-3 min-h-56 sm:min-h-80 lg:min-h-104">
            <div
              className={`transition-all duration-500 ${
                showContent
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-4"
              }`}
            >
              <div className="h-4 bg-linear-to-r from-green-500/20 to-emerald-500/20 rounded-lg animate-pulse" />
            </div>

            <div
              className={`font-mono text-xs space-y-1 transition-all duration-500 delay-100 ${
                showContent
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-4"
              }`}
            >
              <div className="text-slate-500">
                {"<"}
                <span className="text-green-400">div</span>{" "}
                <span className="text-cyan-400">className</span>=
                <span className="text-yellow-300">"container"</span>
                {">"}
              </div>
              <div className="pl-3 text-slate-500">
                {"<"}
                <span className="text-green-400">h1</span>
                {">"}
                <span className="text-slate-300">Hello World</span>
                {"</"}
                <span className="text-green-400">h1</span>
                {">"}
              </div>
              <div className="pl-3 flex items-center gap-1.5">
                <span className="text-slate-500">
                  {"<"}
                  <span className="text-green-400">Button</span> /{">"}
                </span>
                <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse" />
              </div>
              <div className="text-slate-500">
                {"</"}
                <span className="text-green-400">div</span>
                {">"}
              </div>
            </div>

            <div
              className={`grid grid-cols-2 sm:grid-cols-3 gap-1 transition-all duration-500 delay-200 ${
                showContent
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-4"
              }`}
            >
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-6 bg-slate-800 rounded border border-slate-700 animate-pulse"
                  style={{ animationDelay: `${i * 100}ms` }}
                />
              ))}
            </div>

            <div
              className={`flex items-center gap-1.5 text-xs transition-all duration-500 delay-300 ${
                showContent
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-4"
              }`}
            >
              <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse" />
              <span className="text-green-400">Live</span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-400">Hot Reload Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
