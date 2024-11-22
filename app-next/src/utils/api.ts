import axios from 'axios';
import { getCsrfToken } from './csrf';

// Criação de uma instância Axios
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true, // Habilita cookies para autenticação e CSRF.
});

// Interceptor para adicionar o token CSRF em todas as requisições
api.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('auth_token'); // Recupera o token do localStorage
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Adiciona o token no cabeçalho da requisição
    }
    const csrfToken = await getCsrfToken(); // Adiciona o token CSRF, se necessário
    config.headers['X-CSRF-TOKEN'] = csrfToken;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
