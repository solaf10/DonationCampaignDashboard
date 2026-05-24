import config from '../constants/enviroment';
import api from './axios';

export const getProjects = async () => {
  const res = await api.get(`/${config.projects.all}`);

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
export const deletedProject = async (id) => {
  const res = await api.get(`/${config.projects.delete}/${id}`);

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
  try {
    const res = await api.post(`/${config.projects.add}`, body);
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
export const editProject = async (id, body) => {
  try {
    const res = await api.post(`/${config.projects.edit}/${id}`, body);
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
