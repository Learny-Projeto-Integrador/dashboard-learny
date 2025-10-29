"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import CustomAlert from "@/components/CustomAlert";

type AlertData = {
  icon: string;
  title: string;
  message: string;
  onClose?: () => void;
  onRedirect?: () => void;
};

type AlertContextType = {
  showAlert: (data: AlertData) => void;
};

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export function useCustomAlert() {
  const context = useContext(AlertContext);
  if (!context) throw new Error("useCustomAlert must be used within AlertProvider");
  return context;
}

type Props = { children: ReactNode };

export function AlertProvider({ children }: Props) {
  const [queue, setQueue] = useState<AlertData[]>([]);
  const [current, setCurrent] = useState<AlertData | null>(null);
  const [visible, setVisible] = useState(false);

  const showAlert = (data: AlertData) => {
    setQueue(prev => [...prev, data]);
  };

  // Exibir o próximo alerta da fila
  useEffect(() => {
    if (!current && queue.length > 0) {
      const [next, ...rest] = queue;
      setCurrent(next);
      setQueue(rest);
      setVisible(true);
    }
  }, [queue, current]);

  // Auto-fechar após 5 segundos
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => handleClose(), 5000);
      return () => clearTimeout(timer);
    }
  }, [visible]);

  const handleClose = () => {
    if (!current) return;

    setVisible(false);

    // Executa callbacks se existirem
    if (current.onClose) current.onClose();
    if (current.onRedirect) current.onRedirect();

    // Espera animação sumir antes de limpar
    setTimeout(() => setCurrent(null), 300);
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      {current && (
        <div
          className={`fixed inset-0 z-40 flex items-start justify-end 
            bg-black/40 transition-opacity duration-300
            ${visible ? "opacity-100" : "opacity-0 pointer-events-none"}`}
          onClick={handleClose}
        >
          <CustomAlert
            icon={current.icon}
            visible={visible}
            title={current.title}
            message={current.message}
            onClose={handleClose}
          />
        </div>
      )}
    </AlertContext.Provider>
  );
}
