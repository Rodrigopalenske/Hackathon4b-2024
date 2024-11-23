"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IAmbiente } from "@/interfaces/ambiente";
import axios from "axios";
import { ChevronDown } from "lucide-react";
import AlertSuccess from "@/components/Notificacao/AlertSuccess";
import AlertError from "@/components/Notificacao/AlertError";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Sidebar } from "@/components/Menu/Sidebar";
import Header from "@/components/Menu/Header";

interface IReqAmbiente {
  data: Array<IAmbiente>;
}
export default function Dashboard() {
  const router = useRouter();
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications] = useState([
    { id: 1, message: "Bem-vindo à plataforma!" },
    { id: 2, message: "Atualização do sistema disponível." },
    { id: 3, message: "Novo recurso de segurança ativado." },
  ]);

  // Simulação de autenticação (substitua com a lógica real)
  const isAuthenticated =
    typeof window !== "undefined" && localStorage.getItem("auth_token");

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/"); // Redireciona para login se não estiver autenticado
    }
  }, [isAuthenticated, router]);

  // Requisição da API para guardar os produtos e inseri-los
  // const {data}: IAmbiente = await axios.get()

  return (
    <div>
      <SidebarProvider>
        <div className="hidden md:flex min-w-[300px] border-r min-h-screen">
          <Sidebar />
        </div>
        <main className="grid w-full h-full">
          <Header />

          <h1 className="titulo text">
            Ambientes disponíveis e suas informações
          </h1>
          <hr className="linha" />
          <section className="ambientes">
            {/* {
          data.map((ambiente) => (
            <Ambiente 
              key={ambiente.id}
              id={ambiente.id}
              nome={ambiente.nome}
              capacidade={ambiente.capacidade}
              tipo={ambiente.tipo}
              localizacao={ambiente.localizacao}
              disponibilidade={ambiente.disponibilidade}
            />
          ))
        } */}

            {/* Exemplos descartável */}
            <div className="ambiente">
              <button
                className="botaoAmbiente"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#ambiente1"
                aria-expanded="false"
                aria-controls="ambiente1"
              >
                <h2>Auditório</h2>
                <span className="arrow">
                  <ChevronDown />
                </span>
              </button>
              <div className="collapse" id="ambiente1">
                <div className="card card-body">
                  <div className="row">
                    <div className="col">
                      <span>Disponibilidade:</span>
                      <p>Lorem ipsum dolor sit amet</p>
                      <span>Tipo de ambiente:</span>
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Assumenda aliquid
                      </p>
                      <span>Dias das semana disponíveis:</span>
                      <p>Lorem ipsum dolor sit amet consectetur</p>
                      <span>Dias das semana indisponiveis:</span>
                      <p>Lorem ipsum dolor sit amet consectetur</p>
                      <span>Capacidade:</span>
                      <p>Lorem ipsum dolor sit amet consectetur</p>
                    </div>
                    <div className="col">
                      <span>Equipamentos:</span>
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Assumenda aliquid architecto rem
                      </p>
                      <span>Localidade:</span>
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda aliquid architecto rem dolor excepturi veritatis autem
                      </p>
                      <span>Horário:</span>
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda 
                      </p>
                      <span>Ambientes disponíveis:</span>
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda 
                      </p>
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Exemplos descartável */}
            <div className="ambiente">
              <button
                className="botaoAmbiente"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#ambiente2"
                aria-expanded="false"
                aria-controls="ambiente2"
              >
                <h2>AlphaLab</h2>
                <span className="arrow">
                  <ChevronDown />
                </span>
              </button>
              <div className="collapse" id="ambiente2">
                <div className="card card-body">
                  <div className="row">
                    <div className="col">
                      <span>Disponibilidade:</span>
                      <p>Lorem ipsum dolor sit amet</p>
                      <span>Tipo de ambiente:</span>
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Assumenda aliquid
                      </p>
                      <span>Dias das semana disponíveis:</span>
                      <p>Lorem ipsum dolor sit amet consectetur</p>
                      <span>Dias das semana indisponiveis:</span>
                      <p>Lorem ipsum dolor sit amet consectetur</p>
                      <span>Capacidade:</span>
                      <p>Lorem ipsum dolor sit amet consectetur</p>
                    </div>
                    <div className="col">
                      <span>Equipamentos:</span>
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Assumenda aliquid architecto rem
                      </p>
                      <span>Localidade:</span>
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda aliquid architecto rem dolor excepturi veritatis autem
                      </p>
                      <span>Horário:</span>
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda 
                      </p>
                      <span>Ambientes disponíveis:</span>
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda 
                      </p>
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </SidebarProvider>
    </div>
  );
}
