"use client";

import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useEffect,
} from "react";

// Tipi per il contesto
export interface ModalContextType {
  isOpen: boolean;
  modalType: string | null;
  modalData: any;
  openModal: (type: string, data?: any) => void;
  closeModal: () => void;
}

// Stato iniziale
interface ModalState {
  isOpen: boolean;
  modalType: string | null;
  modalData: any;
}

// Azioni per il reducer
type ModalAction =
  | { type: "OPEN_MODAL"; payload: { modalType: string; data?: any } }
  | { type: "CLOSE_MODAL" }
  | { type: "UPDATE_DATA"; payload: any };

// Stato iniziale
const initialState: ModalState = {
  isOpen: false,
  modalType: null,
  modalData: null,
};

// Reducer per gestire le azioni della modale
function modalReducer(state: ModalState, action: ModalAction): ModalState {
  switch (action.type) {
    case "OPEN_MODAL":
      return {
        isOpen: true,
        modalType: action.payload.modalType,
        modalData: action.payload.data || null,
      };

    case "CLOSE_MODAL":
      return {
        isOpen: false,
        modalType: null,
        modalData: null,
      };

    case "UPDATE_DATA":
      return {
        ...state,
        modalData: action.payload,
      };

    default:
      return state;
  }
}

// Creazione del contesto
const ModalContext = createContext<ModalContextType | undefined>(undefined);

// Provider component
export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(modalReducer, initialState);

  // Funzione per aprire la modale
  const openModal = useCallback((type: string, data?: any) => {
    dispatch({
      type: "OPEN_MODAL",
      payload: { modalType: type, data },
    });
  }, []);

  // Funzione per chiudere la modale
  const closeModal = useCallback(() => {
    dispatch({ type: "CLOSE_MODAL" });
  }, []);

  // Gestione tastiera (ESC per chiudere)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && state.isOpen) {
        closeModal();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [state.isOpen, closeModal]);

  // Gestione focus trapping quando modale è aperta
  useEffect(() => {
    if (state.isOpen) {
      // Disabilita scroll del body
      document.body.style.overflow = "hidden";

      // Focus sul primo elemento interattivo dentro la modale (dopo un piccolo delay)
      const focusableElements = document.querySelectorAll(
        '[role="dialog"], [role="modal"], button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );

      const timeoutId = setTimeout(() => {
        if (focusableElements.length > 0) {
          (focusableElements[0] as HTMLElement).focus();
        }
      }, 100);

      return () => {
        clearTimeout(timeoutId);
        document.body.style.overflow = "";
      };
    }
  }, [state.isOpen]);

  const contextValue: ModalContextType = {
    ...state,
    openModal,
    closeModal,
  };

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
    </ModalContext.Provider>
  );
}

// Hook personalizzato per usare il contesto
export function useModal(): ModalContextType {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
}

// Hook personalizzato per tipizzare i dati
export function useModalData<T = any>(): T | null {
  const { modalData } = useModal();
  return modalData;
}
