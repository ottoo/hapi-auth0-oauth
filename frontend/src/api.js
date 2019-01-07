import axios from 'axios';

export const axiosInstance = axios.create({ withCredentials: true });

/**
 * Refresh the access token when an endpoint return 401 and retry the original request.
 */
axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      await axiosInstance.post(
        `${process.env.REACT_APP_BACKEND_URI}/refresh-token`
      );

      return axiosInstance(originalRequest);
    }

    return Promise.reject(error);
  }
);
