import axios from "axios";

// axios 기본 설정
const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
