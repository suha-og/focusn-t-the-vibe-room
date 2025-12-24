import { usePopupManager } from "@/hooks/usePopupManager";

interface PopupBackdropProps {
  children: React.ReactNode;
  className?: string;
}

export const PopupBackdrop = ({ children, className = "" }: PopupBackdropProps) => {
  const { closePopup } = usePopupManager();

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closePopup();
    }
  };

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center animate-fade-in ${className}`}
      onClick={handleBackdropClick}
      style={{ pointerEvents: "auto" }}
    >
      {/* Dark backdrop with blur - captures all pointer events */}
      <div 
        className="absolute inset-0 bg-background/90 backdrop-blur-md"
        onClick={handleBackdropClick}
        style={{ pointerEvents: "auto" }}
      />
      {children}
    </div>
  );
};
