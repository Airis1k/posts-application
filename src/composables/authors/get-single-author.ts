import { readonly, ref } from "vue";
import type { Author, AuthorId } from "@/typings/authors";
import type { AxiosError } from "axios";
import { ApiService } from "@/services/api-service";

export function useSingleAuthor() {
   const author = ref<Author | null>(null);
   const error = ref<AxiosError | null>(null);
   const loading = ref(false);

   function resetProperties() {
      author.value = null;
      error.value = null;
      loading.value = false;
   }

   async function fetchAuthor(id: AuthorId) {
      resetProperties();
      loading.value = true;

      try {
         const response = await ApiService.get(`/authors/${id}`);

         author.value = response.data;
      } catch (err) {
         error.value = err as AxiosError;
      } finally {
         loading.value = false;
      }
   }

   return {
      author: readonly(author),
      error: readonly(error),
      loading: readonly(loading),
      fetchAuthor,
   };
}
