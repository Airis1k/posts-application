import { ApiService } from "@/services/api-service";
import type { AuthorId } from "@/typings/authors";
import type { AxiosError } from "axios";
import { ref } from "vue";

export function useRemoveAuthor() {
   const successMessage = ref<string | null>(null);
   const errorMessage = ref<string | null>(null);
   const loading = ref(false);

   async function removeAuthor(authorId: AuthorId) {
      loading.value = true;

      try {
         await ApiService.delete(`/authors/${authorId}?_embed=posts`);

         successMessage.value = "Author was removed successfully!";
      } catch (err) {
         const error = err as AxiosError;

         if (error.status === 401) {
            errorMessage.value = "You are not allowed to perform this action";
         } else {
            errorMessage.value = "An error ocurred while removing the author";
         }
      } finally {
         loading.value = false;
      }
   }

   return { successMessage, errorMessage, loading, removeAuthor };
}
