import axios from "axios";

let accessToken: string | null = null;

export const setAccessToken = (
  token: string | null
) => {
  accessToken = token;
};

const axiosClient = axios.create({
  baseURL: "http://10.0.2.2:8080",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(
  (config) => {
    if (accessToken) {
      config.headers.Authorization =
        `Bearer ${accessToken}`;
    }

    console.log(
      "API REQUEST:",
      config.method,
      config.url
    );

    console.log(
      "AUTH TOKEN:",
      accessToken ? "EXISTS" : "NULL"
    );

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosClient;