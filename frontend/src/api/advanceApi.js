import axiosInstance from './axiosInstance'

// Mirrors AdvanceController — POST weaver/add-advance
export const makeAdvance = (advanceRequestDTO) =>
  axiosInstance.post('/weaver/add-advance', advanceRequestDTO).then((res) => res.data)
