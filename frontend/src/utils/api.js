import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
});

// Attach JWT token to every request
API.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

// Auth
export const registerUser = (data) => API.post('/auth/register', data);
export const loginUser = (data) => API.post('/auth/login', data);
export const getMe = () => API.get('/auth/me');

// Todos
export const getTodos = (params) => API.get('/todos', { params });
export const createTodo = (data) => API.post('/todos', data);
export const updateTodo = (id, data) => API.put(`/todos/${id}`, data);
export const deleteTodo = (id) => API.delete(`/todos/${id}`);
export const clearCompleted = () => API.delete('/todos/completed/clear');

export default API;