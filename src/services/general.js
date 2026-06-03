import api from './axios';

export const deleteItem = async (url) => {
  const res = await api.get(url);

  return res.data;
};
