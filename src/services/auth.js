import config from '../constants/enviroment';
import api from './axios';

export const login = async (body) => {
  const res = await api.post(`/${config.login}`, body);
  return res.data;
};
export const logout = async () => {
  const res = await api.get(`/${config.logout}`);
  return res.data;
};
