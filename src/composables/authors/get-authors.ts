import { ApiService } from "../../services/api-service";
import { type Author } from "../../typings/authors";
import { ref } from "vue";

const authorsCache = ref<Author[] | null>(null);

export function useAuthors() {
   const authors = ref<Author[] | null>(null);
   const error = ref<Error | null>(null);
   const loading = ref(false);

   async function fetchAuthors(): Promise<void> {
      if (authorsCache.value) {
         authors.value = authorsCache.value;
         return;
      }

      loading.value = true;
      try {
         const response = await ApiService.get("/authors");
         authors.value = response.data;

         authorsCache.value = response.data;
      } catch (err) {
         error.value = err as Error;
      } finally {
         loading.value = false;
      }
   }

   return { authors, error, loading, fetchAuthors };
}
