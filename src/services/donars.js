import config from '../constants/enviroment';
import api from './axios';

export const getDonars = async (url) => {
  const res = await api.get(url);

  return res.data;
};
export const getSingleDonar = async (id) => {
  const res = await api.get(`/${config.donars.donarDetails}/${id}`);

  return res.data;
};
export const getPaycheck = async (id) => {
  const res = await api.get(`/${config.donars.paycheck}/${id}`);

  return res.data;
};
export const verifyPaycheck = async (id, body) => {
  const res = await api.post(`/${config.donars.verify}/${id}`, body);

  return res.data;
};
export const filterDonars = async (body) => {
  const res = await api.post(`/${config.donars.filter}`, body);

  return res.data;
};
