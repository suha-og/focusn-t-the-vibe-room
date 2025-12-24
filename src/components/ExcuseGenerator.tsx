import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { usePopupManager } from "@/hooks/usePopupManager";
import { excuses, getRandomItem } from "@/data/fakeData";
import { Shuffle, Copy, Check, X } from "lucide-react";

export const ExcuseGenerator = () => {
  const [currentExcuse, setCurrentExcuse] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { isPrimaryModalOpen } = usePopupManager();

  // Auto-hide when primary modal opens
  useEffect(() => {
    if (isPrimaryModalOpen && isVisible) {
      setIsVisible(false);
    }
  }, [isPrimaryModalOpen, isVisible]);

  // Auto-dismiss after 10 seconds
  useEffect(() => {
    if (isVisible) {
      const timeout = setTimeout(() => {
        setIsVisible(false);
      }, 10000);
      return () => clearTimeout(timeout);
    }
  }, [isVisible, currentExcuse]);

  const generateExcuse = () => {
    // Don't open if primary modal is active
    if (isPrimaryModalOpen) return;
    
    const newExcuse = getRandomItem(excuses);
    setCurrentExcuse(newExcuse);
    setCopied(false);
    setIsVisible(true);
  };

  const copyExcuse = () => {
    if (currentExcuse) {
      navigator.clipboard.writeText(currentExcuse);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <>
      {/* Fixed floating button - docked at bottom right */}
      <div className={`fixed bottom-6 right-6 z-30 transition-opacity duration-300 ${isPrimaryModalOpen ? 'opacity-40 pointer-events-none' : 'opacity-100'}`}>
        <Button 
          variant="chaos" 
          onClick={generateExcuse}
          disabled={isPrimaryModalOpen}
          className="shadow-lg shadow-primary/20"
        >
          <Shuffle className="w-4 h-4 mr-2" />
          Generate Excuse
        </Button>
      </div>

      {/* Excuse Toast - positioned above the floating button */}
      {isVisible && currentExcuse && !isPrimaryModalOpen && (
        <div className="fixed bottom-20 right-6 left-6 md:left-auto md:max-w-md z-30 animate-fade-in">
          <div className="bg-background border-2 border-primary/50 rounded-2xl p-4 shadow-2xl">
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="pr-6">
              <h3 className="text-sm font-display font-bold text-primary mb-2">
                🎭 YOUR EXCUSE
              </h3>
              
              <div className="bg-muted/50 rounded-lg p-3 mb-3">
                <p className="text-sm text-foreground italic">"{currentExcuse}"</p>
              </div>

              {/* Action buttons */}
              <div className="flex gap-2 items-center">
                <button
                  onClick={copyExcuse}
                  className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3 text-neon-green" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      Copy
                    </>
                  )}
                </button>
                <div className="flex-1" />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={generateExcuse}
                  className="h-8 text-xs"
                >
                  <Shuffle className="w-3 h-3 mr-1" />
                  Another
                </Button>
                <Button
                  variant="glass"
                  size="sm"
                  onClick={handleClose}
                  className="h-8 text-xs"
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
