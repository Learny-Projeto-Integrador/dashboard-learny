"use client";

import BarraXP from "@/components/BarraXP";
import BtnSelecionaFoto from "@/components/BtnSelecionaFoto";
import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import GradientSwitch from "@/components/GradientSwitch";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { useState } from "react";

const PerfilPai = () => {
  return (
    <div className="flex w-full h-screen items-center justify-center px-14 gap-3 overflow-hidden">
      <div className="flex flex-col w-1/3 gap-4">
        <div className={`flex items-center gap-4`}>
          <BtnSelecionaFoto type="edit" image="pai.png" />
          <div className="flex flex-col gap-1">
            <span className="font-bold text-2xl bg-gradient-to-r from-[#d47489] to-[#7dc3ec] bg-clip-text text-transparent">
              João Marcos
            </span>
            <span className="text-[#4c4c4c]">You're a</span>
            <span className="font-bold text-lg bg-gradient-to-r from-[#d47489] to-[#7dc3ec] bg-clip-text text-transparent">
              SUPER PARENT
            </span>
          </div>
        </div>

        <BarraXP />

        <div className="flex flex-col gap-3">
          <CustomInput label="Usuário" value="" />
          <CustomInput label="Senha" value="" />
          <CustomInput label="Email" value="" />
          <CustomInput label="Nome" value="" />
          <div className="flex justify-between gap-4">
            <CustomButton
              icon="lapis.png"
              text="Alterar Perfil"
              color="#FFB300"
            />
            <CustomButton text="Excluir Perfil" color="#D9D9D9" />
          </div>
        </div>
      </div>

      <div className="ml-32 w-96 h-96 flex bg-[url('/images/super-parent.png')] bg-contain bg-no-repeat" />
    </div>
  );
};

const SwitchRanking = () => {
  const [enabled, setEnabled] = useState(false);
  return (
    <div className="flex items-center w-full h-14 rounded-full bg-gradient-to-r from-[#8f6579] to-[#519ebf] shadow-sm p-1">
      <button
        className={`flex ${
          enabled ? "flex-row-reverse justify-start bg-transparent" : "bg-white"
        } items-center w-full h-12 rounded-full gap-4 transition-all duration-300 ease-in-out pr-1 hover:cursor-pointer`}
        onClick={() => setEnabled(!enabled)}
      >
        <div
          className={`${enabled ? "w-8 h-8 mb-1" : "w-14 h-14 ml-[-0.5vw] mb-[-0.5vh]"} bg-contain bg-no-repeat bg-center`}
          style={{
            backgroundImage: `url(/icons/${enabled ? "ranking.png" : "ranking-circulo.png"})`,
          }}
        />
        <div className="flex flex-col leading-tight">
          <span
            className={`text-xs ${enabled ? "text-white" : "text-gray-500"}`}
          >
            Rankeamento
          </span>
          <span
            className={`text-sm font-semibold ${
              enabled ? "text-white" : "text-gray-800"
            }`}
          >
            {enabled ? "Habilitado" : "Desabilitado"}
          </span>
        </div>
      </button>
    </div>
  );
};

const PerfilCrianca = () => {
  return (
    <div className="flex w-full h-screen items-center justify-center px-14 gap-24 overflow-hidden">
      <div className="flex flex-col w-1/3 gap-4">
        <div className={`flex items-center gap-4`}>
          <BtnSelecionaFoto type="edit" image="filha.png" />
          <div className="flex flex-col gap-1">
            <span className="font-bold text-2xl bg-gradient-to-r from-[#d47489] to-[#7dc3ec] bg-clip-text text-transparent">
              Joana Martins
            </span>
            <span className="font-bold text-[#4c4c4c]">Lvl. 100</span>
          </div>
        </div>

        <BarraXP />

        <div className="flex flex-col gap-3">
          <CustomInput label="Usuário" value="" />
          <CustomInput label="Senha" value="" />
          <CustomInput label="Nome" value="" />
          <div className="flex justify-between gap-4">
            <div className="w-3/5">
              <CustomButton
                icon="confirmar.png"
                text="Confirmar"
                color="#80D25B"
              />
            </div>
            <div className="w-2/5">
              <CustomButton
                icon="cancelar.png"
                text="Cancelar"
                color="#C92939"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col w-2/5 items-center">
        <div className="w-2/3">
          <SwitchRanking />
        </div>
        <div className="flex flex-col w-full rounded-2xl px-6 py-12 mt-12 gap-4 items-center justify-center bg-white shadow-[0_0_6px_rgba(150,150,150,0.6)]">
          <div className="flex w-4/5 gap-4 items-center mb-6">
            <div className="w-10 h-10 bg-[url('/icons/acessibilidade.png')] bg-contain bg-no-repeat"/>
            <span className="font-bold bg-gradient-to-r from-[#8f6579] to-[#519ebf] bg-clip-text text-transparent">Acessibilidade</span>
          </div>
          <div className="flex w-4/5 flex-col gap-6">
            <div className="flex w-full items-center justify-between">
              <span className="font-medium text-zinc-400">
                Desativar áudio
              </span>
              <GradientSwitch />
            </div>

            <div className="flex w-full items-center justify-between">
              <span className="font-medium text-zinc-400">Mudar cores</span>
              <GradientSwitch />
            </div>

            <div className="flex w-full items-center justify-between">
              <span className="font-medium text-zinc-400">
                Retirar animações
              </span>
              <GradientSwitch />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Perfil() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Navbar />

      {/* Logo */}
      <Image
        src="/images/logo-com-contorno.png"
        alt="Criança"
        width={60}
        height={60}
        className="absolute right-14 top-6"
      />

      <main className="flex-1 flex flex-col bg-white py-6 text-zinc-800 font-montserrat">
        <PerfilCrianca />
      </main>
    </div>
  );
}
