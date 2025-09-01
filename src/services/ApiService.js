import axios from "axios";
import authService from "./AuthService";
import { toast } from "sonner";

// Create an axios instance
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080/api", // adjust as needed
    timeout: 10000,
});

// Request interceptor -> attach token
axiosInstance.interceptors.request.use(
    (config) => {
        if (authService.token) {
            config.headers.Authorization = `Bearer ${authService.token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor -> handle 401 globally
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // authService.logout();
            // window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export const ApiService = {
    get: async (url, params = {}) => {
        try {
            const res = await axiosInstance.get(url, { params });
            return res.data;
        } catch (err) {
            toast.error(err.response?.data?.message || "Something went wrong");
            throw err;
        }
    },

    post: async (url, data = {}) => {
        try {
            const res = await axiosInstance.post(url, data);
            return res.data;
        } catch (err) {
            toast.error(err.response?.data?.message || "Something went wrong");
            throw err;
        }
    },

    put: async (url, data = {}) => {
        try {
            const res = await axiosInstance.put(url, data);
            return res.data;
        } catch (err) {
            toast.error(err.response?.data?.message || "Something went wrong");
            throw err;
        }
    },

    delete: async (url) => {
        try {
            const res = await axiosInstance.delete(url);
            return res.data;
        } catch (err) {
            toast.error(err.response?.data?.message || "Something went wrong");
            throw err;
        }
    },
};
