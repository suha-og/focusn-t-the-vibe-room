import { useState } from "react";
import { GlassCard } from "@/components/GlassCard";
import { Button } from "@/components/ui/button";
import { excuses, getRandomItem } from "@/data/fakeData";
import { Shuffle, Copy, Check } from "lucide-react";

export const ExcuseGenerator = () => {
  const [currentExcuse, setCurrentExcuse] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const generateExcuse = () => {
    setCurrentExcuse(getRandomItem(excuses));
    setCopied(false);
  };

  const copyExcuse = () => {
    if (currentExcuse) {
      navigator.clipboard.writeText(currentExcuse);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <GlassCard>
      <p className="text-sm text-muted-foreground mb-3 font-display">EXCUSE GENERATOR</p>
      
      {currentExcuse && (
        <div className="bg-muted/50 rounded-lg p-3 mb-3 flex items-start justify-between gap-2">
          <p className="text-sm text-foreground italic">"{currentExcuse}"</p>
          <button
            onClick={copyExcuse}
            className="text-muted-foreground hover:text-primary transition-colors flex-shrink-0"
          >
            {copied ? <Check className="w-4 h-4 text-neon-green" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      )}
      
      <Button variant="chaos" onClick={generateExcuse} className="w-full">
        <Shuffle className="w-4 h-4 mr-2" />
        Generate Excuse
      </Button>
    </GlassCard>
  );
};
