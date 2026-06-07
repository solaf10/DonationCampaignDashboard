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
export const filterCampaigns = async (body) => {
  const res = await api.post(`/${config.campaigns.filter}`, body);

  return res.data;
};
