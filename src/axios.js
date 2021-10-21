import axios from "axios";
import router from "./router/index";

const apiClient = axios.create({
  baseURL: "https://taskfrontendapi.azurewebsites.net/api/",
});

apiClient.interceptors.request.use(
  config => {
    const token = localStorage.getItem("token") || "";
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

apiClient.interceptors.response.use((response) => {
  return response;
}, (error) => {
  if (error.response.status == 401) {
    localStorage.removeItem("token");
     router.push({
        name: "login"
      });
  }
  return Promise.reject(error);
});
export default  apiClient;
