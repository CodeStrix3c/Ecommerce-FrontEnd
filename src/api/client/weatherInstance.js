import axios from "axios";

const weatherInstance = axios.create({
  baseURL: import.meta.env.VITE_WEATHER_BASE_URL,

  params: {
    key: import.meta.env.VITE_WEATHER_API_KEY,
  },
});

export default weatherInstance;
