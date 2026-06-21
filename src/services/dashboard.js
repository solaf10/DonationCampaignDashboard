import config from "../constants/enviroment";
import api from "./axios";

export const getDashboardData = async () => {
  const res = await api.get(`/${config.dashboard}`);
  return res.data;
};