import config from '../constants/enviroment';
import api from './axios';

export const getAreas = async () => {
  const res = await api.get(`/${config.areas.all}`);

  return res.data;
};
export const searchAreas = async (body) => {
  const res = await api.post(`/${config.areas.search}`, body);

  return res.data;
};
export const filterAreas = async (body) => {
  const res = await api.post(`/${config.areas.filter}`, body);

  return res.data;
};
export const addArea = async (body) => {
  const res = await api.post(`/${config.areas.add}`, body);
  return res.data;
};
export const editArea = async (id, body) => {
  const res = await api.post(`/${config.areas.edit}/${id}`, body);
  return res.data;
};
