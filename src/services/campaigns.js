import config from '../constants/enviroment';
import api from './axios';

export const getCampaigns = async () => {
  const res = await api.get(`/${config.campaigns.all}`);

  return res.data;
};
export const getCampaignsTrash = async () => {
  const res = await api.get(`/${config.campaigns.trash}`);

  return res.data;
};
export const changeState = async (url) => {
  const res = await api.get(url);

  return res.data;
};
export const getStatus = async () => {
  const res = await api.get(`/${config.campaigns.status}`);

  return res.data;
};
export const getSingleCampaign = async (id) => {
  const res = await api.get(`/${config.campaigns.campaignDetails}/${id}`);

  return res.data;
};
export const filterCampaigns = async (body) => {
  const res = await api.post(`/${config.campaigns.filter}`, body);

  return res.data;
};
export const addCampaign = async (body) => {
  const res = await api.post(`/${config.campaigns.add}`, body);
  return res.data;
};
export const editCampaign = async (id, body) => {
  const res = await api.post(`/${config.campaigns.edit}/${id}`, body);
  return res.data;
};
export const addProjectsToCampaign = async (id, body) => {
  const res = await api.post(`/${config.campaigns.addProjects}/${id}`, body);
  return res.data;
};
