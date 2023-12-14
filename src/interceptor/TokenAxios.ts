import axios, { AxiosRequestConfig, AxiosRequestHeaders } from "axios";

interface AdaptAxiosRequestConfig extends AxiosRequestConfig {
  headers: AxiosRequestHeaders
}

export const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  (config): AdaptAxiosRequestConfig => {
    return config;
  },
  (error): any => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  async (response): Promise<any> => {
    return response;
  },
  async (error): Promise<any> => {
    return Promise.reject(error);
  }
);