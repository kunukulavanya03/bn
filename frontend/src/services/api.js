import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect to login
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Authentication
export const login = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });
  if (response.data.access_token) {
    localStorage.setItem('token', response.data.access_token);
  }
  return response.data;
};

export const register = async (email, username, password) => {
  const response = await api.post('/auth/register', { email, username, password });
  if (response.data.access_token) {
    localStorage.setItem('token', response.data.access_token);
  }
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('token');
  window.location.href = '/login';
};

// API Endpoints
export const api_register = async (data) => {
  const response = await api.post('/api/register', data);
  return response.data;
};
export const api_login = async (data) => {
  const response = await api.post('/api/login', data);
  return response.data;
};
export const api_password_reset = async (data) => {
  const response = await api.post('/api/password_reset', data);
  return response.data;
};
export const api_data = async (params = {}) => {
  const response = await api.get('/api/data', { params });
  return response.data;
};
export const api_data = async (data) => {
  const response = await api.post('/api/data', data);
  return response.data;
};
export const api_data_{id} = async (id, data) => {
  const response = await api.put(`/api/data/{id}/${id}`, data);
  return response.data;
};
export const api_data_{id} = async (id) => {
  const response = await api.delete(`/api/data/{id}/${id}`);
  return response.data;
};

export default api;
