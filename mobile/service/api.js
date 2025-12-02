import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL: "http://10.80.91.238:3000",
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
      router.push("/auth")
    }
    return Promise.reject(error);
  }
);

export default api;
