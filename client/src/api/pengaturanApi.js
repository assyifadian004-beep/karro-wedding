import { axiosClient } from './axiosClient';

export const getPengaturan = () => axiosClient.get('/pengaturan');
export const updatePengaturan = (data) => axiosClient.put('/pengaturan', data);
