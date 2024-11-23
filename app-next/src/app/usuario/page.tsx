'use client';
import './usuario.css';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { SidebarProvider } from '@/components/ui/sidebar';
import Header from '@/components/Menu/Header';
import { Sidebar } from '@/components/Menu/Sidebar';
import api from '@/utils/api';
import PrivateRoute from '@/components/PrivateRoute';

export default function Usuarios() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
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
    api.get('/usuarios')
    .then((response) => {
      console.log(response.data.usuarios)
      setUsuarios(response.data.usuarios);
      setUsuariosFiltrados(response.data.usuarios); // Inicialmente, mostra todos os usuários
    })
    .catch((error) => {
      console.log("Usuários não encontrados")
    })
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
      await api.post('/admin/usuario/update/'+ usuarioEditado.id, {
        'nome': nome,
        'email': email,
        'cargo': cargo
      })
      .then((response) => {
        // Valida se o registro foi bem-sucedido (status 201 ou mensagem esperada)
        if (response.status === 200) {
          
          console.log('Usuário editado com sucesso:', response.data);
          setEmail('');
          setNome('');
          setCargo('');
          // Obtém a lista de usuários atualizada
          return api.get('/usuarios');
        } else {
          setErro(response.data.mensagem)
          console.log('Erro:', response.data);
          throw new Error('Edição não foi concluída.');
        }
      })
      .then((response) => {
        console.log('Lista de usuários atualizada:', response.data.usuarios);
    
        // Atualiza os estados com os usuários retornados
        setUsuarios(response.data.usuarios);
        setUsuariosFiltrados(response.data.usuarios); // Inicialmente, mostra todos os usuários

        setEditando(false);
        setUsuarioEditado(null);
      })
      .catch((error) => {
        // Captura erros em qualquer parte do fluxo

        setErro(error.response.data.mensagem);
        console.error('Erro inesperado:', error);
      });
    } else {
        // Criar novo usuário (substitua pela lógica de API)
      if (email && nome && cargo) {
        setErro('')
        await api.post('/register', {
          'nome': nome,
          'email': email,
          'cargo': cargo
        })
        .then((response) => {
          // Valida se o registro foi bem-sucedido (status 201 ou mensagem esperada)
          if (response.status === 201) {
            setEmail('');
            setNome('');
            setCargo('');
            console.log('Usuário registrado com sucesso:', response.data.mensagem);
      
            // Obtém a lista de usuários atualizada
            return api.get('/usuarios');
          } else {
            console.log('Erro inesperado no registro:', response.data.mensagem);
            throw new Error('Registro não foi concluído.');
          }
        })
        .then((response) => {
          console.log('Lista de usuários atualizada:', response.data.usuarios);
      
          // Atualiza os estados com os usuários retornados
          setUsuarios(response.data.usuarios);
          setUsuariosFiltrados(response.data.usuarios); // Inicialmente, mostra todos os usuários
        })
        .catch((error) => {
          // Captura erros em qualquer parte do fluxo

          setErro(error.response.data.mensagem);
          console.error('Erro inesperado:', error);
        });
      } else {
        setErro('Todos os campos são obrigatórios.');
      }
    }
  };

  const handleEdit = (usuario: any) => {
    setEmail(usuario.email);
    setNome(usuario.name);
    setCargo(usuario.cargo);
    setEditando(true);
    setUsuarioEditado(usuario);
  };

  const handleDelete = (usuario: any) => {
    setUsuarioExcluir(usuario);
    setShowModal(true); // Abre o modal
  };

  const confirmDelete = async () => {
    if (usuarioExcluir) {
      try {
        // Faz a requisição para deletar apenas o usuário selecionado
        await api.delete(`http://localhost:8000/api/admin/usuario/destroy/${usuarioExcluir.id}`);
        console.log(`Usuário com ID ${usuarioExcluir.id} deletado com sucesso.`);
  
        // Atualiza a lista local removendo o usuário excluído
        const usuariosAtualizados = usuarios.filter((usuario) => usuario.id !== usuarioExcluir.id);
        setUsuarios(usuariosAtualizados);
        setUsuariosFiltrados(usuariosAtualizados); // Atualiza a lista filtrada também
  
        setShowModal(false); // Fecha o modal
        setUsuarioExcluir(null); // Limpa o estado de exclusão
      } catch (error) {
        console.error('Erro ao deletar o usuário:', error);
      }
    }
  };

  const cancelDelete = () => {
    setShowModal(false); // Fecha o modal sem excluir
    setUsuarioExcluir(null); // Limpa o usuário selecionado
  };

  return (
    <PrivateRoute requiredPermissions={['admin']}>
      <div>
        <SidebarProvider>
          <div className="hidden md:flex min-w-[300px] border-r min-h-screen">
            <Sidebar />
          </div>
          <main className="grid w-full h-full">
            <Header />

            <div className="container">
              <div className="card">
                <h1 className="titulo">{editando ? 'Editar Usuário' : 'Cadastrar Novo Usuário'}</h1>
                <form onSubmit={handleSubmit} className="formulario">
                  {erro && <p className="erro">{erro}</p>}
                  <input
                      type="text"
                      placeholder="Nome"
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      className="input"
                    />
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input"
                  />
                  <select
                    value={cargo}
                    onChange={(e) => setCargo(e.target.value)}
                    className="input"
                  >
                    <option value="">Selecione o Cargo</option>
                    <option value="professor">Professor</option>
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
                <div className='tabelaResp'>
                  {/* Tabela de Usuários */}
                  <table className="tabela">
                    <thead>
                      <tr>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Cargo</th>
                        <th>Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {usuariosFiltrados.map((usuario, index) => (
                        <tr key={usuario.id} className={index % 2 === 0 ? 'tabelaTrEven' : 'tabelaTrOdd'}>
                          <td>{usuario.name}</td>
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
          </main>

        </SidebarProvider >
      </div>
    </PrivateRoute>
  );
}
