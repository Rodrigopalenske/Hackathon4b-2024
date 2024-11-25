"use client";
import { SidebarProvider } from "@/components/ui/sidebar";
import "./ambiente.css";
import { useState, useEffect, useMemo } from "react";
import { Sidebar } from "@/components/Menu/Sidebar";
import Header from "@/components/Menu/Header";
import { ChevronDown, Plus } from "lucide-react";
import { NavBarLink } from "@/components/Menu/style";
import PrivateRoute from "@/components/PrivateRoute";
import { useAmbienteHandlers } from "../../hooks/useAmbienteHandlers";
import api from "@/utils/api";
import { error } from "console";

export default function Ambientes() {
  const [ambientes, setAmbientes] = useState([])
  const {
    nome,
    setNome,
    capacidade,
    setCapacidade,
    equipamentos,
    setEquipamentos,
    pesquisa,
    setPesquisa,
    handleKeyDown,
    handlePesquisar,
    handleSubmit,
    handleEditar,
    handleExcluir,
    setAmbienteExcluir,
    setShowModal,
    showModal,
    renderDiasDisponiveis,
    ambientesFiltradosMemo,
  } = useAmbienteHandlers();

   //$diaIndisponivelResponse = Http::get(route('diaIndisponivel.index', $ambiente['id']));
   //$diaHorarioDisponivelResponse = Http::get(route('diaHorarioDisponivel.index', $ambiente['id']));
   type Ambientes = {
    id: number; // ID único do histórico
    nome: string;
    capacidade: number; 
    tipo: string; 
    equipamentos: string;
    localizacao: string;
    status: string;
  };
  type DiasIndisponiveis = {
    id: number;
    ambiente_id: number;
    data: string; 
  };
  const coletaAmbiente = () => {
    api.get('/ambiente')
    .then((resposta) => {
      console.log(resposta.data.ambiente['id'])
      resposta.data.ambiente.forEach((element:DiasIndisponiveis) => {
        api.get('/ambiente')
        .then
      });
      /* //api.post('/notificacao',{
        'ambiente_id': resposta.data.ambiente['id'],
        'mensagem':'oi',
        'tipo':'ambiente',
      }); */
    })
    .catch((error) => {
      error.data
      console.log(error)
    })
  };

  useEffect(() => {
    coletaAmbiente()
  }, []);

  return (
    <PrivateRoute requiredPermissions={["admin"]}>
      <div>
        <SidebarProvider>
          <div className="hidden md:flex min-w-[300px] border-r min-h-screen">
            <Sidebar />
          </div>
          <main className="grid w-full h-full">
            <Header />
            <h1 className="titulo">Gerenciamento de Ambientes</h1>
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
                    {/* Adicionar novo ambiente */}
                    <NavBarLink
                      href={"/ambiente/adicionar"}
                      className="botaoAdicionar"
                    >
                      <button
                        className="btn btn-success p-2 float-end"
                        onClick={handlePesquisar}
                      >
                        Adicionar ambiente
                      </button>
                    </NavBarLink>
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
                    <div className="row">
                      <div className="col">
                        <button
                          className="botaoExcluir btn float-end"
                          onClick={() => {
                            setAmbienteExcluir(ambiente);
                            setShowModal(true);
                          }}
                        >
                          Excluir
                        </button>
                        <NavBarLink href={"/ambiente/editar"}>
                          <button
                            className="botaoEditar btn float-end"
                            onClick={() => handleEditar(ambiente)}
                          >
                            Editar
                          </button>
                        </NavBarLink>
                      </div>
                    </div>
                    <div className="card card-body">
                      <div className="row">
                        <div className="col">
                          <span>Disponibilidade:</span>
                          <p>{ambiente.status}</p>
                          <span>Tipo de ambiente:</span>
                          <p>{ambiente.tipo}</p>
                          <span>Dias das semana disponíveis:</span>
                          <p>
                            {renderDiasDisponiveis(ambiente.diasDisponiveis)}
                          </p>
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
                          <span>Horários:</span>
                          <p>{ambiente.turno}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Modal para exclusão */}
              {showModal && (
                <div className="modal">
                  <div className="modalConteudo">
                    <h4>Tem certeza de que deseja excluir este ambiente?</h4>
                    <button
                      className="btn btn-primary m-1"
                      onClick={() => setShowModal(false)}
                    >
                      Cancelar
                    </button>
                    <button
                      className="btn btn-danger m-1"
                      onClick={handleExcluir}
                    >
                      Sim, Excluir
                    </button>
                  </div>
                </div>
              )}
            </section>
          </main>
        </SidebarProvider>
      </div>
    </PrivateRoute>
  );
}
