import { ApiService } from "@/services/api-service";
import { useUserStore } from "@/stores/user-store";
import type { RawMutateAuthor } from "@/typings/authors";
import { useCurrentDateFormatted } from "@/utils/format-date";
import type { AxiosError } from "axios";
import { ref } from "vue";

export function useMutateAuthor() {
   const successMessage = ref<string | null>(null);
   const errorMessage = ref<string | null>(null);
   const loading = ref(false);

   async function mutateAuthor(author: RawMutateAuthor) {
      const userStore = useUserStore();
      const { id, name, surname, created_at } = author;
      loading.value = true;

      try {
         await ApiService.put(`/authors/${id}`, {
            name,
            surname,
            userId: userStore.user.id,
            created_at,
            updated_at: useCurrentDateFormatted(),
         });

         successMessage.value = "Author was successfully updated";
      } catch (err) {
         const error = err as AxiosError;

         if (error.status === 401) {
            errorMessage.value = "You are not allowed to perform this action";
         } else {
            errorMessage.value = "An error ocurred while updating the author";
         }
      } finally {
         loading.value = false;
      }
   }

   return { successMessage, errorMessage, loading, mutateAuthor };
}
