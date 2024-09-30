import { ApiService } from "../../services/api-service";
import { type PostWithAuthor } from "../../typings/posts";
import { ref } from "vue";

let postsWithAuthorCache: PostWithAuthor[] | null = null;

export function usePostsWithAuthor() {
   const postsWithAuthor = ref<PostWithAuthor[] | null>(null);
   const error = ref<Error | null>(null);
   const loading = ref(false);

   async function fetchPostsWithAuthor(): Promise<void> {
      if (postsWithAuthorCache) {
         postsWithAuthor.value = postsWithAuthorCache;
         return;
      }

      loading.value = true;
      try {
         const response = await ApiService.get("/posts?_expand=author");
         postsWithAuthor.value = response.data;

         postsWithAuthorCache = response.data;
      } catch (err) {
         error.value = err as Error;
      } finally {
         loading.value = false;
      }
   }

   return { postsWithAuthor, error, loading, fetchPostsWithAuthor };
}
