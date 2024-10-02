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
   }

   async function fetchPostsWithAuthor(
      pageNumber: number = 1,
      limitNumber: number = 2,
   ): Promise<void> {
      loading.value = true;
      try {
         const response = await ApiService.get(
            `/posts?_expand=author&_page=${pageNumber}&_limit=${limitNumber}`,
         );
         postsWithAuthor.value = response.data;
         totalPostsCount.value = Number(response.headers["x-total-count"]);
      } catch (err) {
         error.value = err as Error;
         resetProperties();
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
