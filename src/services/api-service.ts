import axios from "axios";
import { useUserStore } from "@/stores/user-store";

export const ApiService = axios.create({
   baseURL: "http://localhost:3000/",
   headers: {
      "Content-Type": "application/json",
   },
});

ApiService.interceptors.request.use(
   (config) => {
      const userStore = useUserStore();
      const token = userStore.accessToken;

      if (token) {
         config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
   },
   (error) => {
      return Promise.reject(error);
   },
);
