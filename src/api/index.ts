import axios from "axios";
import { BASE_URL_API } from "config";
import {
  REFRESH_TOKEN_CACHE_KEY,
  TOKEN_CACHE_KEY,
} from "contexts/AuthProvider";
import queryString from "query-string";

const axiosClient = axios.create({
  baseURL: BASE_URL_API,
  headers: {
    "content-type": "application/json; charset=utf-8",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

// Handle request
axiosClient.interceptors.request.use(async (config) => {
  // ..Handle token
  const token = localStorage.getItem(TOKEN_CACHE_KEY);
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Handle response
axiosClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem(TOKEN_CACHE_KEY);
      localStorage.removeItem(REFRESH_TOKEN_CACHE_KEY);
      window.location.href = "/";
    }
    throw error;
  }
);

export default axiosClient;
