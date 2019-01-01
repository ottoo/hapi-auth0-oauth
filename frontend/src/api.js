import axios from 'axios';

export const axiosInstance = axios.create({ withCredentials: true });

/**
 * Set access token in the header for each request.
 */
axiosInstance.interceptors.request.use(
  config => {
    config.headers.authorization = localStorage.getItem('access_token');
    return config;
  },
  error => Promise.reject(error)
);

/**
 * Refresh the access token when an endpoint return 401 and retry the original request.
 */
axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const {
        data: { access_token }
      } = await axiosInstance.post(
        `${process.env.REACT_APP_BACKEND_URI}/refresh-token`
      );

      localStorage.setItem('access_token', access_token);
      originalRequest.headers.authorization = access_token;

      return axiosInstance(originalRequest);
    }

    return Promise.reject(error);
  }
);
