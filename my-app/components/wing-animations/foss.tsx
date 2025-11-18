"use client";

import { useEffect, useState } from "react";

export function FossAnimation() {
  const [commits, setCommits] = useState(0);
  const [stars, setStars] = useState(0);
  const [activity, setActivity] = useState<number[]>([]);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCommits((prev) => (prev + 1) % 100);
      setStars((prev) => (prev < 999 ? prev + 13 : 0));
      setActivity((prev) => {
        const newActivity = [...prev, Math.random()];
        return newActivity.slice(-12);
      });
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="
        w-full h-full
        flex items-center justify-center
        overflow-hidden
        bg-linear-to-br from-slate-950 via-orange-950/20 to-slate-950
        rounded-lg
      "
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* FULL COVER wrapper */}
      <div
        className={`
          w-full h-full flex flex-col flex-1 
          min-h-0 overflow-hidden
          transition-transform duration-300
          ${isHovered ? "scale-[1.02]" : "scale-100"}
        `}
      >
        {/* CARD */}
        <div className="bg-slate-900/90 rounded-xl border border-slate-700 overflow-hidden flex flex-col h-full min-h-0">
          {/* HEADER */}
          <div className="bg-slate-800/90 px-2 py-1.5 border-b border-slate-700 shrink-0">
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-6 rounded-lg bg-linear-to-br from-orange-500 to-yellow-500 flex items-center justify-center text-sm">
                🔓
              </div>
              <div>
                <div className="text-xs font-semibold text-slate-200">
                  open-source-project
                </div>
                <div className="text-xs text-slate-400">Public Repository</div>
              </div>
            </div>
          </div>

          {/* BODY */}
          <div className="p-2 space-y-2 overflow-hidden flex-1 min-h-0">
            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 shrink-0">
              <div className="bg-slate-800/50 rounded-lg p-1.5 text-center border border-slate-700/50">
                <div className="text-sm font-bold text-orange-400">
                  {commits}
                </div>
                <div className="text-xs text-slate-400 mt-0.5">Commits</div>
              </div>

              <div className="bg-slate-800/50 rounded-lg p-1.5 text-center border border-slate-700/50">
                <div className="text-sm font-bold text-yellow-400">{stars}</div>
                <div className="text-xs text-slate-400 mt-0.5">Stars</div>
              </div>

              <div className="bg-slate-800/50 rounded-lg p-1.5 text-center border border-slate-700/50">
                <div className="text-sm font-bold text-green-400">42</div>
                <div className="text-xs text-slate-400 mt-0.5">Forks</div>
              </div>
            </div>

            {/* Contribution Graph */}
            <div className="shrink-0">
              <div className="text-xs text-slate-400 mb-1">Recent Activity</div>
              <div className="flex gap-0.5 justify-between">
                {activity.map((val, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-sm transition-all duration-300"
                    style={{
                      height: `${20 + val * 20}px`,
                      backgroundColor:
                        val > 0.7
                          ? "#f59e0b"
                          : val > 0.4
                          ? "#fb923c"
                          : "#fed7aa",
                      opacity: 0.3 + val * 0.7,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Recent Commits */}
            <div className="space-y-1 overflow-y-auto min-h-0 flex-1">
              {[
                {
                  msg: "feat: Add new feature",
                  time: "2m ago",
                  color: "green",
                },
                { msg: "fix: Bug fix", time: "1h ago", color: "orange" },
              ].map((commit, i) => (
                <div
                  key={i}
                  className="flex items-start gap-1 text-xs bg-slate-800/30 rounded-lg p-1 border border-slate-700/30"
                  style={{ animationDelay: `${i * 200}ms` }}
                >
                  <div
                    className={`
                      w-1 h-1 rounded-full mt-1 shrink-0 animate-pulse
                      ${commit.color === "green" ? "bg-green-500" : ""}
                      ${commit.color === "orange" ? "bg-orange-500" : ""}
                    `}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-slate-300 truncate font-mono text-xs">
                      {commit.msg}
                    </div>
                    <div className="text-slate-500 text-xs">{commit.time}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* License + avatars */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pt-1.5 border-t border-slate-700/50 shrink-0">
              <span className="px-1.5 py-0.5 bg-orange-500/20 text-orange-400 text-xs rounded-full border border-orange-500/30 w-fit">
                MIT License
              </span>

              <div className="flex gap-0.5 justify-start sm:justify-end">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="w-4 h-4 rounded-full bg-linear-to-br from-orange-500 to-yellow-500 border-2 border-slate-900 -ml-1 first:ml-0 animate-pulse"
                    style={{ animationDelay: `${i * 300}ms` }}
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
