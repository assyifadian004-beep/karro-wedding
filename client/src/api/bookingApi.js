import { axiosClient } from './axiosClient';

export const createBooking = (data) => axiosClient.post('/booking', data);
export const getBookingList = () => axiosClient.get('/booking');
