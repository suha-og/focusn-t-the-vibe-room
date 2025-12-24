import { useState } from "react";
import { GlassCard } from "@/components/GlassCard";
import { leaderboardData } from "@/data/fakeData";
import { Trophy, LayoutGrid, Brain, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";

type LeaderboardCategory = "mostTabsOpen" | "leastStudyingDone" | "highestConfidence";

const categoryInfo = {
  mostTabsOpen: { label: "Most Tabs Open", icon: LayoutGrid, color: "cyan" },
  leastStudyingDone: { label: "Least Studying Done", icon: Timer, color: "magenta" },
  highestConfidence: { label: "Highest Confidence (0 Prep)", icon: Brain, color: "purple" },
};

export const Leaderboard = () => {
  const [activeCategory, setActiveCategory] = useState<LeaderboardCategory>("mostTabsOpen");

  const data = leaderboardData[activeCategory];
  const info = categoryInfo[activeCategory];

  return (
    <GlassCard glow="purple">
      <div className="flex items-center gap-2 mb-4">
        <Trophy className="w-5 h-5 text-neon-purple" />
        <h3 className="font-display font-semibold text-foreground">
          Pointless Leaderboard
        </h3>
      </div>

      {/* Category tabs */}
      <div className="flex flex-wrap gap-2 mb-4">
        {(Object.keys(categoryInfo) as LeaderboardCategory[]).map((cat) => {
          const catInfo = categoryInfo[cat];
          const Icon = catInfo.icon;
          return (
            <Button
              key={cat}
              variant={activeCategory === cat ? "neon" : "glass"}
              size="sm"
              onClick={() => setActiveCategory(cat)}
              className="text-xs"
            >
              <Icon className="w-3 h-3 mr-1" />
              {catInfo.label}
            </Button>
          );
        })}
      </div>

      {/* Leaderboard entries */}
      <div className="space-y-2">
        {data.map((entry, index) => (
          <div
            key={index}
            className={`flex items-center justify-between px-3 py-2 rounded-lg transition-all ${
              entry.name === "YOU"
                ? "bg-primary/20 border border-primary/50"
                : "bg-muted/30"
            }`}
          >
            <div className="flex items-center gap-3">
              <span className={`text-lg font-display font-bold ${
                index === 0 ? "text-yellow-400" : 
                index === 1 ? "text-primary" : 
                "text-muted-foreground"
              }`}>
                #{index + 1}
              </span>
              <span className={`text-sm ${entry.name === "YOU" ? "font-bold text-primary" : "text-foreground"}`}>
                {entry.name}
              </span>
            </div>
            <span className="text-sm font-mono text-muted-foreground">
              {entry.score}
            </span>
          </div>
        ))}
      </div>

      <p className="text-xs text-muted-foreground text-center mt-4">
        * You're always #2. Never first, never last. Just mid.
      </p>
    </GlassCard>
  );
};
