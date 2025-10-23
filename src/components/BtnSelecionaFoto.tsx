import { useRef } from "react";
import Image from "next/image";

type Props = {
  type?: "add" | "edit";
  image?: string;
};

export default function BtnSelecionaFoto({ type = "add", image }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("📸 Arquivo selecionado:", file);
      // Aqui você pode: gerar preview, enviar pro servidor, etc.
    }
  };

  return (
    <div className="relative">
      {type === "edit" ? (
        <button
          onClick={handleClick}
          className="w-40 h-40 flex items-end justify-end pr-2 pb-2 bg-contain bg-no-repeat rounded-lg hover:cursor-pointer"
          style={{
            backgroundImage: `url(/images/${image ? image : "pai.png"})`,
          }}
        >
          <div className="w-8 h-8 bg-[url('/icons/editar.png')] bg-contain bg-no-repeat rounded-full" />
        </button>
      ) : (
        <button onClick={handleClick} className="hover:cursor-pointer">
          <Image
            src="/images/camera.png"
            alt="Camera"
            width={120}
            height={120}
            className="mb-4"
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
