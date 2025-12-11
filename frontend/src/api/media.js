import API from './axios';

export const getMedia = async () => {
  const response = await API.get('/media/');
  return response.data;
};

export const createMedia = async (mediaData) => {
  const response = await API.post('/media/', mediaData);
  return response.data;
};

export const deleteMedia = async (id) => {
  await API.delete(`/media/${id}/`);
};