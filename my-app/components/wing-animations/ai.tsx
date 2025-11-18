"use client";

import { useEffect, useState } from "react";

export function AIAnimation() {
  const [neurons, setNeurons] = useState<{ active: boolean }[]>(
    Array.from({ length: 16 }, () => ({ active: false }))
  );
  const [processing, setProcessing] = useState(false);
  const [accuracy, setAccuracy] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | undefined;

    const interval = setInterval(() => {
      setProcessing(true);
      setNeurons((prev) => prev.map(() => ({ active: Math.random() > 0.5 })));
      setAccuracy(Math.floor(85 + Math.random() * 15));

      timeout = setTimeout(() => setProcessing(false), 400);
    }, 2000);

    return () => {
      clearInterval(interval);
      if (timeout) clearTimeout(timeout);
    };
  }, []);

  return (
    <div
      className="w-full h-full flex items-center justify-center rounded-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`
      w-full h-full max-h-full max-w-full 
      bg-slate-900/80 rounded-2xl border border-purple-500/30 backdrop-blur-sm 
      p-4 sm:p-5 flex flex-col gap-4 lg:flex-row lg:gap-6 transition-transform duration-300
      ${isHovered ? "scale-[1.02]" : "scale-100"}
    `}
      >
        {/* LEFT PANEL — Header + Neurons */}
        <div className="flex flex-col justify-between w-full lg:w-[45%] gap-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-3 flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-linear-to-br from-purple-500 to-violet-600 flex items-center justify-center text-sm">
                🤖
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-200">
                  Neural Network
                </div>
                <div className="text-xs text-slate-400">
                  Deep Learning Model
                </div>
              </div>
            </div>

            <div
              className={`w-2 h-2 rounded-full ${
                processing ? "bg-green-500" : "bg-slate-600"
              } animate-pulse`}
            />
          </div>

          {/* Neuron Matrix */}
          <div className="relative flex flex-wrap gap-1.5 w-full max-w-[190px] md:max-w-[210px] mx-auto shrink-0">
            {neurons.map((neuron, i) => (
              <div
                key={i}
                className={`w-[22%] aspect-square rounded-lg border transition-all duration-300 ${
                  neuron.active
                    ? "bg-linear-to-br from-purple-500 to-violet-600 border-purple-400 shadow-md shadow-purple-500/40 scale-105"
                    : "bg-slate-800 border-slate-700"
                }`}
              >
                <div className="w-full h-full flex items-center justify-center">
                  {neuron.active && (
                    <div className="w-1 h-1 bg-white rounded-full animate-pulse" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT PANEL — Stats */}
        <div className="flex flex-col justify-between w-full lg:w-[55%] py-1 gap-3">
          <div className="space-y-3">
            {/* Accuracy */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-slate-400">Model Accuracy</span>
                <span className="text-purple-400 font-semibold">
                  {accuracy}%
                </span>
              </div>
              <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-linear-to-r from-purple-500 to-violet-500 transition-all duration-500 rounded-full"
                  style={{ width: `${accuracy}%` }}
                />
              </div>
            </div>

            {/* Training progress */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-slate-400">Training Progress</span>
                <span className="text-cyan-400 font-semibold">epoch 47/50</span>
              </div>
              <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-linear-to-r from-cyan-500 to-blue-500 w-11/12 animate-pulse rounded-full" />
              </div>
            </div>
          </div>

          {/* Status Messages */}
          <div className="space-y-1 mt-1 font-mono text-xs">
            <div className="flex items-center gap-1 text-green-400">
              <span>✓</span>
              <span>Data preprocessing complete</span>
            </div>

            <div className="flex items-center gap-1 text-purple-400">
              <div
                className={`w-1 h-1 rounded-full bg-purple-400 ${
                  processing ? "animate-pulse" : ""
                }`}
              />
              <span>Model training in progress...</span>
            </div>
          </div>

          {/* Footer */}
          <div className="pt-3 border-t border-slate-700/50 mt-2">
            <div className="flex items-center gap-1 text-xs">
              <span className="px-1.5 py-0.5 bg-purple-500/20 text-purple-400 rounded-full border border-purple-500/30 flex items-center gap-0.5">
                🔒 Private AI
              </span>
              <span className="text-slate-400">Edge Computing</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
