import axios from "axios";
import config from "../constants/enviroment";

const api = axios.create({
  baseURL: config.baseUrl + "/api",
});
// Request interceptor
api.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

// Response interceptor
api.interceptors.response.use(
  (response) => response,

  (error) => {
    // Unauthorized
    if (error.response?.status === 401) {
      localStorage.removeItem("token");

      if (window.location.pathname !== "/") {
        window.location.href = "/";
      }

      return Promise.reject(
        new Error("انتهت صلاحية الجلسة، يرجى تسجيل الدخول مجدداً"),
      );
    }

    // السيرفر رد
    if (error.response) {
      const status = error.response.status;

      if (status >= 400 && status < 500) {
        return Promise.reject(
          new Error(
            error.response.data?.error ||
              error.response.data?.message ||
              "البيانات المدخلة غير صحيحة",
          ),
        );
      }

      if (status >= 500) {
        return Promise.reject(
          new Error("حدث خطأ في الخادم. يرجى المحاولة لاحقاً"),
        );
      }
    }

    // لا يوجد رد من السيرفر
    if (error.request) {
      return Promise.reject(
        new Error("تعذر الاتصال بالخادم. تحقق من الإنترنت"),
      );
    }

    return Promise.reject(new Error("حدث خطأ غير متوقع"));
  },
);

export default api;
