// axiosInstance.js
import axios from 'axios';


const axiosInstance = axios.create({
  baseURL: 'https://petuk-server-five.vercel.app',
  
});

export default axiosInstance;
