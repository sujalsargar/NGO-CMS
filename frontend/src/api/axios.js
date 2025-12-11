import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

API.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.access) {
    config.headers.Authorization = `Bearer ${user.access}`;
  }
  return config;
});

export default API;