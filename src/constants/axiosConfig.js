import axios from "axios";

// Create an instance of axios with our baseUrl
const instance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URI
});

// Interceptor for addind the jwt to all requests
// instance.interceptors.request.use(config => {
//   config.headers.Authorization = `Bearer ${localStorage.getItem('jwt')}`;
//   return config;
// });

export default instance;