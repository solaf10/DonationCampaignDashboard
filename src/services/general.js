import api from './axios';

export const deleteItem = async (url) => {
  try {
    const res = await api.get(url);

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
