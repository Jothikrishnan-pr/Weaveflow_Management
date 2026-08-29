import axiosInstance from './axiosInstance'

// Mirrors AddLoomController — POST weaver/add_loom
export const addLoom = (loomRequestDTO) =>
  axiosInstance.post('/weaver/add_loom', loomRequestDTO).then((res) => res.data)
