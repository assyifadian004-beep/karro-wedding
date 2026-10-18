import { axiosClient } from './axiosClient';

export const getTestimoniList = () => axiosClient.get('/testimoni');
export const createTestimoni = (formData) =>
  axiosClient.post('/testimoni', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
export const updateTestimoni = (id, formData) =>
  axiosClient.put(`/testimoni/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
export const deleteTestimoni = (id) => axiosClient.delete(`/testimoni/${id}`);
