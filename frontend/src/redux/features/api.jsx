import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/commerce',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    const message = error?.response?.data?.message;

    if (status === 500 && message === 'Token expired. Please log in again.') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/';
    } else if (status === 401 && message === 'Invalid token. Access denied.') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/';
    } else if (status === 401 && message === 'Token expired. Please log in again.') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/';
    } else if (status === 403 && message === 'Token expired. Please log in again.') {
      window.location.href = '/';
    }

    return Promise.reject(error);
  }
);

export default api;
