import config from '../constants/enviroment';
import api from './axios';

export const getProjects = async () => {
  const res = await api.get(`/${config.projects.all}`);

  return res.data;
};
export const getUnAttachedProjects = async () => {
  const res = await api.get(`/${config.projects.unattached}`);

  return res.data;
};
export const getFundingSources = async () => {
  const res = await api.get(`/${config.projects.fundingSources}`);

  return res.data;
};
export const getSectors = async () => {
  const res = await api.get(`/${config.projects.sectors}`);

  return res.data;
};
export const getStatus = async () => {
  const res = await api.get(`/${config.projects.status}`);

  return res.data;
};
export const getSingleProject = async (id) => {
  const res = await api.get(`/${config.projects.projectDetails}/${id}`);

  return res.data;
};
export const getProjectDetails = async (id) => {
  const res = await api.get(`/${config.projects.details.all}/${id}`);

  return res.data;
};

export const searchProjects = async (body) => {
  const res = await api.post(`/${config.projects.search}`, body);

  return res.data;
};
export const filterProjects = async (body) => {
  const res = await api.post(`/${config.projects.filter}`, body);

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
export const uploadProjectMedia = async (id, body) => {
  const res = await api.post(`/${config.projects.media.upload}/${id}`, body);
  return res.data;
};
export const addCampaignToProject = async (id, body) => {
  const res = await api.post(`/${config.projects.addCampaign}/${id}`, body);
  return res.data;
};
