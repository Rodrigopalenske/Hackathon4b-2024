"use client";

import { BellIcon, KeyRound, LogOut, User } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { use, useEffect, useState } from "react";
import { NavBarLink } from "./style";
import api from "@/utils/api";
import { useRouter } from "next/navigation";

export default function Header() {

  // Mensagem que apareceram nas notificações
  const router = useRouter();
  const [usuario, setUsuario] = useState('');
  const [notificacoes, setNotificacoes] = useState<any>([{}]);

  useEffect(() => {
    api.get('/user')
    .then((response) => {
      setUsuario(response.data['name'])
    })
    .catch((errors) => {
      setUsuario('Usuário');
    },
  ]);
  useEffect(() => {
    api.get('/notificacao')
    .then((response) => {
      console.log(response.data.notificacoes)
      setNotificacoes(response.data.notificacoes);

    })
    .catch((error) => {
      console.log("Usuários não encontrados")
      console.log(error)
    })
  }, []);

  const handleLogout = async () => {
      const response = await api.post('/logout', {})
      .then((response) => {
        localStorage.clear()
        router.push('/')
      })
      .catch((error) => {
        console.log(error)
      })
  };
  // Header com botão de notificação e perfil
  return (
    <div className="grid gap-4 p-2 border-b relative header">
      {/* Sidebar Trigger */}
      {/* <SidebarTrigger className="w-10 h-10" /> */}

      {/* Pesquisa */}
      
      {/* Notificações e Perfil */}
      <div className="flex items-center justify-end relative z-50">
        {/* Notificações */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              className="w-36 m-1 relative botaoHeader"
              variant="outline"
              size="icon"
            >
              <BellIcon className="h-4 w-4" />
              Notificações
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="max-w-sm max-h-96 overflow-auto z-[9999] shadow-lg bg-white" align="end" 
          >
            <DropdownMenuLabel>Notificações</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="gap-2">
              {notificacoes.map((item: any, key: number) => (
                <DropdownMenuItem
                  key={key}
                  className="flex flex-col py-2 px-3 hover:bg-neutral-200 transition flex-items-start gap-2"
                >
                  <p className="text-sm">{item.mensagem}</p>
                  <p className="text-xs text-gray-500">
                    {item.data}
                    <span
                      className={`pl-5 font-bold text-xs ${
                        item.status ? "text-green-500" : "text-gray-500"
                      }`}
                    >
                      {item.status ? "Lido" : "Não lido"}
                    </span>
                  </p>
                </DropdownMenuItem>
              ))}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Perfil */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              className="w-20 p-3 m-1 relative botaoHeader"
              variant="outline"
              size="icon"
            >
              <User className="h-4 w-4" />
              Perfil
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="z-[9999] shadow-lg bg-white"
            align="end"
          >
            <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="w-100 d-inline-block text-center">{usuario}</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="itemMenuHeader">
              <NavBarLink href={'/senha'} className="botaoNavAltSenha">
                <KeyRound className="mr-2 w-4 h-4 align-items-center text-center"/>
                Alterar senha
              </NavBarLink>
            </DropdownMenuItem>
            <DropdownMenuItem className="itemMenuHeader">
              <button onClick={handleLogout} className="botaoNav">
                <LogOut className="mr-2 w-4 h-4 align-items-center text-center" />
                Sair
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
