import { useState, useEffect } from "react";
import { deluluAffirmations, getRandomItem } from "@/data/fakeData";
import { Sparkles } from "lucide-react";

export const DeluluAffirmation = () => {
  const [affirmation, setAffirmation] = useState(getRandomItem(deluluAffirmations));

  useEffect(() => {
    const interval = setInterval(() => {
      setAffirmation(getRandomItem(deluluAffirmations));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center py-4 animate-sparkle">
      <div className="flex items-center justify-center gap-2 text-neon-pink">
        <Sparkles className="w-5 h-5" />
        <p className="text-lg font-display font-semibold">{affirmation}</p>
        <Sparkles className="w-5 h-5" />
      </div>
    </div>
  );
};
