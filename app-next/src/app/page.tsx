'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/utils/api';


export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await api.post('/login', {
      'email': email,
      'senha': senha
    })
    .then((response) => {
      console.log(response)
      const token = response.data.token;
      const usuarioNome = response.data.usuario['nome'];
      const usuarioEmail = response.data.usuario['email'];
      const usuarioCargo = response.data.usuario['cargo'];
      setErro('')
      setSenha('')
      localStorage.setItem('auth_token', token);
      localStorage.setItem('nome', usuarioNome);
      localStorage.setItem('email', usuarioEmail);
      localStorage.setItem('cargo', usuarioCargo);

      router.push('/dashboard')
      })
      .catch((error) => {
        setSenha('')
        setErro(error.response.data.mensagem)
      })
    
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
    backgroundColor: '#f7f7f7', 
  },
  card: {
    backgroundColor: '#fff',
    padding: '3rem',
    width: '100%',
    maxWidth: '420px',
    borderRadius: '15px',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)', 
    transform: 'translateY(-10px)', 
    transition: 'transform 0.3s ease, box-shadow 0.3s ease', 
    textAlign: 'center', 
  },
  titulo: {
    fontSize: '2.5rem',
    color: '#0070f3',
    marginBottom: '1.5rem',
    fontWeight: '700',
    textAlign: 'center', 
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
    color: '#333', 
    backgroundColor: '#f9f9f9', 
    transition: 'border-color 0.3s ease, background-color 0.3s ease',
  },
  inputFocus: {
    borderColor: '#0070f3', 
    backgroundColor: '#eaf4ff', 
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
    backgroundColor: '#005bb5', 
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
    color: '#005bb5', 
  },
};
