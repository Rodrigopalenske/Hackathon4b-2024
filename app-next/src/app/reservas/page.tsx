'use client';

import { useState, useEffect } from "react";
import Calendar from "react-calendar"; 
import { Value } from "react-calendar/dist/esm/shared/types.js";
import "./reserva.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Sidebar } from "@/components/Menu/Sidebar";
import Header from "@/components/Menu/Header";
import { useRouter } from "next/navigation";
import api from "@/utils/api";
import PrivateRoute from "@/components/PrivateRoute";

export default function ReservasPage() {
  const [dataSelecionada, setDataSelecionada] = useState<Value>(null); 

  const [ambientes, setAmbientes] = useState<any[]>([
    {
      id: 1,
      nome: "Sala de Reuniões A",
      capacidade: "10",
      equipamentos: "Projetor, TV",
      turno: "Manhã",
      localizacao: "Bloco A",
      tipo: "Sala",
      status: "Disponível",
      diasDisponiveis: ["segunda", "quarta", "sexta"],
    },
  ]);

  const [ambientesDisponiveis, setAmbientesDisponiveis] = useState<any[]>([]);
  const [ambienteSelecionado, setAmbienteSelecionado] = useState<any | null>(null);
  const [formulario, setFormulario] = useState({
    ambienteId: "",
    data: "",
    horarioInicio: "",
    horarioFim: "",
  });
  const [isClient, setIsClient] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setAmbientesDisponiveis(ambientes);
  }, []);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Alteração no tipo de handleDiaSelecionado
  const handleDiaSelecionado = (value: Value) => { // Value do react-calendar
    setDataSelecionada(value); // Atualiza com o valor selecionado
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormulario((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "ambienteId") {
      const ambiente = ambientesDisponiveis.find((a) => a.id === parseInt(value));
      setAmbienteSelecionado(ambiente);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (ambienteSelecionado) {
      console.log( dataSelecionada, formulario.horarioInicio, formulario.horarioFim)
      await api.post('/reserva', {
        'ambiente_id': ambienteSelecionado,
        'data': dataSelecionada,
        'horario_inicio': formulario.horarioInicio,
        'horario_fim': formulario.horarioFim,
        'status': 1,
    })
    .then((response) => {
      api.post("/historico/reserva", {
        'reserva_id': response.data.reserva['id'],
        'alteracao': response.data.alteracao,
        'tipo': 'Confirmação de reserva',
      })
      console.log(resposta.data.reserva['id'])
      api.post('/notificacao',{
        'reserva_id': resposta.data.reserva['id'],
        'mensagem':'oi',
        'tipo':'reserva',
      });
      alert("Reserva criada com sucesso!");
    })
    .catch((error) => {
      console.log(error)
    })
    } else {
      alert("Preencha todos os campos");
    }

  };

  const handleHistoricoClick = () => {
    router.push("/reservas/historico-reservas");
  };

  const handleEditarReservasClick = () => {
    router.push("/reservas/editar-reservas");
  };

  return (
    <PrivateRoute requiredPermissions={['admin', 'professor']}>
      <div>
        <SidebarProvider>
          <div className="hidden md:flex min-w-[300px] border-r min-h-screen">
            <Sidebar />
          </div>
          <main className="grid w-full h-full">
            <Header />

            <div className="container">
              <h1 className="titulo">Reservar Ambiente</h1>
              <hr className="linha" />

              <div className="w-100">
                <button
                  className="btn btn-primary float-start p-3 w-22"
                  onClick={handleHistoricoClick}
                >
                  Histórico
                </button>

                <button
                  id="botaoEditarReservas"
                  className="btn btn-secondary float-end p-3 w-22"
                  onClick={handleEditarReservasClick}
                >
                  Editar Reservas
                </button>
              </div>


              {/* Calendário */}
              <div className="calendario-container">
                <div className="calendario">
                  {isClient && (
                    <Calendar
                      onChange={handleDiaSelecionado} 
                      value={dataSelecionada}
                      minDate={new Date()}
                      maxDate={new Date(new Date().setFullYear(new Date().getFullYear() + 1))}
                    />
                  )}
                </div>
              </div>

              {/* Exibir o formulário apenas se uma data for selecionada */}
              {dataSelecionada && (
                <div className="formulario-detalhes">
                  <div className="card formulario">
                    <h2>Formulário de Reserva</h2>

                    <form onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-12">
                          <label htmlFor="ambienteId">Ambiente:</label>
                          <select
                            id="ambienteId"
                            name="ambienteId"
                            className="input padronizado"
                            value={formulario.ambienteId}
                            onChange={handleChange}
                          >
                            <option disabled value="">Selecione um Ambiente</option>
                            {ambientesDisponiveis.map((ambiente) => (
                              <option key={ambiente.id} value={ambiente.id}>
                                {ambiente.nome}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-6">
                          <label htmlFor="horarioInicio">Horário inicio:</label>
                          <input
                            id="horarioInicio"
                            type="time"
                            name="horarioInicio"
                            className="input padronizado"
                            value={formulario.horarioInicio}
                            onChange={handleChange}
                            required
                            disabled={!formulario.ambienteId}
                          />
                        </div>

                        <div className="col-6">
                          <label htmlFor="horarioFim">Horário fim:</label>
                          <input
                            id="horarioFim"
                            type="time"
                            name="horarioFim"
                            className="input padronizado"
                            value={formulario.horarioFim}
                            onChange={handleChange}
                            required
                            disabled={!formulario.ambienteId}
                          />
                        </div>
                      </div>

                      <button type="submit" className="botao padronizado">
                        Criar Reserva
                      </button>
                    </form>
                  </div>

                  {ambienteSelecionado && (
                    <div className="detalhes-ambiente">
                      <h3>Detalhes do Ambiente</h3>
                      <p><strong>Nome:</strong> {ambienteSelecionado.nome}</p>
                      <p><strong>Capacidade:</strong> {ambienteSelecionado.capacidade}</p>
                      <p><strong>Equipamentos:</strong> {ambienteSelecionado.equipamentos}</p>
                      <p><strong>Turno:</strong> {ambienteSelecionado.turno}</p>
                      <p><strong>Localização:</strong> {ambienteSelecionado.localizacao}</p>
                      <p><strong>Tipo:</strong> {ambienteSelecionado.tipo}</p>
                    </div>
                  )}
                </div>
              )}
            </div>

          </main>
        </SidebarProvider>
      </div>
    </PrivateRoute>
  );
}
