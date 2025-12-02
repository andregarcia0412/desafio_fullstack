import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const api = axios.create({
  baseURL: "https://desafiofullstack-production.up.railway.app",
});

api.interceptors.request.use(async (config) => {
  const user_data = await AsyncStorage.getItem("user_data");
  if (user_data) {
    config.headers.Authorization = `Bearer ${JSON.parse(user_data).token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status == 401) {
      await AsyncStorage.removeItem("user_data");
    }
    return Promise.reject(error);
  }
);

export default api;
