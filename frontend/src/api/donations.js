import API from './axios';

export const createDonation = async (donationData) => {
  const response = await API.post('/donations/', donationData);
  return response.data;
};

export const getAllDonations = async () => {
  const response = await API.get('/donations/all/');
  return response.data;
};

export const getUserDonations = async () => {
  const response = await API.get('/donations/user/');
  return response.data;
};