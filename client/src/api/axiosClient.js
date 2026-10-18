import axios from 'axios';
import { mockFor } from './mockData';

export const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

const useMock = import.meta.env.VITE_USE_MOCK === 'true';

axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config, response } = error;
    const mockable = useMock && response?.status !== 401;
    if (mockable && config?.method === 'get') {
      const data = mockFor(config.url || '');
      if (data) {
        console.warn(`[mock] ${config.url}`);
        return { data, status: 200, statusText: 'OK (mock)', headers: {}, config };
      }
    }
    if (mockable && config?.method === 'post' && config.url === '/booking') {
      console.warn('[mock] POST /booking');
      return { data: { message: 'Permintaan booking diterima (mode mock).' }, status: 201, statusText: 'Created (mock)', headers: {}, config };
    }
    throw error;
  },
);
