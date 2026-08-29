import axiosInstance from './axiosInstance'

// Mirrors DashBoardController — GET /home
export const getDashboard = () =>
  axiosInstance.get('/home').then((res) => res.data)
