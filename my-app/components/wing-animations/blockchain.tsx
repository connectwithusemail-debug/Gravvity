"use client";

import { useEffect, useState } from "react";

export function BlockchainAnimation() {
  const [blocks, setBlocks] = useState([
    { id: 1, hash: "0x7f3a...", verified: true },
    { id: 2, hash: "0x9b2c...", verified: true },
    { id: 3, hash: "0x4e1d...", verified: false },
  ]);
  const [mining, setMining] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setMining(true);
      setTimeout(() => {
        setBlocks((prev) => {
          const newBlocks = prev.map((b) => ({ ...b, verified: true }));
          if (newBlocks.length >= 3) {
            newBlocks.shift();
          }
          newBlocks.push({
            id: prev[prev.length - 1].id + 1,
            hash: `0x${Math.random().toString(16).slice(2, 6)}...`,
            verified: false,
          });
          return newBlocks;
        });
        setMining(false);
      }, 1000);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="
        w-full h-full
        flex items-center justify-center
        overflow-hidden
        bg-linear-to-br from-slate-950 via-orange-950/20 to-slate-950
        rounded-lg p-3 sm:p-4
      "
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`
        w-full h-auto max-h-full 
        flex flex-col 
        transition-transform duration-300
        ${isHovered ? "scale-[1.02]" : "scale-100"}
      `}
      >
        <div className="space-y-1.5">
          {/* Header */}
          <div className="bg-slate-800/50 rounded-xl p-2 backdrop-blur-sm border border-orange-500/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <div className="w-6 h-6 rounded-lg bg-linear-to-br from-orange-500 to-red-600 flex items-center justify-center text-sm">
                  ⛓️
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-200">
                    Blockchain Network
                  </div>
                  <div className="text-xs text-slate-400">Proof of Work</div>
                </div>
              </div>
              {mining && (
                <div className="flex items-center gap-1 text-xs text-orange-400">
                  <div className="w-1 h-1 bg-orange-500 rounded-full animate-pulse" />
                  <span>Mining...</span>
                </div>
              )}
            </div>
          </div>

          {/* Blocks Chain */}
          <div className="space-y-1">
            {blocks.map((block, index) => (
              <div
                key={block.id}
                className="relative transition-all duration-500 animate-slideIn"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Connection Line */}
                {index < blocks.length - 1 && (
                  <div className="absolute left-6 top-full w-0.5 h-1.5 bg-linear-to-b from-orange-500 to-transparent" />
                )}

                <div
                  className={`bg-slate-900/80 rounded-lg p-1.5 border transition-all duration-500 ${
                    block.verified
                      ? "border-green-500/50 shadow-md shadow-green-500/10"
                      : "border-orange-500/50 shadow-md shadow-orange-500/10 animate-pulse"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-1 mb-0.5">
                        <div className="text-xs font-semibold text-slate-400">
                          Block #{block.id}
                        </div>
                        {block.verified ? (
                          <span className="text-green-400 text-xs">
                            ✓ Verified
                          </span>
                        ) : (
                          <span className="text-orange-400 text-xs animate-pulse">
                            ⏳ Pending
                          </span>
                        )}
                      </div>
                      <div className="font-mono text-xs text-slate-300 mb-0.5">
                        {block.hash}
                      </div>
                      <div className="flex gap-1 text-xs">
                        <span className="px-1.5 py-0.5 bg-slate-800 text-slate-400 rounded text-xs">
                          Nonce: {Math.floor(Math.random() * 10000)}
                        </span>
                        <span className="px-1.5 py-0.5 bg-slate-800 text-slate-400 rounded text-xs">
                          Gas: {Math.floor(20 + Math.random() * 30)}
                        </span>
                      </div>
                    </div>
                    <div
                      className={`w-2 h-2 rounded-full ${
                        block.verified
                          ? "bg-green-500"
                          : "bg-orange-500 animate-pulse"
                      }`}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Network Stats */}
          <div className="bg-slate-900/80 rounded-lg p-1.5 border border-slate-700/50">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              <div>
                <div className="text-xs text-slate-400 mb-0.5">Hash Rate</div>
                <div className="text-xs font-bold text-orange-400">
                  {Math.floor(250 + Math.random() * 50)} TH/s
                </div>
              </div>
              <div>
                <div className="text-xs text-slate-400 mb-0.5">
                  Active Nodes
                </div>
                <div className="text-xs font-bold text-cyan-400">
                  {Math.floor(8000 + Math.random() * 1000)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
