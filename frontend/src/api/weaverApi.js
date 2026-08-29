import axiosInstance from './axiosInstance'

// Mirrors WeaverController
export const addWeaver = (weaverRequestDTO) =>
  axiosInstance.post('/addWeaver', weaverRequestDTO).then((res) => res.data)