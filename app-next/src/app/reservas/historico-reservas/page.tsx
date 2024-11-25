"use client";

import { useState, useEffect } from "react";
import "./historico.css";
import { useRouter } from "next/navigation"; // Importa o hook useRouter
import { SidebarProvider } from "@/components/ui/sidebar";
import { Sidebar } from "@/components/Menu/Sidebar";
import Header from "@/components/Menu/Header";
import api from "@/utils/api";

export default function HistoricoReservas() {
  const [reservas, setReservas] = useState<{
    id: number;
    tipo: string;
    alteracao: string;
    data_criacao: string;
    ambiente: string;
    horario_inicio: string;
    horario_fim: string;
    data: string;
  }[]>([]);
  
  const router = useRouter(); // Inicializa o roteador

  type Historico = {
    id: number; // ID único do histórico
    tipo: string; // Tipo de alteração (ex.: "criação", "edição")
    data_criacao: string; // Data da alteração
    alteracao: string; // Detalhes da alteração
  };
  
  type Reserva = {
    reserva: {
      horario_inicio: string;
      horario_fim: string;
      data: string;
    };
    historicos: Historico[]; // Lista de históricos relacionados
  };
  type HistoricoReservaResponse = {
    historico_reserva: Reserva[];
  };
  useEffect(() => {
    api.get('/historico/reserva')
    .then((response) => {
      let historicosAtualizados:any[] = []
      response.data.historico_reserva.forEach((element: Reserva) => {

        /* let ambiente = api.get('/historico/reserva')
        .then((response) => {

        })
        .catch((error) => {
          
        }) */
        
        let ambienteNome = "mudar"

        let horario_inicio = element.reserva.horario_inicio
        let horario_fim = element.reserva.horario_fim
        let data = element.reserva.data
        if (Array.isArray(element.historicos) && element.historicos.length > 0) {
          const historicosComAmbiente = element.historicos.map((historico: Historico) => ({
            ...historico,
            ambiente: ambienteNome,
            horario_inicio,
            horario_fim,
            data,
          }));

          historicosAtualizados = [...historicosAtualizados, ...historicosComAmbiente];
        }
      });
      setReservas(historicosAtualizados)
    })
    .catch((error) => {
      console.log(error.response.data)
    })
    
    // Simula fetch de reservas feitas
    /* setReservas([
      {
        id: 1,
        usuario: "João Silva",
        ambiente: "Sala de Reuniões A",
        data: "2024-11-23",
        horarioInicio: "09:00",
        horarioFim: "11:00",
      },
      {
        id: 2,
        usuario: "Maria Oliveira",
        ambiente: "Sala de Reuniões B",
        data: "2024-11-25",
        horarioInicio: "14:00",
        horarioFim: "16:00",
      },
    ]); */
  }, []);

  const handleVoltar = () => {
    router.push("/reservas"); // Define a rota para a página de reservas
  };

  return (
    <div>
      <SidebarProvider>
        <div className="hidden md:flex min-w-[300px] border-r min-h-screen">
          <Sidebar />
        </div>
        <main className="grid w-full h-full">
          <Header />
          <div className="container">
            <h1 className="titulo">Histórico de Reservas</h1>
            <hr className="linha" />

            {/* Botão de Voltar */}
            <div className="w-100">
                <button
                 className="botao-voltar"
                 onClick={handleVoltar}>
                  Voltar para Reservas
                </button>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Ambiente</th>
                  <th>Alteração</th>
                  <th>Data de alteração</th>
                  <th>Tipo de alteração</th>
                </tr>
              </thead>
              <tbody>
                {reservas.map((reserva) => (
                  <tr key={reserva.id}>
                    <td>{reserva.ambiente}</td>
                    <td>{reserva.alteracao}</td>
                    <td>{reserva.data_criacao}</td>
                    <td>{reserva.tipo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </SidebarProvider>
    </div>
  );
}
