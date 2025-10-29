"use client";

import { useRef } from "react";
import Image from "next/image";

type Props = {
  type?: "add" | "edit";
  image?: string | null;
  onChange?: (newImage: string | null) => void;
};

export default function BtnSelecionaFoto({ type = "add", image, onChange }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Erro ao enviar imagem");

      const data = await res.json();
      if (onChange) onChange(data.url);
    } catch (err) {
      console.error("Erro no upload:", err);
    }
  };

  return (
    <div className="relative">
      {type === "edit" ? (
        <button
          onClick={handleClick}
          className="w-40 h-40 flex items-end justify-end pr-2 pb-2 bg-cover bg-center bg-no-repeat rounded-lg hover:cursor-pointer"
          style={{
            backgroundImage: `url(${image || "/images/pai.png"})`,
          }}
        >
          <div className="w-8 h-8 bg-[url('/icons/editar.png')] bg-contain bg-no-repeat rounded-full" />
        </button>
      ) : (
        <button onClick={handleClick} className="hover:cursor-pointer">
          <Image
            src={image || "/images/camera.png"}
            alt="Foto"
            width={120}
            height={120}
            className="mb-4 rounded-lg"
          />
        </button>
      )}

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
    </div>
  );
}
