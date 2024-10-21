import { reactive, readonly, ref } from "vue";
import { defineStore } from "pinia";
import { jwtDecode } from "jwt-decode";
import type { User, UserCredentials } from "@/typings/login";

export const useUserStore = defineStore("user", () => {
   const storage = localStorage.getItem("userInfo");
   const initialUser: User = storage ? JSON.parse(storage).user : { id: 0, email: "", name: "" };
   const initialToken: string = storage ? JSON.parse(storage).accessToken : "";

   const user = reactive<User>(initialUser);
   const accessToken = ref<string>(initialToken);

   function save(userObj: UserCredentials) {
      Object.assign(user, userObj.user);
      accessToken.value = userObj.accessToken;
      localStorage.setItem("userInfo", JSON.stringify(userObj));
   }

   function reset() {
      Object.assign(user, { id: 0, email: "", name: "" });
      accessToken.value = "";
      localStorage.removeItem("userInfo");
   }

   function isAuthenticated(): boolean {
      if (!accessToken.value) {
         return false;
      }

      try {
         const decoded = jwtDecode(accessToken.value);
         if (decoded.exp && Date.now() >= decoded.exp * 1000) {
            return false;
         }
      } catch (err) {
         return false;
      }

      return true;
   }

   return {
      user: readonly(user),
      accessToken: readonly(accessToken),
      save,
      reset,
      isAuthenticated,
   };
});
