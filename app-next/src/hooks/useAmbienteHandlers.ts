import { useState, useMemo, useEffect } from "react";

export const useAmbienteHandlers = () => {
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

  // Inicialização dos ambientes simulados
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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handlePesquisar();
    }
  };

  const handlePesquisar = () => {
    const resultado = ambientes.filter((ambiente) =>
      ambiente.nome.toLowerCase().includes(pesquisa.toLowerCase())
    );
    setAmbientesFiltrados(resultado);
  };

  const handleSubmit = async (e: React.FormEvent): Promise<boolean> => {
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
      return true;
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
  
        // Limpa os campos após o envio
        setNome("");
        setCapacidade("");
        setEquipamentos("");
        setTurno("");
        setLocalizacao("");
        setTipo("");
        setStatus("");
        setDiasDisponiveis([]); // Limpar os dias selecionados
  
        return true;
      } else {
        setErro("Todos os campos devem ser preenchidos.");
        return false;
      }
    }
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

  return {
    nome,
    setNome,
    capacidade,
    setCapacidade,
    equipamentos,
    setEquipamentos,
    localizacao,
    setLocalizacao,
    tipo,
    setTipo,
    status,
    setStatus,
    erro,
    setErro,
    ambientes,
    setAmbientes,
    ambientesFiltrados,
    setAmbientesFiltrados,
    editando,
    setEditando,
    ambienteEditado,
    setAmbienteEditado,
    pesquisa,
    setPesquisa,
    showModal,
    setShowModal,
    ambienteExcluir,
    setAmbienteExcluir,
    diasDisponiveis,
    setDiasDisponiveis,
    turno,
    setTurno,
    handleKeyDown,
    handlePesquisar,
    handleSubmit,
    handleEditar,
    handleExcluir,
    handleDiaChange,
    renderDiasDisponiveis,
    ambientesFiltradosMemo,
  };
};
