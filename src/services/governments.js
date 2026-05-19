import config from '../constants/enviroment';
import api from './axios';

export const getGovernments = async () => {
  const res = await api.get(`/${config.governments.all}`);

  return res.data;
};
export const searchGovernments = async (body) => {
  const res = await api.post(`/${config.governments.search}`, body);

  return res.data;
};
