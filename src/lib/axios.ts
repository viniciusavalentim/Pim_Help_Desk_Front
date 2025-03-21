/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

// Configurar a instância do Axios
export const api = axios.create({
  baseURL: 'https://localhost:7037',
});


api.interceptors.request.use(
  (config: any) => {
    const accessToken = localStorage.getItem('@pim:accessToken');
    if (accessToken) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);



export default api;
