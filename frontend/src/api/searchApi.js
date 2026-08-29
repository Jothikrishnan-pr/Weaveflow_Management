import axiosInstance from './axiosInstance'

// Mirrors WeaverSearchController — GET /search/{weaverName}
export const searchWeaver = (weaverName) =>
  axiosInstance.get(`/search/${encodeURIComponent(weaverName)}`).then((res) => res.data)
