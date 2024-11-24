"use client";

import { useState, useEffect } from "react";
import "./editar-reservas.css";
import { useRouter } from "next/navigation";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Sidebar } from "@/components/Menu/Sidebar";
import Header from "@/components/Menu/Header";

export default function HistoricoReservas() {
  const [reservas, setReservas] = useState<any[]>([]);
  const [reservaEditando, setReservaEditando] = useState<any | null>(null);
  const [modalAberto, setModalAberto] = useState(false);
  const [modalConfirmarCancelamento, setModalConfirmarCancelamento] = useState<any | null>(null); // Novo estado para o modal de confirmação
  const router = useRouter();

  useEffect(() => {
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
    router.push("/reservas");
  };

  const abrirModalEdicao = (reserva: any) => {
    setReservaEditando(reserva);
    setModalAberto(true);
  };

  const fecharModal = () => {
    setReservaEditando(null);
    setModalAberto(false);
  };

  const salvarEdicao = () => {
    setReservas((prevReservas) =>
      prevReservas.map((reserva) =>
        reserva.id === reservaEditando.id ? reservaEditando : reserva
      )
    );
    fecharModal();
    alert("Reserva atualizada com sucesso!");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setReservaEditando((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCancelar = (id: number) => {
    setModalConfirmarCancelamento(id); // Exibe o modal de confirmação para o cancelamento
  };

  const confirmarCancelamento = (id: number) => {
    setReservas(reservas.filter((reserva) => reserva.id !== id));
    setModalConfirmarCancelamento(null); // Fecha o modal após confirmar
    alert("Reserva cancelada com sucesso!");
  };

  const cancelarCancelamento = () => {
    setModalConfirmarCancelamento(null); // Fecha o modal se o usuário cancelar
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
            <h1 className="titulo">Editar Reservas</h1>
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
                  <th>Ações</th>
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
                    <td>
                      <button
                        className="botao-editar"
                        onClick={() => abrirModalEdicao(reserva)}
                      >
                        Editar
                      </button>
                      <button
                        className="botao-cancelar"
                        onClick={() => handleCancelar(reserva.id)}
                      >
                        Cancelar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>

        {/* Modal de Edição */}
        {modalAberto && reservaEditando && (
          <div className="modal">
            <div className="modal-conteudo">
              <h2>Editar Reserva</h2>
              <label>Usuário:</label>
              <input
                type="text"
                name="usuario"
                value={reservaEditando.usuario}
                onChange={handleInputChange}
              />
              <label>Ambiente:</label>
              <input
                type="text"
                name="ambiente"
                value={reservaEditando.ambiente}
                onChange={handleInputChange}
              />
              <label>Data:</label>
              <input
                type="date"
                name="data"
                value={reservaEditando.data}
                onChange={handleInputChange}
              />
              <label>Horário de Início:</label>
              <input
                type="time"
                name="horarioInicio"
                value={reservaEditando.horarioInicio}
                onChange={handleInputChange}
              />
              <label>Horário de Fim:</label>
              <input
                type="time"
                name="horarioFim"
                value={reservaEditando.horarioFim}
                onChange={handleInputChange}
              />
              <div className="modal-acoes">
                <button className="botao-salvar" onClick={salvarEdicao}>
                  Salvar
                </button>
                <button className="botao-fechar" onClick={fecharModal}>
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal de confirmação de cancelamento */}
        {modalConfirmarCancelamento && (
          <div className="modal">
            <div className="modal-conteudo">
              <h2>Tem certeza que deseja cancelar esta reserva?</h2>
              <div className="modal-acoes">
                <button className="botao-salvar" onClick={() => confirmarCancelamento(modalConfirmarCancelamento)}>
                  Confirmar
                </button>
                <button className="botao-fechar" onClick={cancelarCancelamento}>
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}
      </SidebarProvider>
    </div>
  );
}
