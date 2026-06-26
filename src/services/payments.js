import api from "./axios";

export const getPayments = async () => {
  const response = await api.get("/pendings/all");
  return response.data;
};
export const getProjects = async () => {
  const response = await api.get("/pendings/projects");
  return response.data;
};
export const getDetails = async (id) => {
  const response = await api.get(`pendings/details/${id}`);
  return response.data;
};
export const addPayment = async (formData) => {
  const response = await api.post("pending/store", formData);
  return response.data;
};
export const editPayment = async ({ uuid, payload }) => {
  const response = await api.post(`/pending/update/${uuid}`, payload); // ← PUT صار POST
  return response.data;
};
export const filterPayments = async (filters) => {
  const response = await api.post("/pendings/filter", filters);
  return response.data;
};
export const getAllDetails = async () => {
  const response = await api.get("/details/all");
  return response.data;
};
