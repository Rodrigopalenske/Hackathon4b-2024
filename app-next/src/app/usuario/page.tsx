'use client';
import './usuario.css';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Usuarios() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [cargo, setCargo] = useState('');
  const [erro, setErro] = useState<string | null>(null);
  const [usuarios, setUsuarios] = useState<any[]>([]); // Lista de usuários
  const [usuariosFiltrados, setUsuariosFiltrados] = useState<any[]>([]); // Lista filtrada de usuários
  const [editando, setEditando] = useState<boolean>(false);
  const [usuarioEditado, setUsuarioEditado] = useState<any | null>(null); // Dados do usuário a ser editado
  const [showModal, setShowModal] = useState<boolean>(false); // Controle do modal de confirmação
  const [usuarioExcluir, setUsuarioExcluir] = useState<any | null>(null); // Usuário selecionado para exclusão
  const [pesquisa, setPesquisa] = useState<string>(''); // Valor da pesquisa
  const router = useRouter();

  // Simulação de dados dos usuários (substitua por requisições à API)
  useEffect(() => {
    // Simulação de dados (substitua isso por uma requisição à API para buscar os usuários)
    const usuariosSimulados = [
      { id: 1, email: 'admin@gmail.com', cargo: 'admin' },
      { id: 2, email: 'user@gmail.com', cargo: 'user' },
    ];
    setUsuarios(usuariosSimulados);
    setUsuariosFiltrados(usuariosSimulados); // Inicialmente, mostra todos os usuários
  }, []);

  useEffect(() => {
    // Filtra os usuários com base na pesquisa
    const resultado = usuarios.filter((usuario) =>
      usuario.email.toLowerCase().includes(pesquisa.toLowerCase()) ||
      usuario.cargo.toLowerCase().includes(pesquisa.toLowerCase())
    );
    setUsuariosFiltrados(resultado);
  }, [pesquisa, usuarios]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editando && usuarioEditado) {
      // Atualizar usuário (substitua pela lógica de API)
      const usuariosAtualizados = usuarios.map((usuario) =>
        usuario.id === usuarioEditado.id ? { ...usuarioEditado, email, senha, cargo } : usuario
      );
      setUsuarios(usuariosAtualizados);
      setUsuariosFiltrados(usuariosAtualizados); // Atualiza a lista filtrada também
      setEditando(false);
      setUsuarioEditado(null);
    } else {
      // Criar novo usuário (substitua pela lógica de API)
      if (email && senha && cargo) {
        const novoUsuario = { id: usuarios.length + 1, email, senha, cargo };
        setUsuarios([...usuarios, novoUsuario]);
        setUsuariosFiltrados([...usuarios, novoUsuario]); // Atualiza a lista filtrada também
      } else {
        setErro('Todos os campos são obrigatórios.');
      }
    }

    setEmail('');
    setSenha('');
    setCargo('');
  };

  const handleEdit = (usuario: any) => {
    setEmail(usuario.email);
    setSenha(usuario.senha);
    setCargo(usuario.cargo);
    setEditando(true);
    setUsuarioEditado(usuario);
  };

  const handleDelete = (usuario: any) => {
    setUsuarioExcluir(usuario);
    setShowModal(true); // Abre o modal
  };

  const confirmDelete = () => {
    if (usuarioExcluir) {
      const usuariosAtualizados = usuarios.filter((usuario) => usuario.id !== usuarioExcluir.id);
      setUsuarios(usuariosAtualizados);
      setUsuariosFiltrados(usuariosAtualizados); // Atualiza a lista filtrada também
    }
    setShowModal(false); // Fecha o modal
    setUsuarioExcluir(null); // Limpa o usuário selecionado
  };

  const cancelDelete = () => {
    setShowModal(false); // Fecha o modal sem excluir
    setUsuarioExcluir(null); // Limpa o usuário selecionado
  };

  return (
    <div className="container">
      <div className="card">
        <h1 className="titulo">{editando ? 'Editar Usuário' : 'Cadastrar Novo Usuário'}</h1>
        <form onSubmit={handleSubmit} className="formulario">
          {erro && <p className="erro">{erro}</p>}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
          />
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="input"
          />
          <select
            value={cargo}
            onChange={(e) => setCargo(e.target.value)}
            className="input"
          >
            <option value="">Selecione o Cargo</option>
            <option value="user">Usuário</option>
            <option value="admin">Admin</option>
          </select>
          <button type="submit" className="botao">
            {editando ? 'Salvar Alterações' : 'Cadastrar'}
          </button>
        </form>

        <h2 className="titulo">Usuários Cadastrados</h2>

        {/* Campo de Pesquisa - Agora centrado */}
        <div className="pesquisaContainer">
          <input
            type="text"
            placeholder="Pesquisar por email ou cargo..."
            value={pesquisa}
            onChange={(e) => setPesquisa(e.target.value)}
            className="input pesquisaInput"
          />
          <button onClick={() => setPesquisa(pesquisa)} className="pesquisaBtn">
            Pesquisar
          </button>
        </div>

        {/* Tabela de Usuários */}
        <table className="tabela">
          <thead>
            <tr>
              <th>Email</th>
              <th>Cargo</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {usuariosFiltrados.map((usuario, index) => (
              <tr key={usuario.id} className={index % 2 === 0 ? 'tabelaTrEven' : 'tabelaTrOdd'}>
                <td>{usuario.email}</td>
                <td>{usuario.cargo}</td>
                <td className="acoesColuna">
                  <div className="alinhamentoTd">
                    <button onClick={() => handleEdit(usuario)} className="tabelaAcaoBtn botaoEditar">
                      Editar
                    </button>
                    <button onClick={() => handleDelete(usuario)} className="tabelaAcaoBtn botaoDeletar">
                      Deletar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal de confirmação de exclusão */}
      {showModal && (
        <div className="modalBackdrop">
          <div className="modalContainer">
            <h2>Tem certeza que deseja excluir?</h2>
            <p>Essa ação não pode ser desfeita.</p>
            <div className="modalActions">
              <button onClick={cancelDelete} className="modalButton cancelarBtn">Cancelar</button>
              <button onClick={confirmDelete} className="modalButton confirmarBtn">Excluir</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
