import { reactive, readonly, ref } from "vue";
import { defineStore } from "pinia";
import { type User, type UserCredentials } from "@/typings/login";

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

   return {
      user: readonly(user),
      accessToken: readonly(accessToken),
      save,
      reset,
   };
});
