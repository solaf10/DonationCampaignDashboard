import config from '../constants/enviroment';
import api from './axios';

export const getNews = async () => {
  const res = await api.get(`/${config.news.all}`);

  return res.data;
};
export const getNewsTrash = async () => {
  const res = await api.get(`/${config.news.trash}`);

  return res.data;
};
export const getCategories = async () => {
  const res = await api.get(`/${config.news.categories}`);

  return res.data;
};
export const getSingleNews = async (id) => {
  const res = await api.get(`/${config.news.newsDetails}/${id}`);

  return res.data;
};
export const filterNews = async (body) => {
  const res = await api.post(`/${config.news.filter}`, body);

  return res.data;
};
export const addProject = async (body) => {
  const res = await api.post(`/${config.projects.add}`, body);
  return res.data;
};
export const editProject = async (id, body) => {
  const res = await api.post(`/${config.projects.edit}/${id}`, body);
  return res.data;
};
export const addProjectDetail = async (id, body) => {
  const res = await api.post(`/${config.projects.details.add}/${id}`, body);
  return res.data;
};
export const editProjectDetail = async (id, body) => {
  const res = await api.post(`/${config.projects.details.edit}/${id}`, body);
  return res.data;
};
export const uploadNewsMedia = async (id, body) => {
  const res = await api.post(`/${config.news.media.upload}/${id}`, body);
  return res.data;
};
export const addCampaignToProject = async (id, body) => {
  const res = await api.post(`/${config.projects.addCampaign}/${id}`, body);
  return res.data;
};
