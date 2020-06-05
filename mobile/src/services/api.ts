import axios from 'axios';

const api = axios.create({
  baseURL: '<your ip here>:3333'
});

export default api;