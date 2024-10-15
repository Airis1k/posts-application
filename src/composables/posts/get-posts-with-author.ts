import { ref } from "vue";
import { ApiService } from "../../services/api-service";
import { type PostWithAuthor } from "../../typings/posts";

export function usePostsWithAuthor() {
   const postsWithAuthor = ref<PostWithAuthor[] | null>(null);
   const totalPostsCount = ref<number | null>(null);
   const error = ref<Error | null>(null);
   const loading = ref(false);

   function resetProperties() {
      postsWithAuthor.value = null;
      totalPostsCount.value = null;
      error.value = null;
      loading.value = false;
   }

   async function fetchPostsWithAuthor(
      pageNumber: number = 1,
      limitNumber: number = 2,
      searchQuery?: string,
   ): Promise<void> {
      resetProperties();

      let URL = `/posts?_expand=author&_page=${pageNumber}&_limit=${limitNumber}`;
      if (searchQuery) {
         URL += `&q=${searchQuery}`;
      }
      loading.value = true;

      try {
         const response = await ApiService.get(URL);

         postsWithAuthor.value = response.data;
         totalPostsCount.value = Number(response.headers["x-total-count"]);
      } catch (err) {
         error.value = err as Error;
      } finally {
         loading.value = false;
      }
   }

   return {
      postsWithAuthor,
      totalPostsCount,
      error,
      loading,
      fetchPostsWithAuthor,
   };
}
