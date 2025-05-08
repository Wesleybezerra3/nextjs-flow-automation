import axios from "axios";

const api = axios.create({
  baseURL: "https://api.xbase.app/api",
});

export default api;