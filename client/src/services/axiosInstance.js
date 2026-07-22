import axios from "axios";

const apiClient = axios.create({
  baseURL: "/api",
  timeout: 10000,

  headers: {
    Accept: "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem("token");

    if (token) {
      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    return response.data;
  },

  (error) => {
    let message =
      "Đã xảy ra lỗi không xác định";

    if (error.response) {
      message =
        error.response.data?.message ||
        `Yêu cầu thất bại (${error.response.status})`;
    } else if (error.request) {

      message =
        "Không thể kết nối đến server";
    } else {
      message =
        error.message ||
        "Không thể gửi yêu cầu";
    }

    const apiError = new Error(message);
    
    apiError.status =
      error.response?.status || null;

    apiError.data =
      error.response?.data || null;

    return Promise.reject(apiError);
  }
);

export default apiClient;