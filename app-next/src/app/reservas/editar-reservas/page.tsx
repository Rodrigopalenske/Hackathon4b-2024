"use client";

import { useState, useEffect } from "react";
import "./editar-reservas.css";
import { useRouter } from "next/navigation";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Sidebar } from "@/components/Menu/Sidebar";
import Header from "@/components/Menu/Header";
import api from "@/utils/api";

export default function HistoricoReservas() {
  const [reservas, setReservas] = useState<any[]>([]);
  const [reservaEditando, setReservaEditando] = useState<any | null>(null);
  const [modalAberto, setModalAberto] = useState(false);
  const [modalConfirmarCancelamento, setModalConfirmarCancelamento] = useState<any | null>(null); // Novo estado para o modal de confirmação
  const router = useRouter();

  const coletaReservas = () => {
    api.get('/usuario/reserva')
    .then((response) => {
      /* let ambiente = api.get('/historico/reserva')
        .then((response) => {

        })
        .catch((error) => {
          
      }) */
      setReservas(response.data.reservas)

    })
    .catch((error) => {
      error.data
    })
  };

  useEffect(() => {
    coletaReservas()
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
    api.post("/reserva/editar/" + reservaEditando.id, {
      'data': reservaEditando.data,
      'horario_inicio': reservaEditando.horario_inicio,
      'horario_fim': reservaEditando.horario_fim,
      'status': reservaEditando.status,
      'editavel': reservaEditando.editavel
    })
    .then((response) => {
      alert(response.data.mensagem);
      api.post("/historico/reserva", {
        'reserva_id': reservaEditando.id,
        'alteracao': response.data.alteracao,
        'tipo': 'Edição de reserva',
      })
    })
    .catch((error) => {
      alert(error);

    })
    
    fecharModal();
    
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
    api.get('/reserva/cancelar/'+id)
    .then((response) => {
      api.post("/historico/reserva", {
        'reserva_id': reservaEditando.id,
        'alteracao': response.data.alteracao,
        'tipo': 'Cancelamento de reserva',
      })
      coletaReservas()
      alert(response.data.mensagem);
    })
    .catch((error) => {
      alert(error.data.mensagem);
    })

    setModalConfirmarCancelamento(null); // Fecha o modal após confirmar
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
                  <th>Ambiente</th>
                  <th>Data</th>
                  <th>Horário</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {reservas.map((reserva) => (
                  <tr key={reserva.id}>
                    <td>{reserva.ambiente_nome}</td>
                    <td>{reserva.data}</td>
                    
                    <td>
                      {reserva.horario_inicio} - {reserva.horario_fim}
                    </td>
                    <td>{reserva.status ?"registrado":"cancelado"}</td>
                    <td>
                      <button
                        disabled={!reserva.editavel || !reserva.status}
                        className="botao-editar"
                        onClick={() => abrirModalEdicao(reserva)}
                      >
                        Editar
                      </button>
                      <button
                        disabled={!reserva.editavel || !reserva.status}
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
                name="horario_inicio"
                value={reservaEditando.horario_inicio}
                onChange={handleInputChange}
              />
              <label>Horário de Fim:</label>
              <input
                type="time"
                name="horario_fim"
                value={reservaEditando.horario_fim}
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
