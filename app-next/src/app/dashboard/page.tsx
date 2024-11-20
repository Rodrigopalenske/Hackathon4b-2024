// src/app/page.tsx
'use client'; // Adicione isso no topo do arquivo para marcar como componente do lado do cliente

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  // Simulação de verificação de autenticação (substitua com a lógica real)
  const isAuthenticated = typeof window !== "undefined" && localStorage.getItem("auth_token");

  useEffect(() => {
    if (!isAuthenticated) {
      // Se não estiver autenticado, redireciona para a página de login
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Página Inicial</h1>
      <p>Bem-vindo à página inicial! Você está autenticado e pode acessar o conteúdo.</p>
    </div>
  );
}

// Estilos para a página
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    background: 'linear-gradient(135deg, #00aaff, #0070f3)', // Gradiente de azul
  },
  title: {
    fontSize: '2.2rem',
    color: '#fff',
    textAlign: 'center',
    marginBottom: '1.5rem',
    fontWeight: '600',
  },
};
