import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// Create axios instance for auth
const authAPI = axios.create({
  baseURL: API_URL,
});

// Function to refresh token
const refreshToken = async () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user || !user.refresh) return null;

  try {
    const response = await authAPI.post('/auth/token/refresh/', {
      refresh: user.refresh,
    });
    
    const updatedUser = {
      ...user,
      access: response.data.access,
      refresh: response.data.refresh,
    };
    
    localStorage.setItem('user', JSON.stringify(updatedUser));
    return updatedUser;
  } catch (error) {
    console.error('Token refresh failed:', error);
    localStorage.removeItem('user');
    return null;
  }
};

// Add request interceptor to attach token
authAPI.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.access) {
      config.headers.Authorization = `Bearer ${user.access}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle token expiration
authAPI.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // If token expired (401), try to refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      const refreshedUser = await refreshToken();
      if (refreshedUser) {
        // Retry the original request with new token
        originalRequest.headers.Authorization = `Bearer ${refreshedUser.access}`;
        return authAPI(originalRequest);
      }
    }
    
    return Promise.reject(error);
  }
);

export const register = async (userData) => {
  const response = await authAPI.post('/auth/register/', userData);
  return response.data;
};

export const login = async (credentials) => {
  const response = await authAPI.post('/auth/login/', credentials);
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('user');
};

export const getCurrentUser = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user;
};