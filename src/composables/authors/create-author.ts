import { ref } from "vue";
import { ApiService } from "@/services/api-service";
import { type RawAuthor } from "@/typings/authors";
import { useCurrentDateFormatted } from "@/utils/format-date";
import { useUserStore } from "@/stores/user-store";
import { AxiosError } from "axios";

export function useCreateAuthor() {
   const successMessage = ref<string | null>(null);
   const errorMessage = ref<string | null>(null);

   async function createAuthor({ name, surname }: RawAuthor) {
      const userStore = useUserStore();

      try {
         await ApiService.post("/authors", {
            name,
            surname,
            userId: userStore.user.id,
            created_at: useCurrentDateFormatted(),
            updated_at: useCurrentDateFormatted(),
         });

         successMessage.value = "Author was created successfully";
      } catch (err) {
         const error = err as AxiosError;

         if (error.status === 401) {
            errorMessage.value = "You are not allowed to perform this action";
         } else {
            errorMessage.value = "An error occurred while creating the author";
         }
      }
   }

   return { successMessage, errorMessage, createAuthor };
}
