import { useState, useMemo, useEffect } from "react";

// Hook customizado para encapsular toda a lógica para gerenciar ambiente
export const useAmbienteHandlers = () => {
  // Estados individuais para armazenar os campos de um ambiente.
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
  const [diasIndisponiveis, setDiasIndisponiveis] = useState<string[]>([]);
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
        diasDisponiveis: ["segunda", "terça", "quarta", "quinta", "sexta"],
        diasIndisponiveis: ["sabado", 'domingo'],
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
        diasDisponiveis: ["segunda", "terça", "quarta", "quinta"],
        diasIndisponiveis: ['domingo'],
      },
    ];
    setAmbientes(ambientesSimulados);
    setAmbientesFiltrados(ambientesSimulados);
  }, []);

   // Função para pesquisar ambientes com base no texto digitado
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handlePesquisar();
    }
  };

  // Filtra os ambientes que incluem o texto pesquisado no nome
  const handlePesquisar = () => {
    const resultado = ambientes.filter((ambiente) =>
      ambiente.nome.toLowerCase().includes(pesquisa.toLowerCase())
    );
    setAmbientesFiltrados(resultado); // Atualiza a lista filtrada
  };

  // Função para adicionar ou editar um ambiente
  const handleSubmit = async (e: React.FormEvent): Promise<boolean> => {
    e.preventDefault();
  
    // Se estiver editando, atualiza o ambiente existente
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
              diasIndisponiveis,
            }
          : ambiente
      );
      setAmbientes(ambientesAtualizados);
      setAmbientesFiltrados(ambientesAtualizados);
      setEditando(false);
      setAmbienteEditado(null);
      return true;
    } else {
      // Se não estiver editando, adiciona um novo ambiente
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
          diasIndisponiveis,
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
        // Limpar os dias selecionados
        setDiasDisponiveis([]); 
        setDiasIndisponiveis([]);
  
        return true;
      } else {
        setErro("Todos os campos devem ser preenchidos."); // Define erro caso algum campo esteja vazio
        return false;
      }
    }
  };

  // Prepara o ambiente para edição
  const handleEditar = (ambiente: any) => {
    setNome(ambiente.nome);
    setCapacidade(ambiente.capacidade);
    setEquipamentos(ambiente.equipamentos);
    setTurno(ambiente.turno);
    setLocalizacao(ambiente.localizacao);
    setTipo(ambiente.tipo);
    setStatus(ambiente.status);
    setDiasDisponiveis(ambiente.diasDisponiveis);
    setDiasIndisponiveis(ambiente.diasIndisponiveis);
    setAmbienteEditado(ambiente);
    setEditando(true);
  };

  // Remove um ambiente da lista
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

  // Adiciona ou remove dias disponíveis na lista
  const handleDiaChange = (dia: string) => {
    setDiasDisponiveis((prevDias) =>
      prevDias.includes(dia)
        ? prevDias.filter((d) => d !== dia) // Remove o dia se já estiver selecionado
        : [...prevDias, dia] // Adiciona o dia se não estiver selecionado
    );
  };

  // Retorna os dias disponíveis como uma string formatada.
  const renderDiasDisponiveis = (dias: string[]) => {
    return dias.join(", ").toUpperCase();
  };

   // Memoriza a lista filtrada para evitar cálculos desnecessários
  const ambientesFiltradosMemo = useMemo(() => {
    return ambientes.filter((ambiente) => {
      // Converte o texto da pesquisa para minúsculas
      const pesquisaLower = pesquisa.toLowerCase();
      // Verifica se a pesquisa está incluída em alguma propriedade do ambiente
      return (
        ambiente.nome.toLowerCase().includes(pesquisaLower) ||
        ambiente.localizacao.toLowerCase().includes(pesquisaLower) ||
        ambiente.capacidade.includes(pesquisa) ||
        ambiente.turno.includes(pesquisa) ||
        ambiente.tipo.toLowerCase().includes(pesquisaLower) ||
        ambiente.equipamentos.split(",").some((equipamento: string) =>
          equipamento.toLowerCase().includes(pesquisaLower)) ||
        ambiente.status.toLowerCase().includes(pesquisaLower) ||
        // Verifica se o texto pesquisado está nos dias disponíveis
        ambiente.diasDisponiveis.some((dia: string) =>
          dia.toLowerCase().includes(pesquisaLower)) ||
        // Verifica se o texto pesquisado está nos dias indisponíveis
        ambiente.diasIndisponiveis.some((dia: string) =>
          dia.toLowerCase().includes(pesquisaLower)
          )
      );
    });
  }, [pesquisa, ambientes]);  // Só será recalculado se 'pesquisa' ou 'ambientes' mudarem.

   // Retorna todos os estados e funções necessários para o gerenciamento de ambientes.
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
    diasIndisponiveis,
    setDiasIndisponiveis,
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
