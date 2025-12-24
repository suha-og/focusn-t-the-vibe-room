import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, X } from "lucide-react";

export const RealityCheck = () => {
  const [isActive, setIsActive] = useState(false);

  const triggerReality = () => {
    setIsActive(true);
  };

  const dismiss = () => {
    setIsActive(false);
  };

  return (
    <>
      <Button
        variant="outline"
        onClick={triggerReality}
        className="border-destructive/50 text-destructive hover:bg-destructive/20"
      >
        <AlertTriangle className="w-4 h-4 mr-2" />
        Reality Check
      </Button>

      {/* Reality Check Overlay */}
      {isActive && (
        <div className="fixed inset-0 z-50 flex items-center justify-center animate-screen-shake">
          {/* Flashing red overlay */}
          <div className="absolute inset-0 reality-check-overlay bg-destructive/20" />
          
          {/* Content */}
          <div className="relative z-10 bg-background/95 border-2 border-destructive rounded-2xl p-8 max-w-md mx-4 animate-scale-in">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-destructive/20 flex items-center justify-center animate-alarm">
                <AlertTriangle className="w-8 h-8 text-destructive" />
              </div>
              
              <h2 className="text-2xl font-display font-bold text-destructive mb-4">
                REALITY CHECK
              </h2>
              
              <p className="text-lg text-foreground mb-2">
                Exam in <span className="text-destructive font-bold">3 days</span>.
              </p>
              <p className="text-foreground mb-6">
                You watched <span className="text-destructive font-bold">17 motivational videos</span>.
              </p>
              
              <Button
                variant="destructive"
                onClick={dismiss}
                className="w-full"
              >
                <X className="w-4 h-4 mr-2" />
                Close and Panic Later
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
