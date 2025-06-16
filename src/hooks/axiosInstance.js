// axiosInstance.js
import axios from 'axios';

const token = localStorage.getItem('access-token');

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  }
});

export default axiosInstance;
