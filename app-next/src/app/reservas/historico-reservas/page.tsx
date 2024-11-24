"use client";

import { useState, useEffect } from "react";
import "./historico.css";
import { useRouter } from "next/navigation"; // Importa o hook useRouter
import { SidebarProvider } from "@/components/ui/sidebar";
import { Sidebar } from "@/components/Menu/Sidebar";
import Header from "@/components/Menu/Header";

export default function HistoricoReservas() {
  const [reservas, setReservas] = useState<any[]>([]);
  const router = useRouter(); // Inicializa o roteador

  useEffect(() => {
    // Simula fetch de reservas feitas
    setReservas([
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
    ]);
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
                  <th>ID</th>
                  <th>Usuário</th>
                  <th>Ambiente</th>
                  <th>Data</th>
                  <th>Horário</th>
                </tr>
              </thead>
              <tbody>
                {reservas.map((reserva) => (
                  <tr key={reserva.id}>
                    <td>{reserva.id}</td>
                    <td>{reserva.usuario}</td>
                    <td>{reserva.ambiente}</td>
                    <td>{reserva.data}</td>
                    <td>
                      {reserva.horarioInicio} - {reserva.horarioFim}
                    </td>
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
