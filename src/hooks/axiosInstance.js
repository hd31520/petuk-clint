// axiosInstance.js
import axios from 'axios';

const token = localStorage.getItem('access-token');

const axiosInstance = axios.create({
  baseURL: 'https://petuk-server-five.vercel.app',
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  }
});

export default axiosInstance;
