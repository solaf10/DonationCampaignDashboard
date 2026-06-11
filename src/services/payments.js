import api from "./axios";

export const getPayments = async (detailUuid) => {
  const response = await api.post("/pending/store", {
    detail_uuid: detailUuid,
    project_uuid: null,
  });
  return response.data;
};
