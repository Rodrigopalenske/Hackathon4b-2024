import axios from 'axios';

// Função para buscar o CSRF token da API
export const getCsrfToken = async (): Promise<string> => {
  const response = await axios.get(
    process.env.NEXT_PUBLIC_API_URL + '/csrf-token', {
    withCredentials: true, // Garante o envio de cookies.
  });
  return response.data.csrf_token;
};
