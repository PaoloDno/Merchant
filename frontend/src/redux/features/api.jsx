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
    if (error.response.status === 500 && error.response.message === 'Token expired. Please log in again.') {
      localStorage.removeItem('token');
      window.location.href = '/login'; // Redirect landing page
    } else if (error.response.status === 403) {
      window.location.href = '/'; // Not really expired just redirecting to login or landing page
    }
    return Promise.reject(error);
  }
);


export default api;