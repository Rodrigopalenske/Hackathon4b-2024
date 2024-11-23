"use client";
import { SidebarProvider } from "@/components/ui/sidebar";
import "./ambiente.css";
import { useState, useEffect, useMemo } from "react";
import { Sidebar } from "@/components/Menu/Sidebar";
import Header from "@/components/Menu/Header";
import { ChevronDown, Plus } from "lucide-react";
import { NavBarLink } from "@/components/Menu/style";
import PrivateRoute from "@/components/PrivateRoute";

export default function Ambientes() {
  const [nome, setNome] = useState("");
  const [capacidade, setCapacidade] = useState("");
  const [equipamentos, setEquipamentos] = useState("");
  const [localizacao, setLocalizacao] = useState("");
  const [tipo, setTipo] = useState("");
  const [status, setStatus] = useState("");
  const [erro, setErro] = useState<string | null>(null);
  const [ambientes, setAmbientes] = useState<any[]>([]);
  const [ambientesFiltrados, setAmbientesFiltrados] = useState<any[]>([]);
  const [editando, setEditando] = useState<boolean>(false);
  const [ambienteEditado, setAmbienteEditado] = useState<any | null>(null);
  const [pesquisa, setPesquisa] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [ambienteExcluir, setAmbienteExcluir] = useState<any | null>(null);
  const [diasDisponiveis, setDiasDisponiveis] = useState<string[]>([]);

  const [turno, setTurno] = useState("");



// Simulação de dados dos ambiente (substitua por requisições à API)

  useEffect(() => {
    const ambientesSimulados = [
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
      {
        id: 2,
        nome: "Auditório",
        capacidade: "50",
        equipamentos: "Microfone, Telão",
        turno: "Tarde",
        localizacao: "Bloco B",
        tipo: "Auditório",
        status: "Indisponível",
        diasDisponiveis: ["terça", "quinta"],
      },
    ];
    setAmbientes(ambientesSimulados);
    setAmbientesFiltrados(ambientesSimulados);
  }, []);

  const handlePesquisar = () => {
    const resultado = ambientes.filter((ambiente) => {
      return (
        ambiente.nome.toLowerCase().includes(pesquisa.toLowerCase()) ||
        ambiente.capacidade.toLowerCase().includes(pesquisa.toLowerCase()) ||
        ambiente.equipamentos.toLowerCase().includes(pesquisa.toLowerCase()) ||
        ambiente.horarios.toLowerCase().includes(pesquisa.toLowerCase()) ||
        ambiente.localizacao.toLowerCase().includes(pesquisa.toLowerCase()) ||
        ambiente.tipo.toLowerCase().includes(pesquisa.toLowerCase()) ||
        ambiente.status.toLowerCase().includes(pesquisa.toLowerCase()) ||
        ambiente.diasDisponiveis.some((dia: string) =>
          dia.toLowerCase().includes(pesquisa.toLowerCase())
        )
      );
    });
    setAmbientesFiltrados(resultado);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handlePesquisar();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editando && ambienteEditado) {
      const ambientesAtualizados = ambientes.map((ambiente) =>
        ambiente.id === ambienteEditado.id
          ? {
              ...ambienteEditado,
              nome,
              capacidade,
              equipamentos,
              turno,
              localizacao,
              tipo,
              status,
              diasDisponiveis,
            }
          : ambiente
      );
      setAmbientes(ambientesAtualizados);
      setAmbientesFiltrados(ambientesAtualizados);
      setEditando(false);
      setAmbienteEditado(null);
    } else {
      if (
        nome &&
        capacidade &&
        equipamentos &&
        turno &&
        localizacao &&
        tipo &&
        status
      ) {
        const novoAmbiente = {
          id: ambientes.length + 1,
          nome,
          capacidade,
          equipamentos,
          turno,
          localizacao,
          tipo,
          status,
          diasDisponiveis,
        };
        setAmbientes([...ambientes, novoAmbiente]);
        setAmbientesFiltrados([...ambientes, novoAmbiente]);
      } else {
        setErro("Todos os campos devem ser preenchidos.");
      }
    }

    // Limpa os campos após o envio
    setNome("");
    setCapacidade("");
    setEquipamentos("");
    setTurno("");
    setLocalizacao("");
    setTipo("");
    setStatus("");
    setDiasDisponiveis([]); // Limpar os dias selecionados
  };

  const handleEditar = (ambiente: any) => {
    setNome(ambiente.nome);
    setCapacidade(ambiente.capacidade);
    setEquipamentos(ambiente.equipamentos);
    setTurno(ambiente.turno);
    setLocalizacao(ambiente.localizacao);
    setTipo(ambiente.tipo);
    setStatus(ambiente.status);
    setDiasDisponiveis(ambiente.diasDisponiveis);
    setAmbienteEditado(ambiente);
    setEditando(true);
  };

  const handleExcluir = () => {
    if (ambienteExcluir) {
      const ambientesAtualizados = ambientes.filter(
        (ambiente) => ambiente.id !== ambienteExcluir.id
      );
      setAmbientes(ambientesAtualizados);
      setAmbientesFiltrados(ambientesAtualizados);
    }
    setShowModal(false);
    setAmbienteExcluir(null); // Limpa o estado do ambiente a ser excluído
  };

  const handleDiaChange = (dia: string) => {
    setDiasDisponiveis((prevDias) =>
      prevDias.includes(dia)
        ? prevDias.filter((d) => d !== dia)
        : [...prevDias, dia]
    );
  };

  const renderDiasDisponiveis = (dias: string[]) => {
    return dias.join(", ").toUpperCase();
  };

  // Usando useMemo para otimizar a pesquisa
  const ambientesFiltradosMemo = useMemo(() => {
    return ambientes.filter((ambiente) => {
      return (
        ambiente.nome.toLowerCase().includes(pesquisa.toLowerCase()) ||
        ambiente.localizacao.toLowerCase().includes(pesquisa.toLowerCase()) ||
        ambiente.capacidade.includes(pesquisa) ||
        ambiente.turno.includes(pesquisa) ||
        ambiente.tipo.toLowerCase().includes(pesquisa.toLowerCase()) ||
        ambiente.equipamentos
          .split(",")
          .some(
            (equipamento: string) =>
              equipamento.toLowerCase().includes(pesquisa.toLowerCase()) ||
              ambiente.status.toLowerCase().includes(pesquisa.toLowerCase())
          )
      );
    });
  }, [pesquisa, ambientes]);

  
  return (
    <PrivateRoute requiredPermissions={['admin', 'professor']}>
      <div>
        <SidebarProvider>
          <div className="hidden md:flex min-w-[300px] border-r min-h-screen">
            <Sidebar />
          </div>
          <main className="grid w-full h-full">
            <Header />
            <h1 className="titulo">Cadastro de Ambientes</h1>
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
                <button className="pesquisaBtn btn" onClick={handlePesquisar}>
                  Pesquisar
                </button>

                {/* Adicionar novo ambiente */}
                <button className="adicionarBtn btn float-end mr-3" onClick={handlePesquisar}>
                <NavBarLink href={'/ambiente/adicionar'} className="botaoAdicionar">
                  Adicionar ambiente
                </NavBarLink>
                </button>
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
                          className="botaoEditar btn float-end"
                          onClick={() => handleEditar(ambiente)}
                        >
                          Editar
                        </button>
                        <button
                          className="botaoExcluir btn float-end"
                          onClick={() => {
                            setAmbienteExcluir(ambiente);
                            setShowModal(true);
                          }}
                        >
                          Excluir
                        </button>
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
                          <span>Equipamentos:</span>
                          <p>{ambiente.equipamentos}</p>
                        </div>
                        <div className="col">
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
            </section>
          </main>
        </SidebarProvider>
      </div>
    </PrivateRoute>
  );
}
