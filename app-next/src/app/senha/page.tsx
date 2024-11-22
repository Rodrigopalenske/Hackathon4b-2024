'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import './senha.css';

export default function RecuperarSenha() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Lógica fictícia para enviar e-mail de recuperação de senha
    if (email) {
      setMessage('Instruções para recuperar sua senha foram enviadas para o e-mail fornecido.');
    } else {
      setMessage('Por favor, insira um e-mail válido.');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Recuperar Senha</h1>
        <form onSubmit={handleSubmit} style={styles.form}>
          {message && <p style={styles.message}>{message}</p>}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />
          <button type="submit" style={styles.button}>Enviar Instruções</button>
        </form>
        <a href="/" style={styles.backToLogin}>Voltar para o Login</a>
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
  title: {
    fontSize: '2.5rem',
    color: '#0070f3',
    marginBottom: '1.5rem',
    fontWeight: '700',
    textAlign: 'center',
  },
  form: {
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
  button: {
    padding: '1rem',
    fontSize: '1.1rem',
    color: '#fff',
    backgroundColor: '#0070f3',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  message: {
    color: '#28a745', // Verde para mensagem de sucesso
    textAlign: 'center',
    marginBottom: '1rem',
    fontSize: '1rem',
  },
  backToLogin: {
    display: 'block',
    marginTop: '1rem',
    fontSize: '1rem',
    color: '#0070f3',
    textDecoration: 'none',
    transition: 'color 0.3s ease',
  },
};

