"use client"

import CustomInput from "@/components/CustomInput";
import NavbarLogin from "@/components/NavbarLogin";
import Image from "next/image";
import { useState } from "react";
import Cookies from "js-cookie";
import { useUser } from "@/contexts/UserContext";
import { useRouter } from 'next/navigation'
import { useCustomAlert } from "@/contexts/AlertContext";
import { useChild } from "@/contexts/ChildContext";

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

export default function Home() {
  const router = useRouter();
  const { showAlert } = useCustomAlert();
  const { child, setChild } = useChild();
  const { setUser } = useUser();
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [loading, setLoading] = useState(false);

  const carregarFilhoSelecionado = async () => {
    setLoading(true);

    try {
      const res = await fetch(`/api/filhoSelecionado`, {
        method: "GET",
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await res.json();

      if (res.ok) {
        setChild({
          foto: data.result.foto,
          usuario: data.result.usuario,
          nome: data.result.nome,
          pontos: data.result.pontos,
          fasesConcluidas: data.result.fasesConcluidas,
          medalhas: data.result.medalhas,
        });
      } else {
        showAlert({
          icon: "/icons/erro.png",
          title: "Erro ao buscar filho selelcionado!",
          message: data.error || "Ocorreu um erro ao buscar o filho selecionado",
        });
      }
    } catch (error) {
      console.error(error);
      showAlert({
        icon: "/icons/erro.png",
        title: "Erro ao carregar filhos!",
        message: "Ocorreu um erro interno no servidor",
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleLogin = async () => {
    if (!usuario || !senha) {
      showAlert({
        icon:"/icons/erro.png",
        title: "Erro ao fazer login!",
        message: "Por favor, preencha todos os campos obrigatórios.",
      })
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`/api/login`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          usuario: usuario.trim(),
          senha: senha.trim()
        }),
      });

      const data = await res.json();

      if (res.ok) {
        await Cookies.set("token", data.result.access_token);
        setUser({
          id: data.result.id,
          foto: data.result.foto,
          usuario: data.result.usuario,
          nome: data.result.nome,
          email: data.result.email,
          filhos: data.result.filhos,
          filhoSelecionado: data.result.filhoSelecionado,
          token: data.result.token,
        });
        router.push("/dashboard");
      } else {
        showAlert({
          icon: "/icons/erro.png",
          title: "Erro ao fazer login!",
          message: data.error || "Ocorreu um erro ao fazer o login. Verifique se o usuário e senha estão corretos",
        })
      }
    } catch (error) {
      console.error(error);
      showAlert({
          icon: "/icons/erro.png",
          title: "Erro ao fazer login!",
          message: "Ocorreu um erro interno no servidor",
        })
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <NavbarLogin />

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
              <form 
                className="flex flex-col w-full gap-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleLogin();
                }}
              >
                <CustomInput label="Usuário" value={usuario} onChange={(e) => setUsuario(e.target.value)} transparent />
                <CustomInput label="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} transparent isPassword />
                <button
                  type="submit"
                  className={`bg-white rounded-md w-full p-2 h-14 mb-6 hover:cursor-pointer`}
                >
                  {loading ? 
                    <LoadingComponent /> : 
                    (
                      <h1 className="font-black bg-gradient-to-r from-[#519ebf] to-[#9c5869] bg-clip-text text-transparent">
                        Entrar
                      </h1>
                    )
                  }
                </button>
              </form>


              <div className="flex w-full justify-center gap-8 text-md">
                <span>Sem uma conta?</span>
                <a className="underline cursor-pointer" onClick={() => router.push("/cadastro?tipo=pais")}>
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
