import axios from 'axios';
import config from '../constants/enviroment';

const api = axios.create({
  baseURL: config.baseUrl,
});

api.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default api;
