import axios from 'axios';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL: apiUrl, // URL base da sua API
});

export default api;