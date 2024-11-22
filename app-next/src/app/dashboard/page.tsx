'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
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
