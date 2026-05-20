import config from '../constants/enviroment';
import api from './axios';

export const getCities = async () => {
  const res = await api.get(`/${config.cities.all}`);

  return res.data;
};
export const searchCities = async (body) => {
  const res = await api.post(`/${config.cities.search}`, body);

  return res.data;
};
export const filterCitiesByGovernment = async (body) => {
  const res = await api.post(`/${config.cities.filter}`, body);

  return res.data;
};
export const addCity = async (body) => {
  try {
    const res = await api.post(`/${config.cities.add}`, body);
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
export const editCity = async (id, body) => {
  try {
    const res = await api.post(`/${config.cities.edit}/${id}`, body);
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
