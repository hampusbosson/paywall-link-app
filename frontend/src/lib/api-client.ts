import axios, { InternalAxiosRequestConfig } from "axios";

// Extend InternalAxiosRequestConfig to include requiresAuth
interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
    requiresAuth?: boolean;
}


export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true,
});


console.log("API URL:", import.meta.env.VITE_BACKEND_URL);

const authRequestInterceptor = (config: CustomAxiosRequestConfig) => {
    if (config.headers) {
        config.headers.Accept = "application/json";
    }

    return config;
}

apiClient.interceptors.request.use(authRequestInterceptor);

