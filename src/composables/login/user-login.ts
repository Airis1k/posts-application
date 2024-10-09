import { ref, readonly } from "vue";
import { ApiService } from "@/services/api-service";
import { type UserCredentials } from "@/typings/login";
import { useUserStore } from "@/stores/user-store";

export function useUserLogin() {
   const credentials = ref<UserCredentials | null>(null);
   const error = ref<Error | null>(null);

   const userStore = useUserStore();

   async function loginUser(email: string, password: string) {
      try {
         const response = await ApiService.post("/login", {
            email,
            password,
         });

         credentials.value = response.data;
         if (credentials.value) {
            userStore.save(credentials.value);
         }
      } catch (err) {
         error.value = err as Error;
         userStore.reset();
      }
   }

   return { credentials: readonly(credentials), error: readonly(error), loginUser };
}
