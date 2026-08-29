import axiosInstance from './axiosInstance'

// Mirrors SalaryController — POST /weaver/payment
export const makePayment = (paymentRequestDTO) =>
  axiosInstance.post('/weaver/payment', paymentRequestDTO).then((res) => res.data)
