import api from './api';

export const validateToken = async (token: string) => {
  try {
    // Realize uma requisição para o backend, passando o token no cabeçalho de autorização
    const response = await api.get('/user', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
    
  } catch (error) {
    return null;
  }
};
