'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Simulação de login (substitua por lógica real de login)
    if (email === 'admin@gmail.com' && senha === '123456') {
      // Armazenando um token fictício para simulação de autenticação
      localStorage.setItem('auth_token', 'some_token');
      router.push('/dashboard'); // Redireciona para a página inicial após o login
    } else {
      setErro('Credenciais inválidas.');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.titulo}>Login</h1>
        <form onSubmit={handleSubmit} style={styles.formulario}>
          {erro && <p style={styles.erro}>{erro}</p>}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            style={styles.input}
          />
          <button type="submit" style={styles.botao}>
            Entrar
          </button>
        </form>
        <a href="/senha" style={styles.esqueceuSenha}>Esqueceu a senha?</a>
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f7f7f7', // Fundo claro
  },
  card: {
    backgroundColor: '#fff',
    padding: '3rem',
    width: '100%',
    maxWidth: '420px',
    borderRadius: '15px',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)', // Sombra forte para dar a impressão de flutuação
    transform: 'translateY(-10px)', // Levanta o cartão um pouco
    transition: 'transform 0.3s ease, box-shadow 0.3s ease', // Transição suave para hover
    textAlign: 'center', // Garantir que o texto no card esteja centralizado
  },
  titulo: {
    fontSize: '2.5rem',
    color: '#0070f3',
    marginBottom: '1.5rem',
    fontWeight: '700',
    textAlign: 'center', // Garantir que o título esteja centralizado
  },
  formulario: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  input: {
    padding: '1rem',
    fontSize: '1.1rem',
    borderRadius: '8px',
    border: '1px solid #ddd',
    outline: 'none',
    color: '#333', // Cor do texto dentro do campo de entrada
    backgroundColor: '#f9f9f9', // Cor de fundo do campo de entrada
    transition: 'border-color 0.3s ease, background-color 0.3s ease',
  },
  inputFocus: {
    borderColor: '#0070f3', // Cor do foco no campo de entrada
    backgroundColor: '#eaf4ff', // Mudança de cor de fundo quando em foco
  },
  botao: {
    padding: '1rem',
    fontSize: '1.1rem',
    color: '#fff',
    backgroundColor: '#0070f3',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  botaoHover: {
    backgroundColor: '#005bb5', // Cor mais escura no hover
  },
  erro: {
    color: '#ff0000',
    textAlign: 'center',
    marginBottom: '1rem',
    fontSize: '1rem',
  },
  esqueceuSenha: {
    display: 'block',
    marginTop: '1rem',
    fontSize: '1rem',
    color: '#0070f3',
    textDecoration: 'none',
    transition: 'color 0.3s ease',
  },
  esqueceuSenhaHover: {
    color: '#005bb5', // Cor mais escura ao passar o mouse
  },
};
