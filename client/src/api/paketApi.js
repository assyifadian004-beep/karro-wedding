import { axiosClient } from './axiosClient';

export const getPaketList = () => axiosClient.get('/paket');
export const getPaketBySlug = (slug) => axiosClient.get(`/paket/${slug}`);
export const createPaket = (formData) =>
  axiosClient.post('/paket', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
export const updatePaket = (id, formData) =>
  axiosClient.put(`/paket/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
export const deletePaket = (id) => axiosClient.delete(`/paket/${id}`);
