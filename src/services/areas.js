import config from '../constants/enviroment';
import api from './axios';

export const getAreas = async () => {
  const res = await api.get(`/${config.areas.all}`);

  return res.data;
};
export const searchAreas = async (body) => {
  const res = await api.post(`/${config.areas.search}`, body);

  return res.data;
};
export const filterAreas = async (body) => {
  const res = await api.post(`/${config.areas.filter}`, body);

  return res.data;
};
export const addArea = async (body) => {
  try {
    const res = await api.post(`/${config.areas.add}`, body);
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
export const editArea = async (id, body) => {
  try {
    const res = await api.post(`/${config.areas.edit}/${id}`, body);
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
