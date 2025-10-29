"use client";

import BarraXP from "@/components/BarraXP";
import BtnSelecionaFoto from "@/components/BtnSelecionaFoto";
import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import GradientSwitch from "@/components/GradientSwitch";
import Navbar from "@/components/Navbar";
import { useCustomAlert } from "@/contexts/AlertContext";
import { useUser } from "@/contexts/UserContext";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";

export default function Perfil() {
  const { user, logout } = useUser();
  const { showAlert } = useCustomAlert();
  const [foto, setFoto] = useState("");
  const [nomePerfil, setNomePerfil] = useState("");
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [selectedInput, setSelectedInput] = useState<string | null>(null);
  const [modalAberto, setModalAberto] = useState(false);
  const [editando, setEditando] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleEdit = async () => {
    if (!usuario || !nome || !email) {
      showAlert({
        icon:"/icons/erro.png",
        title: "Erro ao editar!",
        message: "Por favor, preencha todos os campos obrigatórios.",
      })
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`/api/pais`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          foto: foto.trim(),
          usuario: usuario.trim(),
          senha: senha.trim(),
          email: email.trim(),
          nome: nome.trim(),
        }),
      });

      const data = await res.json();

      if (res.ok) {
        showAlert({
          icon: "/icons/sucesso.png",
          title: "Usuário cadastrado com sucesso!",
          message:
            "Cadastro realizado com sucesso. Faça o login usufrua do aplicativo!",
        });
      } else {
        showAlert({
          icon: "/icons/erro.png",
          title: "Erro ao editar usuário!",
          message:
            data.error ||
            "Ocorreu um erro ao editar o usuário. Verifique se os dados estão preenchidos corretamente",
        });
      }
    } catch (error) {
      console.error(error);
      showAlert({
        icon: "/icons/erro.png",
        title: "Erro ao cadastrar usuário!",
        message: "Ocorreu um erro interno no servidor",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);

    try {
      const res = await fetch(`/api/pais`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (res.status === 204 || res.status === 200) {
        showAlert({
          icon: "/icons/sucesso.png",
          title: "Conta excluida com sucesso",
          message: "Sua conta foi excluida. Retornando a tela inicial",
        });
        logout();
        return;
      } else {
        showAlert({
          icon: "/icons/erro.png",
          title: "Erro ao editar usuário!",
          message: "Ocorreu um erro ao excluir a sua conta. Aguarde e tente novamente",
        });
      }
    } catch (error) {
      console.error(error);
      showAlert({
        icon: "/icons/erro.png",
        title: "Erro ao excluir usuário!",
        message: "Ocorreu um erro interno no servidor",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      setFoto(user.foto);
      setNomePerfil(user.nome);
      setUsuario(user.usuario);
      setNome(user.nome);
      setEmail(user.email);
    }
  }, [user]);

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
        <div className="flex w-full h-screen items-center justify-center px-14 gap-3 overflow-hidden">
          <div className="flex flex-col w-1/3 gap-4">
            <div className={`flex relative items-center gap-4`}>
              <BtnSelecionaFoto
                type="edit"
                image={foto}
                onChange={(novaImagem: any) => setFoto(novaImagem)}
              />
              <div className="flex flex-col gap-1">
                <span className="font-bold text-2xl bg-gradient-to-r from-[#d47489] to-[#7dc3ec] bg-clip-text text-transparent">
                  {nomePerfil}
                </span>
                <span className="text-[#4c4c4c]">You're a</span>
                <span className="font-bold text-lg bg-gradient-to-r from-[#d47489] to-[#7dc3ec] bg-clip-text text-transparent">
                  SUPER PARENT
                </span>
              </div>
              {modalAberto ? (
                <div
                  className="flex flex-col absolute right-0 top-0 items-end w-[55%] py-2 px-3 gap-2 bg-white shadow-[0_0_4px_rgba(150,150,150,0.3)]"
                  onClick={() => setModalAberto(!modalAberto)}
                >
                  <IoMdClose
                    size={30}
                    className="text-[#4c4c4c] hover:cursor-pointer rounded-lg hover:bg-[#ededed]"
                  />
                  <CustomButton
                    text="Excluir Perfil"
                    color="#4c4c4c"
                    onClick={handleDelete}
                  />
                </div>
              ) : (
                <div
                  className=" absolute right-0 top-0 py-2 px-3"
                  onClick={() => setModalAberto(!modalAberto)}
                >
                  <BsThreeDots
                    size={30}
                    color="#4c4c4c"
                    className="hover:cursor-pointer"
                  />
                </div>
              )}
            </div>

            <BarraXP />

            <div className="flex flex-col gap-3">
              <CustomInput
                label="Usuário"
                value={usuario || ""}
                onChange={(e) => setUsuario(e.target.value)}
                disabled={!editando}
                selected={selectedInput === "usuario"}
                onClick={() => setSelectedInput("usuario")}
              />

              <CustomInput
                label="Senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                disabled={!editando}
                selected={selectedInput === "senha"}
                onClick={() => setSelectedInput("senha")}
              />

              <CustomInput
                label="Email"
                value={email || ""}
                onChange={(e) => setEmail(e.target.value)}
                disabled={!editando}
                selected={selectedInput === "email"}
                onClick={() => setSelectedInput("email")}
              />

              <CustomInput
                label="Nome"
                value={nome || ""}
                onChange={(e) => setNome(e.target.value)}
                disabled={!editando}
                selected={selectedInput === "nome"}
                onClick={() => setSelectedInput("nome")}
              />
              <div className="flex">
                {!editando ? (
                  <CustomButton
                    icon="lapis.png"
                    text="Alterar Perfil"
                    color="#FFB300"
                    onClick={() => setEditando(!editando)}
                  />
                ) : (
                  <div className="w-full flex justify-between gap-4">
                    <CustomButton
                      icon="confirmar.png"
                      text="Confirmar"
                      color="#80D25B"
                      onClick={() => {
                        handleEdit();
                      }}
                    />
                    <CustomButton
                      icon="cancelar.png"
                      text="Cancelar"
                      color="#C92939"
                      onClick={() => {
                        setEditando(!editando);
                        setSelectedInput("");
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="ml-32 w-96 h-96 flex bg-[url('/images/super-parent.png')] bg-contain bg-no-repeat" />
        </div>
      </main>
    </div>
  );
}
