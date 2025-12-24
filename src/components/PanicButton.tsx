import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Flame, X } from "lucide-react";

export const PanicButton = () => {
  const [isPanicking, setIsPanicking] = useState(false);

  const triggerPanic = () => {
    setIsPanicking(true);
  };

  const dismiss = () => {
    setIsPanicking(false);
  };

  return (
    <>
      <Button
        variant="destructive"
        size="lg"
        onClick={triggerPanic}
        className="font-display font-bold animate-pulse hover:animate-none"
      >
        <Flame className="w-5 h-5 mr-2" />
        I'M COOKED
      </Button>

      {/* Panic Overlay */}
      {isPanicking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Chaotic background */}
          <div className="absolute inset-0 bg-gradient-to-br from-destructive/40 via-orange-500/30 to-destructive/40 animate-alarm" />
          
          {/* Animated flames border effect */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,hsla(0,84%,60%,0.4),transparent_70%)]" />
          
          {/* Content */}
          <div className="relative z-10 bg-background/95 border-4 border-destructive rounded-3xl p-10 max-w-lg mx-4 animate-bounce-in">
            <div className="text-center">
              {/* Flames animation */}
              <div className="flex justify-center gap-2 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Flame
                    key={i}
                    className="w-8 h-8 text-destructive animate-bounce"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  />
                ))}
              </div>
              
              <h2 className="text-4xl font-display font-black text-destructive mb-4 animate-glitch">
                COOKED
              </h2>
              
              <p className="text-xl text-foreground mb-6">
                Acceptance is the first stage.
              </p>

              <div className="space-y-2 text-left bg-destructive/10 rounded-lg p-4 mb-6">
                <p className="text-sm text-muted-foreground">Current Status:</p>
                <ul className="text-sm text-foreground space-y-1">
                  <li>📚 Syllabus: 12%</li>
                  <li>😰 Anxiety: 847%</li>
                  <li>☕ Coffee consumed: Unhealthy</li>
                  <li>🎯 Preparation level: Vibes only</li>
                </ul>
              </div>
              
              <Button
                variant="outline"
                onClick={dismiss}
                className="w-full border-destructive/50 hover:bg-destructive/20"
              >
                <X className="w-4 h-4 mr-2" />
                Continue Panicking Privately
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
