'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import './dashboard.css'; // Estilos centralizados

export default function Home() {
  const router = useRouter();
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications] = useState([
    { id: 1, message: 'Bem-vindo à plataforma!' },
    { id: 2, message: 'Atualização do sistema disponível.' },
    { id: 3, message: 'Novo recurso de segurança ativado.' },
  ]);

  // Simulação de autenticação (substitua com a lógica real)
  const isAuthenticated = typeof window !== 'undefined' && localStorage.getItem('auth_token');

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login'); // Redireciona para login se não estiver autenticado
    }
  }, [isAuthenticated, router]);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Página Inicial</h1>
      <p>Bem-vindo à página inicial! Você está autenticado e pode acessar o conteúdo.</p>

      {/* Botão de notificações com ícone */}
      <button className="notification-button" onClick={toggleNotifications}>
        <span className="notification-icon">🔔</span> {/* Ícone de sino */}
      </button>

      {/* Lista de notificações */}
      {showNotifications && (
        <div className="notification-box">
          {notifications.length > 0 ? (
            <ul className="notification-list">
              {notifications.map((notification) => (
                <li key={notification.id} className="notification-item">
                  {notification.message}
                </li>
              ))}
            </ul>
          ) : (
            <p className="notification-empty">Nenhuma notificação no momento.</p>
          )}
        </div>
      )}
    </div>
  );
}
