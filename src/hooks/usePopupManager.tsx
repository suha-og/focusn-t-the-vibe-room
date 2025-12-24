import React, { createContext, useContext, useState, useCallback, useEffect } from "react";

type PopupType = "reality" | "panic" | null; // Primary modals only

interface PopupContextType {
  activePopup: PopupType;
  openPopup: (type: PopupType) => void;
  closePopup: () => void;
  isPrimaryModalOpen: boolean;
}

const PopupContext = createContext<PopupContextType | undefined>(undefined);

export const PopupProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activePopup, setActivePopup] = useState<PopupType>(null);

  const openPopup = useCallback((type: PopupType) => {
    setActivePopup(type);
  }, []);

  const closePopup = useCallback(() => {
    setActivePopup(null);
  }, []);

  // ESC key to close popup
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && activePopup) {
        closePopup();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activePopup, closePopup]);

  // Disable body scroll when popup is open
  useEffect(() => {
    if (activePopup) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activePopup]);

  const isPrimaryModalOpen = activePopup !== null;

  return (
    <PopupContext.Provider value={{ activePopup, openPopup, closePopup, isPrimaryModalOpen }}>
      {children}
    </PopupContext.Provider>
  );
};

export const usePopupManager = () => {
  const context = useContext(PopupContext);
  if (!context) {
    throw new Error("usePopupManager must be used within a PopupProvider");
  }
  return context;
};
