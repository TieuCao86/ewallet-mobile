import axios from "axios";
import * as SecureStore from "expo-secure-store";

const axiosClient = axios.create({
  baseURL: "http://10.0.2.2:8080",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});


axiosClient.interceptors.request.use(
  async (config) => {

    const token = await SecureStore.getItemAsync(
      "userToken"
    );

    if (token) {
      config.headers.Authorization =
        `Bearer ${token}`;
    }

    console.log(
      "API REQUEST:",
      config.method,
      config.url
    );

    console.log(
      "AUTH TOKEN:",
      token ? "EXISTS" : "NULL"
    );

    return config;
  },
  error => Promise.reject(error)
);


export default axiosClient;