import { useState, useEffect } from "react";
import { usePopupManager } from "@/hooks/usePopupManager";
import { futureYouMessages, getRandomItem, getRandomNumber } from "@/data/fakeData";
import { X, Sparkles } from "lucide-react";

export const FutureYouMessage = () => {
  const [message, setMessage] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { isPrimaryModalOpen } = usePopupManager();

  // Show message at random intervals
  useEffect(() => {
    const showMessage = () => {
      // Don't show if primary modal is open
      if (isPrimaryModalOpen) return;
      
      setMessage(getRandomItem(futureYouMessages));
      setIsVisible(true);
    };

    // Show first message after 8-15 seconds
    const initialTimeout = setTimeout(showMessage, getRandomNumber(8000, 15000));

    // Then show at random intervals (45-90 seconds)
    const interval = setInterval(() => {
      if (!isPrimaryModalOpen && !isVisible) {
        showMessage();
      }
    }, getRandomNumber(45000, 90000));

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [isPrimaryModalOpen, isVisible]);

  // Auto-dismiss after 8 seconds
  useEffect(() => {
    if (isVisible) {
      const timeout = setTimeout(() => {
        setIsVisible(false);
      }, 8000);
      return () => clearTimeout(timeout);
    }
  }, [isVisible, message]);

  // Hide when primary modal opens
  useEffect(() => {
    if (isPrimaryModalOpen && isVisible) {
      setIsVisible(false);
    }
  }, [isPrimaryModalOpen, isVisible]);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible || !message || isPrimaryModalOpen) return null;

  return (
    <div className="fixed top-20 left-4 right-4 md:left-auto md:right-4 md:max-w-sm z-30 animate-fade-in">
      <div className="bg-background/95 backdrop-blur-md border border-neon-cyan/40 rounded-2xl p-4 shadow-lg shadow-neon-cyan/10">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="pr-6">
          {/* Label */}
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-neon-cyan animate-pulse" />
            <span className="text-xs font-display text-neon-cyan/80">
              Message from Future You
            </span>
          </div>

          {/* Message */}
          <p className="text-sm text-foreground leading-relaxed">
            "{message}"
          </p>
        </div>
      </div>
    </div>
  );
};
