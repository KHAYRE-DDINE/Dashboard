import axios from "axios";

export default axios.create({
  baseURL: process.env.NODE_ENV === "production" ? "https://dashboard-aj8w.onrender.com" : "http://localhost:3001",
  withCredentials: false,
});
