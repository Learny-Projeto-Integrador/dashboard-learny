"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { IoMdAddCircle } from "react-icons/io";
import { useRouter } from "next/navigation";
import { useChild } from "@/contexts/ChildContext";
import { useCustomAlert } from "@/contexts/AlertContext";

type Filho = {
  _id: string;
  usuario: string;
  nome: string;
  foto?: string;
};

const LoadingComponent = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <Image
        src="/gifs/loading.gif"
        alt="Loading"
        width={100}
        height={100}
        unoptimized
      />
    </div>
  );
};

export default function ContainerFilhos({ onClose }: { onClose: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { showAlert } = useCustomAlert();
  const { child, setChild } = useChild();
  const [filhos, setFilhos] = useState<Filho[]>([]);
  const [filhoSelecionado, setFilhoSelecionado] = useState<Filho | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const carregarTudo = async () => {
    try {
      const [resFilhos, resSelecionado] = await Promise.all([
        fetch(`/api/criancas`, {
          headers: { "Content-Type": "application/json" },
        }),
        fetch(`/api/filhoSelecionado`, {
          headers: { "Content-Type": "application/json" },
        }),
      ]);

      const dataFilhos = await resFilhos.json();
      const dataSelecionado = await resSelecionado.json();

      if (resFilhos.ok) setFilhos(dataFilhos.result);
      if (resSelecionado.ok) setFilhoSelecionado(dataSelecionado.result);
    } catch {
      showAlert({
        icon: "/icons/erro.png",
        title: "Erro ao carregar!",
        message: "Ocorreu um erro interno",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = async (filho: Filho) => {
    setLoading(true);

    try {
      const res = await fetch(`/api/filhoSelecionado`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: filho?._id }),
      });

      const data = await res.json();

      if (res.ok) {
        setFilhoSelecionado(data.result);
        setChild({
          foto: data.result.foto,
          usuario: data.result.usuario,
          nome: data.result.nome,
          pontos: data.result.pontos,
          fasesConcluidas: data.result.fasesConcluidas,
          medalhas: data.result.medalhas,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarTudo();
  }, []);

  return (
    <div
      ref={containerRef}
      onClick={(e) => e.stopPropagation()}
      className="flex flex-col items-center justify-center absolute left-56 w-80 top-28 min-h-28 rounded-2xl p-[2px] bg-white shadow-[0_0_12px_rgba(150,150,150,0.7)] z-50"
    >
      {loading ? (
        <LoadingComponent />
      ) : (
        <div className="bg-white/10 rounded-2xl p-3 w-80">
          <div className="bg-white/10 rounded-2xl p-3">
            {!filhoSelecionado ? (
              <div className="flex flex-col justify-center items-center">
                <span className="flex text-center mb-4">
                  Cadastre seu primeiro filho
                </span>
                <button className="flex w-full bg-zinc-300 justify-center rounded-lg py-2 hover:cursor-pointer">
                  <div
                    onClick={() => {
                      router.push("/cadastro?tipo=criancas")
                      router.refresh();
                    }}
                    className="flex items-center justify-center"
                  >
                    <IoMdAddCircle name="add-circle" size={30} color="#fff" />
                  </div>
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <div className="w-full bg-[#EF5B6A] flex items-center justify-between px-4 py-3 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div
                      className="w-14 h-14 rounded-full bg-cover bg-center bg-no-repeat"
                      style={{
                        backgroundImage: `url(${
                          filhoSelecionado.foto
                            ? filhoSelecionado.foto
                            : "/images/avatar.png"
                        })`,
                      }}
                    />
                    <div>
                      <p className="text-lg font-bold text-white">
                        {filhoSelecionado.nome || "Joana"}
                      </p>
                    </div>
                  </div>
                  <button
                  className="hover:cursor-pointer"
                    onClick={() =>
                      router.push(
                        `/crianca/perfil?id=${filhoSelecionado._id}`
                      )
                    }
                  >
                    <Image
                      src="/icons/engrenagem.png"
                      alt="editar"
                      width={35}
                      height={35}
                    />
                  </button>
                </div>

                <div className="w-full">
                  {filhos
                    .filter((f) => f.usuario !== filhoSelecionado.usuario)
                    .map((filho) => (
                      <button
                        key={filho.usuario}
                        onClick={() => handleSelect(filho)}
                        className="flex items-center w-full gap-4 px-4 py-2 mb-2 rounded-lg hover:cursor-pointer hover:bg-zinc-400 transition"
                      >
                        <div
                          className="w-14 h-14 rounded-full bg-cover bg-center bg-no-repeat"
                          style={{
                            backgroundImage: `url(${
                              filho.foto || "/images/avatar.png"
                            })`,
                          }}
                        />
                        <span className="text-[#4c4c4c] font-semibold text-base">
                          {filho.nome}
                        </span>
                      </button>
                    ))}

                  <button 
                    className="flex w-full bg-zinc-300 justify-center rounded-lg py-2 hover:cursor-pointer"
                    onClick={() => {
                      router.push("/cadastro?tipo=criancas")
                      router.refresh();
                    }}
                    >
                    <div
                      className="flex items-center justify-center"
                    >
                      <IoMdAddCircle name="add-circle" size={30} color="#fff" />
                    </div>
                  </button>
                </div>
              </div>
            )}

            {loading && (
              <p className="text-white text-sm mt-2">Carregando...</p>
            )}
            {error && <p className="text-red-300 text-sm mt-2">{error}</p>}
          </div>
        </div>
      )}
    </div>
  );
}
