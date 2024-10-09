import { reactive, readonly } from "vue";
import { defineStore } from "pinia";
import { type User, type UserCredentials } from "@/typings/login";

export const useUserStore = defineStore("user", () => {
   const storage = localStorage.getItem("userInfo");
   const initialUser = storage ? JSON.parse(storage).user : { id: 0, email: "", name: "" };

   const user = reactive<User>(initialUser);

   function save(userObj: UserCredentials) {
      Object.assign(user, userObj.user);
      localStorage.setItem("userInfo", JSON.stringify(userObj));
   }

   function reset() {
      Object.assign(user, { id: 0, email: "", name: "" });
      localStorage.removeItem("userInfo");
   }

   return { user: readonly(user), save, reset };
});
