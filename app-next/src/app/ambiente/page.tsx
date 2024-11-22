'use client';
import './ambiente.css';
import { useState, useEffect, useMemo } from 'react';

export default function Ambientes() {
  const [nome, setNome] = useState('');
  const [capacidade, setCapacidade] = useState('');
  const [equipamentos, setEquipamentos] = useState('');
  const [localizacao, setLocalizacao] = useState('');
  const [tipo, setTipo] = useState('');
  const [status, setStatus] = useState('');
  const [erro, setErro] = useState<string | null>(null);
  const [ambientes, setAmbientes] = useState<any[]>([]);
  const [ambientesFiltrados, setAmbientesFiltrados] = useState<any[]>([]);
  const [editando, setEditando] = useState<boolean>(false);
  const [ambienteEditado, setAmbienteEditado] = useState<any | null>(null);
  const [pesquisa, setPesquisa] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [ambienteExcluir, setAmbienteExcluir] = useState<any | null>(null);
  const [diasDisponiveis, setDiasDisponiveis] = useState<string[]>([]);
  const [turno, setTurno] = useState('');

// Simulação de dados dos ambiente (substitua por requisições à API)
  useEffect(() => {
    const ambientesSimulados = [
      { id: 1, nome: 'Sala de Reuniões A', capacidade: '10', equipamentos: 'Projetor, TV', turno: 'Manhã', localizacao: 'Bloco A', tipo: 'Sala', status: 'Disponível', diasDisponiveis: ['segunda', 'quarta', 'sexta'] },
      { id: 2, nome: 'Auditório', capacidade: '50', equipamentos: 'Microfone, Telão', turno: 'Tarde', localizacao: 'Bloco B', tipo: 'Auditório', status: 'Indisponível', diasDisponiveis: ['terça', 'quinta'] },
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
    if (e.key === 'Enter') {
      handlePesquisar();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editando && ambienteEditado) {
      const ambientesAtualizados = ambientes.map((ambiente) =>
        ambiente.id === ambienteEditado.id
          ? { ...ambienteEditado, nome, capacidade, equipamentos, turno, localizacao, tipo, status, diasDisponiveis }
          : ambiente
      );
      setAmbientes(ambientesAtualizados);
      setAmbientesFiltrados(ambientesAtualizados);
      setEditando(false);
      setAmbienteEditado(null);
    } else {
      if (nome && capacidade && equipamentos && turno && localizacao && tipo && status) {
        const novoAmbiente = { id: ambientes.length + 1, nome, capacidade, equipamentos, turno, localizacao, tipo, status, diasDisponiveis };
        setAmbientes([...ambientes, novoAmbiente]);
        setAmbientesFiltrados([...ambientes, novoAmbiente]);
      } else {
        setErro('Todos os campos devem ser preenchidos.');
      }
    }

    // Limpa os campos após o envio
    setNome('');
    setCapacidade('');
    setEquipamentos('');
    setTurno('');
    setLocalizacao('');
    setTipo('');
    setStatus('');
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
      const ambientesAtualizados = ambientes.filter((ambiente) => ambiente.id !== ambienteExcluir.id);
      setAmbientes(ambientesAtualizados);
      setAmbientesFiltrados(ambientesAtualizados);
    }
    setShowModal(false);
    setAmbienteExcluir(null); // Limpa o estado do ambiente a ser excluído
  };

  const handleDiaChange = (dia: string) => {
    setDiasDisponiveis((prevDias) =>
      prevDias.includes(dia) ? prevDias.filter((d) => d !== dia) : [...prevDias, dia]
    );
  };

  const renderDiasDisponiveis = (dias: string[]) => {
    return dias.join(', ').toUpperCase();
  };

  // Usando useMemo para otimizar a pesquisa
  const ambientesFiltradosMemo = useMemo(() => {
    return ambientes.filter((ambiente) => {
      return (
        ambiente.nome.toLowerCase().includes(pesquisa.toLowerCase()) ||
        ambiente.localizacao.toLowerCase().includes(pesquisa.toLowerCase()) ||
        ambiente.capacidade.includes(pesquisa) ||
        ambiente.horarios.includes(pesquisa) ||
        ambiente.tipo.toLowerCase().includes(pesquisa.toLowerCase()) ||
        ambiente.equipamentos.split(',').some((equipamento: string) =>
          equipamento.toLowerCase().includes(pesquisa.toLowerCase()) ||
        ambiente.status.toLowerCase().includes(pesquisa.toLowerCase()),
      
        
        )
      );
    });
  }, [pesquisa, ambientes]);

  
  return (
    <div className="container">
      <div className="card">
        <h2 className="titulo">Cadastro de Ambientes</h2>
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

          <select
            className="inputSelect"
            id="turno"
            value={turno}
            onChange={(e) => setTurno(e.target.value)}
          >
            <option value=""disabled>Selecione o Turno</option>
            <option value="Manhã">Manhã</option>
            <option value="Tarde">Tarde</option>
            <option value="Noite">Noite</option>
          </select>

          <select
            className="inputSelect"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
          >
            <option value=""disabled>Selecione o Tipo</option>
            <option value="Sala">Sala</option>
            <option value="Auditório">Auditório</option>
            <option value="Escritório">Escritório</option>
          </select>

          <select
            className="inputSelect"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value=""disabled>Disponibilidade</option>
            <option value="Disponível">Disponível</option>
            <option value="Indisponível">Indisponível</option>
            <option value="Em manutenção">Em manutenção</option>
          </select>


          <div>
            <p>Selecione os dias da semana:</p>
            {['segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado', 'domingo'].map((dia) => (
              <label key={dia}>
                <input
                  type="checkbox"
                  checked={diasDisponiveis.includes(dia)}
                  onChange={() => handleDiaChange(dia)}
                />
                {dia.charAt(0).toUpperCase() + dia.slice(1)}
              </label>
            ))}
          </div>

          <button type="submit" className="botao">
            {editando ? 'Salvar Alterações' : 'Cadastrar Ambiente'}
          </button>

          {erro && <p className="erro">{erro}</p>}
        </form>
      </div>

      <div>
        <h3 className="titulo">Ambientes Cadastrados</h3>
        <input
          type="text"
          placeholder="Pesquisar"
          value={pesquisa}
          onChange={(e) => setPesquisa(e.target.value)}
          onKeyDown={handleKeyDown}
          className="pesquisaInput"
        />
        <button
          className="pesquisaBtn"
          onClick={handlePesquisar}
        >
          Pesquisar
        </button>
        <table className="tabela">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Capacidade</th>
              <th>Equipamentos</th>
              <th>Horários</th>
              <th>Localização</th>
              <th>Tipo</th>
              <th>Status</th>
              <th>Dias Disponíveis</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {ambientesFiltradosMemo.map((ambiente) => (
              <tr key={ambiente.id}>
                <td>{ambiente.nome}</td>
                <td>{ambiente.capacidade}</td>
                <td>{ambiente.equipamentos}</td>
                <td>{ambiente.turno}</td>
                <td>{ambiente.localizacao}</td>
                <td>{ambiente.tipo}</td>
                <td>{ambiente.status}</td>
                <td>{renderDiasDisponiveis(ambiente.diasDisponiveis)}</td>
                <td className="acoesColuna">
                  <button className="botaoEditar" onClick={() => handleEditar(ambiente)}>Editar</button>
                  <button
                    className="botaoExcluir"
                    onClick={() => {
                      setAmbienteExcluir(ambiente);
                      setShowModal(true);
                    }}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal para exclusão */}
      {showModal && (
        <div className="modal">
          <div className="modalConteudo">
            <h4>Tem certeza de que deseja excluir este ambiente?</h4>
            <button className="botaoExcluir" onClick={handleExcluir}>Sim, Excluir</button>
            <button className="botao" onClick={() => setShowModal(false)}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
}
