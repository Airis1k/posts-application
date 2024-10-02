import { ApiService } from "../../services/api-service";
import { type Author } from "../../typings/authors";
import { ref } from "vue";

export function useAuthors() {
   const authors = ref<Author[] | null>(null);
   const totalAuthorsCount = ref<number | null>(null);
   const error = ref<Error | null>(null);
   const loading = ref(false);

   function resetProperties() {
      authors.value = null;
      totalAuthorsCount.value = null;
   }

   async function fetchAuthors(pageNumber: number = 1, limitNumber: number = 2): Promise<void> {
      loading.value = true;
      try {
         const response = await ApiService.get(
            `/authors?_page=${pageNumber}&_limit=${limitNumber}`,
         );
         authors.value = response.data;
         totalAuthorsCount.value = Number(response.headers["x-total-count"]);
      } catch (err) {
         error.value = err as Error;
         resetProperties();
      } finally {
         loading.value = false;
      }
   }

   return { authors, totalAuthorsCount, error, loading, fetchAuthors };
}
