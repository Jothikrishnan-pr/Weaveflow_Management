import axiosInstance from './axiosInstance'

export const login = (username, password) =>
  axiosInstance.post('/login', { username, password }).then((res) => res.data)

export const register = (username, password) =>
  axiosInstance.post('/register', { username, password }).then((res) => res.data)