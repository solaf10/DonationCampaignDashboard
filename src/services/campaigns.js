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
export const searchCampaigns = async (body) => {
  const res = await api.post(`/${config.campaigns.search}`, body);

  return res.data;
};
export const filterCampaigns = async (body) => {
  const res = await api.post(`/${config.campaigns.filter}`, body);

  return res.data;
};
export const addCampaign = async (body) => {
  try {
    const res = await api.post(`/${config.campaigns.add}`, body);
    return res.data;
  } catch (error) {
    // السيرفر رد
    if (error.response) {
      const status = error.response.status;

      // أخطاء إدخال/فاليديشن
      if (status >= 400 && status < 500) {
        throw new Error(
          error.response.data?.error || 'البيانات المدخلة غير صحيحة',
        );
      }

      // أخطاء السيرفر
      if (status >= 500) {
        throw new Error('حدث خطأ في الخادم. يرجى المحاولة لاحقًا');
      }
    }

    // مشكلة نت
    if (error.request) {
      throw new Error('تعذر الاتصال بالخادم. تحقق من الإنترنت');
    }

    // أي خطأ ثاني
    throw new Error('حدث خطأ غير متوقع');
  }
};
export const editCampaign = async (id, body) => {
  try {
    const res = await api.post(`/${config.campaigns.edit}/${id}`, body);
    return res.data;
  } catch (error) {
    // السيرفر رد
    if (error.response) {
      const status = error.response.status;

      // أخطاء إدخال/فاليديشن
      if (status >= 400 && status < 500) {
        throw new Error(
          error.response.data?.error || 'البيانات المدخلة غير صحيحة',
        );
      }

      // أخطاء السيرفر
      if (status >= 500) {
        throw new Error('حدث خطأ في الخادم. يرجى المحاولة لاحقًا');
      }
    }

    // مشكلة نت
    if (error.request) {
      throw new Error('تعذر الاتصال بالخادم. تحقق من الإنترنت');
    }

    // أي خطأ ثاني
    throw new Error('حدث خطأ غير متوقع');
  }
};
export const addProjectsToCampaign = async (id, body) => {
  try {
    const res = await api.post(`/${config.campaigns.addProjects}/${id}`, body);
    return res.data;
  } catch (error) {
    // السيرفر رد
    if (error.response) {
      const status = error.response.status;

      // أخطاء إدخال/فاليديشن
      if (status >= 400 && status < 500) {
        throw new Error(
          error.response.data?.error || 'البيانات المدخلة غير صحيحة',
        );
      }

      // أخطاء السيرفر
      if (status >= 500) {
        throw new Error('حدث خطأ في الخادم. يرجى المحاولة لاحقًا');
      }
    }

    // مشكلة نت
    if (error.request) {
      throw new Error('تعذر الاتصال بالخادم. تحقق من الإنترنت');
    }

    // أي خطأ ثاني
    throw new Error('حدث خطأ غير متوقع');
  }
};
