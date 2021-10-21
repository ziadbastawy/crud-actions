import axios from "axios";

export default axios.create({
  baseURL: "https://taskfrontendapi.azurewebsites.net/api/",
  headers: {
    Authorization: "Bearer " + localStorage.getItem("token") || "",
  },
});
