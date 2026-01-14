import axios from "axios";

const API = axios.create({
  baseURL: "https://clarify-i166.onrender.com",
});

// Token attach automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
