import { axiosClient } from './axiosClient';

export const getGaleriList = () => axiosClient.get('/galeri');
export const getGaleriByPaket = (paketId) => axiosClient.get(`/galeri/paket/${paketId}`);
export const createGaleri = (formData) =>
  axiosClient.post('/galeri', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
export const updateGaleri = (id, data) => axiosClient.put(`/galeri/${id}`, data);
export const deleteGaleri = (id) => axiosClient.delete(`/galeri/${id}`);
