import { useState } from "react";
import { GlassCard } from "@/components/GlassCard";
import { PopupBackdrop } from "@/components/PopupBackdrop";
import { Button } from "@/components/ui/button";
import { usePopupManager } from "@/hooks/usePopupManager";
import { excuses, getRandomItem } from "@/data/fakeData";
import { Shuffle, Copy, Check, X } from "lucide-react";

export const ExcuseGenerator = () => {
  const [currentExcuse, setCurrentExcuse] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const { activePopup, openPopup, closePopup } = usePopupManager();

  const isOpen = activePopup === "excuse";

  const generateExcuse = () => {
    const newExcuse = getRandomItem(excuses);
    setCurrentExcuse(newExcuse);
    setCopied(false);
    if (!isOpen) {
      openPopup("excuse");
    }
  };

  const copyExcuse = () => {
    if (currentExcuse) {
      navigator.clipboard.writeText(currentExcuse);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleClose = () => {
    closePopup();
  };

  return (
    <>
      <GlassCard>
        <p className="text-sm text-muted-foreground mb-3 font-display">EXCUSE GENERATOR</p>
        <Button variant="chaos" onClick={generateExcuse} className="w-full">
          <Shuffle className="w-4 h-4 mr-2" />
          Generate Excuse
        </Button>
      </GlassCard>

      {/* Excuse Popup Modal */}
      {isOpen && currentExcuse && (
        <PopupBackdrop>
          {/* Backdrop overlay */}
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
          
          {/* Modal content */}
          <div className="relative z-10 bg-background/95 border-2 border-primary/50 rounded-2xl p-6 max-w-md mx-4 animate-scale-in shadow-2xl">
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center">
              <h3 className="text-lg font-display font-bold text-primary mb-4">
                🎭 YOUR EXCUSE
              </h3>
              
              <div className="bg-muted/50 rounded-lg p-4 mb-4">
                <p className="text-lg text-foreground italic">"{currentExcuse}"</p>
              </div>

              {/* Copy indicator */}
              <button
                onClick={copyExcuse}
                className="flex items-center justify-center gap-2 w-full text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-neon-green" />
                    Copied to clipboard!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Click to copy
                  </>
                )}
              </button>

              {/* Action buttons */}
              <div className="flex gap-3">
                <Button
                  variant="chaos"
                  onClick={generateExcuse}
                  className="flex-1"
                >
                  <Shuffle className="w-4 h-4 mr-2" />
                  Another One
                </Button>
                <Button
                  variant="glass"
                  onClick={handleClose}
                  className="flex-1"
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </PopupBackdrop>
      )}
    </>
  );
};
