import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "http://localhost:5001/api",
  baseURL: "https://task-manager-mern-hu3h.onrender.com/api",
  headers: {
    content: "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default axiosInstance;
