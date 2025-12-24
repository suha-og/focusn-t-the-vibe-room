import { useState, useEffect } from "react";
import { GlassCard } from "@/components/GlassCard";
import { backgroundSounds, getRandomNumber } from "@/data/fakeData";
import { Volume2 } from "lucide-react";

export const SoundPanel = () => {
  const [activeSounds, setActiveSounds] = useState<string[]>([]);
  const [showPopup, setShowPopup] = useState(false);

  const toggleSound = (soundId: string) => {
    setActiveSounds((prev) =>
      prev.includes(soundId)
        ? prev.filter((id) => id !== soundId)
        : [...prev, soundId]
    );
  };

  // Random "almost focused" popup
  useEffect(() => {
    if (activeSounds.length === 0) return;

    const interval = setInterval(() => {
      if (Math.random() < 0.3) {
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 2000);
      }
    }, getRandomNumber(10000, 20000));

    return () => clearInterval(interval);
  }, [activeSounds]);

  return (
    <GlassCard className="relative">
      {showPopup && (
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full z-10 animate-bounce-in">
          <div className="bg-neon-magenta/20 border border-neon-magenta/50 rounded-lg px-3 py-1.5 text-xs text-foreground whitespace-nowrap">
            You were almost focused.
          </div>
        </div>
      )}
      
      <div className="flex items-center gap-2 mb-3">
        <Volume2 className="w-4 h-4 text-primary" />
        <p className="text-sm text-muted-foreground font-display">AMBIENT CHAOS</p>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {backgroundSounds.map((sound) => (
          <button
            key={sound.id}
            onClick={() => toggleSound(sound.id)}
            className={`px-3 py-1.5 rounded-lg text-xs transition-all flex items-center gap-1.5 ${
              activeSounds.includes(sound.id)
                ? "bg-primary/20 border border-primary/50 text-primary"
                : "bg-muted/50 border border-border/30 text-muted-foreground hover:border-primary/30"
            }`}
          >
            <span>{sound.emoji}</span>
            <span>{sound.label}</span>
          </button>
        ))}
      </div>
    </GlassCard>
  );
};
