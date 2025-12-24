import { Button } from "@/components/ui/button";
import { PopupBackdrop } from "@/components/PopupBackdrop";
import { usePopupManager } from "@/hooks/usePopupManager";
import { AlertTriangle, X } from "lucide-react";

export const RealityCheck = () => {
  const { activePopup, openPopup, closePopup } = usePopupManager();

  const isOpen = activePopup === "reality";

  const triggerReality = () => {
    openPopup("reality");
  };

  const handleClose = () => {
    closePopup();
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
      {isOpen && (
        <PopupBackdrop className="animate-screen-shake">
          {/* Flashing red overlay */}
          <div className="absolute inset-0 reality-check-overlay bg-destructive/30 pointer-events-none" />
          
          {/* Content */}
          <div 
            className="relative z-10 bg-background border-2 border-destructive rounded-2xl p-8 max-w-md mx-4 animate-scale-in shadow-2xl"
            style={{ pointerEvents: "auto" }}
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

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
                onClick={handleClose}
                className="w-full"
              >
                <X className="w-4 h-4 mr-2" />
                Close and Panic Later
              </Button>
            </div>
          </div>
        </PopupBackdrop>
      )}
    </>
  );
};
