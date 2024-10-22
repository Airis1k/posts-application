import { readonly, ref } from "vue";
import type { Author } from "@/typings/authors";
import { AxiosError } from "axios";
import { ApiService } from "@/services/api-service";

export function useAllAuthors() {
   const authors = ref<Author[] | null>(null);
   const error = ref<AxiosError | null>(null);
   const loading = ref(false);

   async function fetchAuthors() {
      loading.value = true;
      try {
         const response = await ApiService.get("/authors");

         authors.value = response.data;
      } catch (err) {
         error.value = err as AxiosError;
      } finally {
         loading.value = false;
      }
   }

   return {
      authors: readonly(authors),
      error: readonly(error),
      loading: readonly(loading),
      fetchAuthors,
   };
}
