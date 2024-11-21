"use client";

import { BellIcon, LogOut, User } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { NavBarLink } from "./style";

export default function Header() {
  // Mensagem que apareceram nas notificações
  const [notificacoes, setNotificacoes] = useState<any>([
    {
      text: "Mensagem 1: Lorem ipsum dolor sit amet consectetur.",
      date: "02/01/2015",
      read: true,
    },
    {
      text: "Mensagem 2: Lorem ipsum dolor sit amet consectetur.",
      date: "02/01/2015",
      read: false,
    },
    {
      text: "Mensagem 3: Lorem ipsum dolor sit amet consectetur.",
      date: "02/01/2015",
      read: true,
    },
    {
      text: "Mensagem 4: Lorem ipsum dolor sit amet consectetur.",
      date: "02/01/2015",
      read: false,
    },
    {
      text: "Mensagem 5: Lorem ipsum dolor sit amet consectetur.",
      date: "02/01/2015",
      read: true,
    },
    {
      text: "Mensagem 6: Lorem ipsum dolor sit amet consectetur.",
      date: "02/01/2015",
      read: true,
    },
    {
      text: "Mensagem 7: Lorem ipsum dolor sit amet consectetur.",
      date: "02/01/2015",
      read: false,
    },
  ]);

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
                  <p className="text-sm">{item.text}</p>
                  <p className="text-xs text-gray-500">
                    {item.date}
                    <span
                      className={`pl-5 font-bold text-xs ${
                        item.read ? "text-green-500" : "text-gray-500"
                      }`}
                    >
                      {item.read ? "Lido" : "Não lido"}
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
            <DropdownMenuItem className="w-100 d-inline-block text-center">Usuario</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="itemMenuHeader">
              <NavBarLink href={'/logout'} className="botaoNav">
                <LogOut className="mr-2 w-4 h-4 align-items-center text-center"/>
                Sair
              </NavBarLink>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
