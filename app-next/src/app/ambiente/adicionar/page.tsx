"use client";

import Header from "@/components/Menu/Header";
import { Sidebar } from "@/components/Menu/Sidebar";
import PrivateRoute from "@/components/PrivateRoute";
import { SidebarProvider } from "@/components/ui/sidebar";
import "../ambiente.css";
import { useAmbienteHandlers } from "../../../hooks/useAmbienteHandlers";
import { NavBarLink } from "@/components/Menu/style";
import { useState } from "react";

export default function Ambientes() {
  const {
    nome,
    setNome,
    capacidade,
    setCapacidade,
    equipamentos,
    setEquipamentos,
    localizacao,
    setLocalizacao,
    turno,
    setTurno,
    tipo,
    setTipo,
    status,
    setStatus,
    handleSubmit,
    diasDisponiveis,
    erro,
    handleDiaChange,
  } = useAmbienteHandlers();

  const [mensagem, setMensagem] = useState<string | null>(null);

  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    const sucesso = await handleSubmit(e);
    if (sucesso) {
      setMensagem("Ambiente cadastrado com sucesso!");
    } else {
      setMensagem("Ocorreu um erro. Verifique os campos e tente novamente.");
    }
    setTimeout(() => setMensagem(null), 3000); // Limpa a mensagem após 3 segundos
  };

  return (
    <PrivateRoute requiredPermissions={["admin"]}>
      <div>
        <SidebarProvider>
          <div className="hidden md:flex min-w-[300px] border-r min-h-screen">
            <Sidebar />
          </div>
          <main className="grid w-full h-full">
            <Header />

            <div>
              <NavBarLink href={"/ambiente"} className="botaoVoltar">
                <button type="button" className="btn btn-danger w-20 m-4">
                  Voltar
                </button>
              </NavBarLink>
            </div>

            <h1 className="titulo">Adicionando ambiente</h1>
            <hr className="linha" />

            <section>
              <div className="container">
                <div className="cardAmbiente">
                  <form className="formulario" onSubmit={onSubmitHandler}>
                    <input
                      className="input"
                      type="text"
                      placeholder="Nome do Ambiente"
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                    />
                    <input
                      className="input"
                      type="number"
                      placeholder="Capacidade"
                      min={"5"}
                      value={capacidade}
                      onChange={(e) => setCapacidade(e.target.value)}
                    />
                    <input
                      className="input"
                      type="text"
                      placeholder="Equipamentos"
                      value={equipamentos}
                      onChange={(e) => setEquipamentos(e.target.value)}
                    />
                    <input
                      className="input"
                      type="text"
                      placeholder="Localização"
                      value={localizacao}
                      onChange={(e) => setLocalizacao(e.target.value)}
                    />

                    <div className="row">
                      <div className="col-4">
                        <select
                          className="form-select"
                          id="turno"
                          value={turno}
                          onChange={(e) => setTurno(e.target.value)}
                        >
                          <option value="" disabled>
                            Selecione o Turno
                          </option>
                          <option value="Manhã">Manhã</option>
                          <option value="Tarde">Tarde</option>
                          <option value="Noite">Noite</option>
                        </select>
                      </div>
                      <div className="col-4">
                        <select
                          className="form-select"
                          value={tipo}
                          onChange={(e) => setTipo(e.target.value)}
                        >
                          <option value="" disabled>
                            Selecione o Tipo
                          </option>
                          <option value="Sala">Sala</option>
                          <option value="Auditório">Auditório</option>
                          <option value="Escritório">Escritório</option>
                        </select>
                      </div>

                      <div className="col-4">
                        <select
                          className="form-select"
                          value={status}
                          onChange={(e) => setStatus(e.target.value)}
                        >
                          <option value="" disabled>
                            Disponibilidade
                          </option>
                          <option value="Disponível">Disponível</option>
                          <option value="Indisponível">Indisponível</option>
                          <option value="Em manutenção">Em manutenção</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <p>Selecione os dias da semana:</p>
                      <div className="row row-cols-7 row-cols-md-7 g-2 text-center">
                        {[
                          "segunda",
                          "terça",
                          "quarta",
                          "quinta",
                          "sexta",
                          "sábado",
                          "domingo",
                        ].map((dia) => (
                          <div key={dia} className="col">
                            <div className="d-flex align-items-center">
                              <input
                                id={`dia-${dia}`}
                                type="checkbox"
                                checked={diasDisponiveis.includes(dia)}
                                onChange={() => handleDiaChange(dia)}
                                className="me-2"
                              />
                              <label htmlFor={`dia-${dia}`}>
                                {dia.charAt(0).toUpperCase() + dia.slice(1)}
                              </label>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button type="submit" className="btn btn-success">
                      Cadastrar Ambiente
                    </button>

                    {mensagem && (
                      <div
                        className={`alert ${
                          erro ? "alert-danger" : "alert-success"
                        }`}
                      >
                        {mensagem}
                      </div>
                    )}
                  </form>
                </div>
              </div>
            </section>
          </main>
        </SidebarProvider>
      </div>
    </PrivateRoute>
  );
}
