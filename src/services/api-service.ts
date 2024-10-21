import axios from "axios";
import { useUserStore } from "@/stores/user-store";
import router from "@/router";

export const ApiService = axios.create({
   baseURL: "http://localhost:3000/",
   headers: {
      "Content-Type": "application/json",
   },
});

ApiService.interceptors.request.use(
   (config) => {
      if (config.method === "get" || config.url === "/login") {
         return config;
      }
      const userStore = useUserStore();
      const token = userStore.accessToken;

      if (!userStore.isAuthenticated()) {
         userStore.reset();
         router.push({ name: "Login" });
         return Promise.reject("Please log in again");
      }

      config.headers.Authorization = `Bearer ${token}`;
      return config;
   },
   (error) => {
      return Promise.reject(error);
   },
);
