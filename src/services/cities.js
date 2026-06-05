import config from '../constants/enviroment';
import api from './axios';

export const getCities = async () => {
  const res = await api.get(`/${config.cities.all}`);

  return res.data;
};
export const searchCities = async (body) => {
  const res = await api.post(`/${config.cities.search}`, body);

  return res.data;
};
export const filterCitiesByGovernment = async (body) => {
  const res = await api.post(`/${config.cities.filter}`, body);

  return res.data;
};
export const addCity = async (body) => {
  const res = await api.post(`/${config.cities.add}`, body);
  return res.data;
};
export const editCity = async (id, body) => {
  const res = await api.post(`/${config.cities.edit}/${id}`, body);
  return res.data;
};
