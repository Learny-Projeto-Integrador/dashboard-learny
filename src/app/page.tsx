import CustomInput from "@/components/CustomInput";
import Navbar from "@/components/Navbar";
import Image from "next/image";

export default function Home() {
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

      <main className="flex-1 flex flex-col bg-white text-zinc-800">
        <div className="flex flex-col flex-1 py-6 px-14 gap-4 overflow-hidden">
          {/* Boas-vindas */}
          <div className="flex relative flex-col justify-center w-full h-36 px-12 gap-2 bg-[url('/images/fundo-crianca.png')] rounded-md text-white flex-shrink-0">
            <span className="font-bold text-3xl">Learny</span>
            <span>
              Facilitando o processo de aprendizagem para crianças <br />
              diagnosticadas com transtorno do espectro autista
            </span>
          </div>

          {/* Login */}
          <div className="flex-1 flex bg-[url('/images/fundo-gradiente-login.png')] justify-between items-center p-8 gap-2 rounded-md text-white overflow-hidden">
            <div className="flex flex-col items-center justify-center w-[45%] h-full bg-[rgba(255,255,255,0.3)] rounded-md">
              <Image
                src="/images/logo-grande.png"
                alt="Logo"
                width={150}
                height={150}
                className="mb-4"
              />
              <span className="text-2xl">Entre em sua conta Learny</span>
              <span className="text-3xl font-bold">LEARNY</span>
            </div>

            <div className="flex flex-col items-center justify-center px-30 pt-18 gap-2 w-[55%] h-full rounded-md p-8">
              <span className="text-3xl font-bold mb-8">LOGIN</span>
              <CustomInput label="Usuário" value="" transparent />

              <CustomInput label="Senha" value="" transparent />

              <button
                type="submit"
                className={`bg-white rounded-md w-full p-2 h-14 mb-6 hover:cursor-pointer`}
              >
                <h1 className="font-black bg-gradient-to-r from-[#519ebf] to-[#9c5869] bg-clip-text text-transparent">
                  Entrar
                </h1>
              </button>

              <div className="flex w-full justify-center gap-8 text-md">
                <span>Sem uma conta?</span>
                <a className="underline cursor-pointer" href="/cadastro">
                  Cadastre-se
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
