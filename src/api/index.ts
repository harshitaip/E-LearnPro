import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios';
import { LOCAL_STORAGE_KEYS } from '../utils/constants';
import { storage, isTokenExpired } from '../utils/helpers';

// Create axios instance with base configuration
const createApiClient = (): AxiosInstance => {
  const client = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api',
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Request interceptor to add auth token
  client.interceptors.request.use(
    (config) => {
      const token = storage.get<string>(LOCAL_STORAGE_KEYS.AUTH_TOKEN);
      
      if (token && !isTokenExpired(token)) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor for error handling and token refresh
  client.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;

      // Handle 401 errors (token expired or invalid)
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const refreshToken = storage.get<string>(LOCAL_STORAGE_KEYS.REFRESH_TOKEN);
          
          if (refreshToken && !isTokenExpired(refreshToken)) {
            const response = await axios.post(
              `${import.meta.env.VITE_API_BASE_URL}/auth/refresh`,
              { refreshToken }
            );

            const { accessToken, refreshToken: newRefreshToken } = response.data;
            
            // Update tokens in storage
            storage.set(LOCAL_STORAGE_KEYS.AUTH_TOKEN, accessToken);
            if (newRefreshToken) {
              storage.set(LOCAL_STORAGE_KEYS.REFRESH_TOKEN, newRefreshToken);
            }

            // Retry original request with new token
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            return client(originalRequest);
          }
        } catch (refreshError) {
          // Refresh failed, redirect to login
          storage.remove(LOCAL_STORAGE_KEYS.AUTH_TOKEN);
          storage.remove(LOCAL_STORAGE_KEYS.REFRESH_TOKEN);
          window.location.href = '/login';
          return Promise.reject(refreshError);
        }
      }

      // Handle network errors
      if (!error.response) {
        return Promise.reject(new Error('Network error. Please check your connection.'));
      }

      // Handle other HTTP errors
      const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
      return Promise.reject(new Error(errorMessage));
    }
  );

  return client;
};

// Create singleton instance
const apiClient = createApiClient();

// Generic API methods
export const api = {
  get: <T = any>(url: string, config?: AxiosRequestConfig): Promise<T> =>
    apiClient.get(url, config).then(response => response.data),

  post: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> =>
    apiClient.post(url, data, config).then(response => response.data),

  put: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> =>
    apiClient.put(url, data, config).then(response => response.data),

  patch: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> =>
    apiClient.patch(url, data, config).then(response => response.data),

  delete: <T = any>(url: string, config?: AxiosRequestConfig): Promise<T> =>
    apiClient.delete(url, config).then(response => response.data),

  upload: <T = any>(url: string, formData: FormData, onUploadProgress?: (progress: number) => void): Promise<T> =>
    apiClient.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (onUploadProgress && progressEvent.total) {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onUploadProgress(progress);
        }
      },
    }).then(response => response.data),
};

export default apiClient;
