"use client";

import Header from "@/components/Menu/Header";
import { Sidebar } from "@/components/Menu/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useAmbienteHandlers } from "../../../hooks/useAmbienteHandlers";
import "../ambiente.css";
import { NavBarLink } from "@/components/Menu/style";
import axios from "axios";
import { useEffect, useState } from "react"
import { IAmbiente } from "@/interfaces/ambiente";


export default function Ambientes({ params }: { params: { id: string } }) {
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
    setStatus,
    handleSubmit,
    diasDisponiveis,
    erro,
    handleDiaChange,
  } = useAmbienteHandlers();

  // Armazena a lista de produtos
  // const [ambiente, setAmbiente] = useState<Array<IAmbiente>>([])

  // useEffect(() => {
  //   // Busca ambiente pelo ID da categoria da URL
  //   axios.get(process.env.NEXT_PUBLIC_API_URL + "/ambiente/",
  //   {
  //       params: { id: params.id}
  //   })
  //       .then((res) => {
  //           // Atualiza o array produtos na resposta
  //           setAmbiente(res.data)
  //       })
  //       .catch((err) => {
  //           console.error("Erro ao buscar ambiente:", err)
  //       })
  // }, [params.id])


  return (
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

          <h1 className="titulo">Editando ambiente</h1>
          <hr className="linha" />

          <section>
            <div className="container">
              <div className="cardAmbiente">
                <form className="formulario" onSubmit={handleSubmit}>
                  <input
                    className="input"
                    type="text"
                    placeholder="Nome do Ambiente"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                  />
                  <input
                    className="input"
                    type="text"
                    placeholder="Capacidade"
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
                    Salvar Ambiente
                  </button>

                  {erro && <p className="erro">{erro}</p>}
                </form>
              </div>
            </div>
          </section>
        </main>
      </SidebarProvider>
    </div>
  );
}
