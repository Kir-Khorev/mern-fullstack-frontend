import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:4444/",
});

// Добавляем к любому запросу информацию о наличии токена
instance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem("token");
  return config;
});

export default instance;
