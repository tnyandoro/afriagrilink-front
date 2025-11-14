import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:3001/api/v1", // Your Rails API URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests if available
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosClient;
