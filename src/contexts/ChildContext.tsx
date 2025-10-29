"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";

type Child = {
  foto: string;
  usuario: string;
  nome: string;
  pontos: number,
  fasesConcluidas: number,
  medalhas: [],
};

type ChildContextType = {
  child: Child | null;
  setChild: (child: Child | null) => void;
};

const ChildContext = createContext<ChildContextType | undefined>(undefined);

export function ChildProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [child, setChild] = useState<Child | null>(null);

  // 🔁 Recupera criança salva (ex: após refresh)
  useEffect(() => {
    const storedChild = localStorage.getItem("child");
    if (storedChild) {
      setChild(JSON.parse(storedChild));
    }
  }, []);

  // 💾 Salva no localStorage quando mudar
  useEffect(() => {
    if (child) localStorage.setItem("child", JSON.stringify(child));
    else localStorage.removeItem("child");
  }, [child]);

  return (
    <ChildContext.Provider value={{ child, setChild }}>
      {children}
    </ChildContext.Provider>
  );
}

export function useChild() {
  const context = useContext(ChildContext);
  if (!context) throw new Error("useChild deve ser usado dentro de um ChildProvider");
  return context;
}
