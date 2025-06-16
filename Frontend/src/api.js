import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000/api',
});
// this is file
export const getAllUsers = () => API.get('/users');
export const getPermissionsList = () => API.get('/permissions');
export const getUserPermissions = (id) => API.get(`/users/${id}/permissions`);
export const updateUserPermissions = (id, permissions) =>
  API.put(`/users/${id}/permissions`, { permissions });

export const loginUser = (credentials) => API.post('/auth/login', credentials);
