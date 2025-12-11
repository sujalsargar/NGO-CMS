import API from './axios';

export const createVolunteer = async (volunteerData) => {
  const response = await API.post('/volunteers/', volunteerData);
  return response.data;
};

export const getAllVolunteers = async () => {
  const response = await API.get('/volunteers/all/');
  return response.data;
};