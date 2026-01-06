import axios from "axios";

export const mockAxios = axios.create({
  baseURL: "/",
  headers: { "Content-Type": "application/json" },
});
