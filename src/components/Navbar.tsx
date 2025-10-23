"use client";
import { useState } from "react";
import Image from "next/image";
import BtnNavbar from "./BtnNavbar";

const NavBarLogin = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside
        className={`relative h-screen shadow-[4px_0_10px_rgba(0,0,0,0.15)] z-10 ${
          !isOpen && "items-center"
        } bg-white text-[#4c4c4c] transition-all duration-300 ${
          isOpen ? "w-64" : "w-18"
        } flex flex-col p-1`}
      >
        {/* Botão de toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="absolute top-8 bg-white shadow-[4px_4px_10px_rgba(0,0,0,0.15)] -right-9 p-2 hover:cursor-pointer transition-all"
        >
          <Image src="/icons/swipe_icon.png" alt="Toggle Sidebar" width={20} height={20} />
        </button>

        {/* Links */}
        <nav className={`flex flex-col gap-3 mt-24 ${isOpen && "p-4"}`}>
          {
            isOpen ? (
              <div className={`flex flex-col items-center mb-4`}>
                <div className="w-[80%] bg-gradient-to-br hover:cursor-pointer 
            from-[#a94f5c] 
            via-[#519ebf]/100 via-70% 
            to-[#519ebf] h-40 mb-8 rounded-lg text-white flex flex-col items-center justify-center">
              <Image src="/icons/user.png" alt="User" width={40} height={40} className="mb-3" />
                  <span className="font-bold text-xl">Entrar</span>
                </div>
                <span className="text-[#4c4c4c]">Entre em sua conta</span>
                <span className="text-[#4c4c4c] font-black">Learny</span>
              </div>
            ) : (
              <a
                href="#"
                className="flex items-center gap-3 p-1 rounded-md transition text-sm"
              >
                {<Image src="/icons/perfil.png" alt="Close" width={32} height={32} className={`transition-all ${!isOpen && "hover:cursor-pointer hover:scale-110"}`} />}
              </a>
            )
          }
          <div className={`flex items-center ${isOpen && "border-1 border-zinc-200 rounded-md p-1 shadow-md hover:cursor-pointer"}`}>
            <a
              href="#"
              className="flex items-center gap-3 p-1 rounded-md transition text-sm"
            >
              {<Image src="/icons/home.png" alt="Close" width={32} height={32}  className={`transition-all ${!isOpen && "hover:cursor-pointer hover:scale-110"}`} />}
              {isOpen && "Estatística"}
            </a>
          </div>
          <div className={`flex items-center ${isOpen && "border-1 border-zinc-200 rounded-md p-1 shadow-md hover:cursor-pointer"}`}>
            <a
              href="#"
              className="flex items-center gap-3 p-1 rounded-md transition text-sm"
            >
              {<Image src="/icons/info.png" alt="Close" width={32} height={32} className={`transition-all ${!isOpen && "hover:cursor-pointer hover:scale-110"}`} />}
              {isOpen && "Informações"}
            </a>
          </div>
        </nav>
      </aside>
    </div>
  );
}

const NavBarUser = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside
        className={`relative h-screen shadow-[4px_0_10px_rgba(0,0,0,0.15)] z-10 ${
          !isOpen && "items-center"
        } bg-white text-[#4c4c4c] transition-all duration-300 ${
          isOpen ? "w-64" : "w-18"
        } flex flex-col p-1`}
      >
        {/* Botão de toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="absolute top-8 bg-white shadow-[4px_4px_10px_rgba(0,0,0,0.15)] -right-9 p-2 hover:cursor-pointer transition-all"
        >
          <Image
            src="/icons/swipe_icon.png"
            alt="Toggle Sidebar"
            width={20}
            height={20}
            className={`${!isOpen && "rotate-180"}`}
          />
        </button>

        {/* Links */}
        <nav className={`flex flex-col gap-3 mt-6 ${isOpen && "p-4"}`}>
          {isOpen ? (
            <div className={`flex flex-col items-center mb-4`}>
              <div className="w-40 h-40 flex items-end justify-end pr-2 pb-2 bg-[url('/images/pai.png')] bg-contain bg-no-repeat rounded-lg mb-4">
                <div className="w-10 h-10 bg-[url('/images/filha.png')] bg-contain bg-no-repeat rounded-full border-2 border-white"></div>
              </div>
              <span className="text-[#4c4c4c] font-bold">João Marcos</span>
              <span className="text-[#4c4c4c] text-[0.75rem]">You're a</span>
              <span className="font-bold bg-gradient-to-r from-[#d47489] to-[#7dc3ec] bg-clip-text text-transparent">
                SUPER PARENT
              </span>
            </div>
          ) : (
            <a
              href="#"
              className="flex items-center gap-3 p-1 rounded-md transition text-sm"
            >
              {
                <div className="w-10 h-10 flex items-end justify-end pr-2 pb-2 bg-[url('/images/pai.png')] bg-contain bg-no-repeat rounded-full mb-4">
                </div>
              }
            </a>
          )}
          <BtnNavbar icon="estatistica.png" text="Estatística" isNavbarOpen={isOpen} onClick={() => window.location.href = "/dashboard"} />
          <BtnNavbar icon="sino.png" text="Feedback" isNavbarOpen={isOpen} onClick={() => window.location.href = "/feedback"} />
          <BtnNavbar icon="perfil2.png" text="Perfil" isNavbarOpen={isOpen} onClick={() => window.location.href = "/perfil"} />
          <BtnNavbar icon="config.png" text="Configurações" isNavbarOpen={isOpen} onClick={() => window.location.href = "/configuracoes"} />
          {isOpen && <hr className="text-zinc-400 rounded-md my-3" />}
          <BtnNavbar icon="sair.png" text="Sair" isNavbarOpen={isOpen} onClick={() => window.location.href = "/"} />
        </nav>
      </aside>
    </div>
  );
}

export default function Navbar() {
  return (
    <NavBarUser />
  );
}
