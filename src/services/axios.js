import axios from 'axios';
import config from '../constants/enviroment';

const api = axios.create({
  baseURL: config.baseUrl,
});

// Request interceptor
api.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

// Response interceptor
api.interceptors.response.use(
  (response) => response,

  (error) => {
    // إذا التوكين منتهي أو غير صالح
    if (error.response?.status === 401) {
      localStorage.removeItem('token');

      // تحويل للوغ إن
      window.location.href = '/';
    }

    return Promise.reject(error);
  },
);

export default api;
