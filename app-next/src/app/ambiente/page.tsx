"use client";
import { SidebarProvider } from "@/components/ui/sidebar";
import "./ambiente.css";
import { useState, useEffect, useMemo } from "react";
import { Sidebar } from "@/components/Menu/Sidebar";
import Header from "@/components/Menu/Header";
import { ChevronDown, Plus } from "lucide-react";
import { NavBarLink } from "@/components/Menu/style";
import { useAmbienteHandlers } from "../../hooks/useAmbienteHandlers";

export default function Ambientes() {
  
  
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

  return (
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
            <div className="inline-block pl-3 w-100 align-item-center">
              {/* Pesquisa por ambiente */}
              <input
                type="text"
                placeholder="Pesquisar"
                value={pesquisa}
                onChange={(e) => setPesquisa(e.target.value)}
                onKeyDown={handleKeyDown}
                className="pesquisaInput w-100"
              />
              <button className="pesquisaBtn btn btn-primary" onClick={handlePesquisar}>
                Pesquisar
              </button>

              {/* Adicionar novo ambiente */}
              <NavBarLink href={"/ambiente/adicionar"}className="botaoAdicionar">
              <button
                className="btn btn-success float-end mr-3"
                onClick={handlePesquisar}
              >
                  Adicionar ambiente
              </button>
                </NavBarLink>
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
                      <NavBarLink href={'/ambiente/editar'}>
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
                        <p>Lorem ipsum dolor sit amet consectetur</p>
                        <span>Dias das semana indisponiveis:</span>
                        <p>Lorem ipsum dolor sit amet consectetur</p>
                        <span>Capacidade:</span>
                        <p>{ambiente.capacidade}</p>
                      </div>
                      <div className="col">
                        <span>Equipamentos:</span>
                        <p>{ambiente.equipamentos}</p>
                        <span>Localidade:</span>
                        <p>{ambiente.localizacao}</p>
                        <span>Horário:</span>
                        <p>{ambiente.turno}</p>
                        <span>Ambientes disponíveis</span>
                        <p>{renderDiasDisponiveis(ambiente.diasDisponiveis)}</p>
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
                  <button className="btn btn-primary m-1" onClick={() => setShowModal(false)}>
                    Cancelar
                  </button>
                  <button className="btn btn-danger m-1" onClick={handleExcluir}>
                    Sim, Excluir
                  </button>
                </div>
              </div>
            )}
          </section>
        </main>
      </SidebarProvider>
    </div>
  );
}
