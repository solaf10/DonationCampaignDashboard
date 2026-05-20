import config from '../constants/enviroment';
import api from './axios';

export const getGovernments = async () => {
  const res = await api.get(`/${config.governments.all}`);

  return res.data;
};
export const searchGovernments = async (body) => {
  const res = await api.post(`/${config.governments.search}`, body);

  return res.data;
};
export const addGovernment = async (body) => {
  try {
    const res = await api.post(`/${config.governments.add}`, body);
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
export const editGovernment = async (id, body) => {
  try {
    const res = await api.post(`/${config.governments.edit}/${id}`, body);
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
