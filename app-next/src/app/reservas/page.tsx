"use client";

import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "./reserva.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Sidebar } from "@/components/Menu/Sidebar";
import Header from "@/components/Menu/Header";
import api from "@/utils/api";
import PrivateRoute from "@/components/PrivateRoute";

export default function ReservasPage() {
  const [dataSelecionada, setDataSelecionada] = useState<Date | null>(null);
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
    // Você pode adicionar mais exemplos aqui.
  ]);
  const [ambientesDisponiveis, setAmbientesDisponiveis] = useState<any[]>([]);
  const [ambienteSelecionado, setAmbienteSelecionado] = useState<any | null>(
    null
  );
  const [formulario, setFormulario] = useState({
    ambienteId: "",
    data: "",
    horarioInicio: "",
    horarioFim: "",
  });
  const [isClient, setIsClient] = useState(false);

  // Simular fetch de usuários
  useEffect(() => {
    setAmbientesDisponiveis(ambientes);
  }, []);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleDiaSelecionado = (value: Date | Date[] | null) => {
    if (value instanceof Date) {
      setDataSelecionada(value);
      setFormulario((prev) => ({
        ...prev,
        data: value.toISOString().split("T")[0],
      }));
    }
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
    await api.post('/reserva', {
      'ambiente_id': ambienteSelecionado,
      'data': dataSelecionada,
      'horario_inicio': formulario.horarioInicio,
      'horario_fim': formulario.horarioFim,
      'status': 1,
  })
    alert("Reserva criada com sucesso!");
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

            {/* Calendário */}
            <div className="calendario-container">
              <div className="calendario">
                {isClient && (
                  <Calendar
                    onChange={handleDiaSelecionado}
                    value={dataSelecionada}
                    minDate={new Date()} // Data mínima: hoje
                    maxDate={new Date(new Date().setFullYear(new Date().getFullYear() + 1))} // Data máxima: um ano a partir de hoje
                  />
                )}
              </div>
            </div>

            {/* Exibir o formulário apenas se uma data for selecionada */}
            {dataSelecionada && (
              <div className="formulario-detalhes">
                {/* Formulário de reserva */}
                <div className="card formulario">
                  <h2>Formulário de Reserva</h2>

                  <form onSubmit={handleSubmit}>
                    <label>
                      Ambiente:
                      <select
                        name="ambienteId"
                        className="input padronizado"
                        value={formulario.ambienteId}
                        onChange={handleChange}
                      >
                        <option value="">Selecione um Ambiente</option>
                        {ambientesDisponiveis.map((ambiente) => (
                          <option key={ambiente.id} value={ambiente.id}>
                            {ambiente.nome}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label>
                      Horário Início:
                      <input
                        type="time"
                        name="horarioInicio"
                        className="input padronizado"
                        value={formulario.horarioInicio}
                        onChange={handleChange}
                        required
                        disabled={!formulario.ambienteId}
                      />
                    </label>

                    <label>
                      Horário Fim:
                      <input
                        type="time"
                        name="horarioFim"
                        className="input padronizado"
                        value={formulario.horarioFim}
                        onChange={handleChange}
                        required
                        disabled={!formulario.ambienteId}
                      />
                    </label>

                    <button type="submit" className="botao padronizado">
                      Criar Reserva
                    </button>
                  </form>
                </div>

                {/* Detalhes do ambiente */}
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

      </SidebarProvider >
    </div>
    </PrivateRoute>

  );
}
