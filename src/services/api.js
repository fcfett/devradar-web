import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:3333' });

export const getDevs = () => api.get('/devs');

export const createDev = (data) => api.post('/devs', data);

export default api;
