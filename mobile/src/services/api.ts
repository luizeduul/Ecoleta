import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333' //your ip here
});

export default api;