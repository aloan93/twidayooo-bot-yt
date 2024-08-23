import axios from "axios";

export const youtubeApi = axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3/",
  params: {
    key: import.meta.env.VITE_FIREBASE_API_KEY,
    part: "snippet",
  },
});
