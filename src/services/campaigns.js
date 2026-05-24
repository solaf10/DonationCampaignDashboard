import config from '../constants/enviroment';
import api from './axios';

export const getCampaigns = async () => {
  const res = await api.get(`/${config.campaigns.all}`);

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
      if ([400, 401, 403, 404, 422].includes(status)) {
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
      if ([400, 401, 403, 404, 422].includes(status)) {
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
