import axiosInstance from './axiosInstance'

// Mirrors AddSareeController — POST weaver/add_sarees
export const updateCompletedSarees = (addSareeRequestDTO) =>
  axiosInstance.post('/weaver/add_sarees', addSareeRequestDTO).then((res) => res.data)
