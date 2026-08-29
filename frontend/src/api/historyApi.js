import axiosInstance from './axiosInstance'

// Mirrors HistoryController — GET /history/{weaverName}
export const getWeaverHistory = (weaverName) =>
  axiosInstance.get(`/history/${encodeURIComponent(weaverName)}`).then((res) => res.data)
