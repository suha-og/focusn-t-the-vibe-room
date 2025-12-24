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
      className={`fixed inset-0 z-50 flex items-center justify-center animate-fade-in ${className}`}
      onClick={handleBackdropClick}
    >
      {children}
    </div>
  );
};
