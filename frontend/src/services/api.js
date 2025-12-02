import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

api.interceptors.request.use((config) => {
  const user_data = localStorage.getItem("user_data");
  if (user_data) {
    config.headers.Authorization = `Bearer ${JSON.parse(user_data).token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status == 401) {
      localStorage.removeItem("user_data");
      window.location.href = "/auth";
    }
    return Promise.reject(error);
  }
);

export default api;
