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
import { NavBarLink } from "@/components/Menu/style";
import { useAmbienteHandlers } from "@/hooks/useAmbienteHandlers";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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

  const {
    pesquisa,
    setPesquisa,
    handleKeyDown,
    handlePesquisar,
    renderDiasDisponiveis,
    ambientesFiltradosMemo,
  } = useAmbienteHandlers();

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

          <section>
            <div className="opcoesAmbiente">
              <div className="row m-0">
                <div className="col flex">
                  {/* Pesquisa por ambiente */}
                  <input
                    type="text"
                    placeholder="Pesquisar"
                    value={pesquisa}
                    onChange={(e) => setPesquisa(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="pesquisaInput"
                  />
                  <button
                    className="pesquisaBtn btn btn-primary"
                    onClick={handlePesquisar}
                  >
                    Pesquisar
                  </button>
                </div>

                <div className="col-sm-12 col-md-6 block text-end text-sm-center">
                  {/* Enviando para página reservas */}
                  <NavBarLink href={"/reservas"} className="float-end">
                    <button type="button" className="btn btn-success p-2">
                      Faça a sua reserva!
                    </button>
                  </NavBarLink>

                  <Dialog>
                    <DialogTrigger className="btn bg-transparent border p-2 w-15 float-end mr-2">Ajuda</DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Ajuda:</DialogTitle>
                        <DialogDescription> <strong>Pesquisa: </strong>
                          Ao fazer uma busca todos as informações do ambiente serão puxadas, podendo assim escrever: TV, Sabado, tipo, que será mostrado o ambiente que deseja.
                        </DialogDescription>
                        <DialogDescription> <strong>Ambientes: </strong>
                          Os ambientes estão compactados e  organizados em ordem alfabética, clique no ambiente que deseja para mostrar detalhes do mesmo.
                        </DialogDescription>
                        <DialogDescription> <strong>Reservas: </strong>
                          Caso queira fazer sua reserva, clique no botão verde ao lado escrito "Faça a sua reserva!", ou vá pelo menu do lado esquerdo
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>

                  
                </div>
              </div>
            </div>

            {/* ambiente */}
            {ambientesFiltradosMemo.map((ambiente) => (
              <div key={ambiente.id} className="ambiente">
                <button
                  className="botaoAmbiente"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#ambiente${ambiente.id}`}
                  aria-expanded="false"
                  aria-controls={`ambiente${ambiente.id}`}
                >
                  <h2>{ambiente.nome}</h2>
                  <span className="arrow">
                    <ChevronDown />
                  </span>
                </button>

                <div className="collapse" id={"ambiente" + ambiente.id}>
                  <div className="card card-body">
                    <div className="row">
                      <div className="col">
                        <span>Disponibilidade:</span>
                        <p>{ambiente.status}</p>
                        <span>Tipo de ambiente:</span>
                        <p>{ambiente.tipo}</p>
                        <span>Dias das semana disponíveis:</span>
                        <p>{renderDiasDisponiveis(ambiente.diasDisponiveis)}</p>
                        <span>Dias das semana indisponiveis:</span>
                        <p>
                          {renderDiasDisponiveis(ambiente.diasIndisponiveis)}
                        </p>
                      </div>
                      <div className="col">
                        <span>Capacidade:</span>
                        <p>{ambiente.capacidade}</p>
                        <span>Equipamentos:</span>
                        <p>{ambiente.equipamentos}</p>
                        <span>Localidade:</span>
                        <p>{ambiente.localizacao}</p>
                        <span>Horário:</span>
                        <p>{ambiente.turno}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </section>

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
        </main>
      </SidebarProvider>
    </div>
  );
}
