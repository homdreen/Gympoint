import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.5.111:3333',
});

export default api;
