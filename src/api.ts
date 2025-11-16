import Cookies from 'js-cookie';
import axios from 'axios';

const API_BASE = 'https://api.escuelajs.co/api/v1';

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach access token from localStorage (or memory via AuthContext)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

interface QueueItem {
  resolve: (token: string | null) => void;
  reject: (error: unknown) => void;
}

let isRefreshing = false;
let failedQueue: QueueItem[] = [];

const processQueue = (error: unknown, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      // try refresh
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = 'Bearer ' + token;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Fetch refresh token from cookie
        const refreshToken = Cookies.get('refresh_token');
        // If you had httpOnly cookie set by server, you would call endpoint without sending body token
        const res = await axios.post(`${API_BASE}/auth/refresh-token`, { refresh_token: refreshToken });
        const { access_token, refresh_token } = res.data;

        // store new tokens
        localStorage.setItem('access_token', access_token);
        Cookies.set('refresh_token', refresh_token, { expires: 7, sameSite: 'lax' });

        api.defaults.headers.common.Authorization = 'Bearer ' + access_token;
        processQueue(null, access_token);
        return api(originalRequest);
      } catch (err) {
        processQueue(err, null);
        // if refresh fails, redirect to login (handled by caller)
        localStorage.removeItem('access_token');
        Cookies.remove('refresh_token');
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export default api;
