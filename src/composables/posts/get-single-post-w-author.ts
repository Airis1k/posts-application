import { ApiService } from "../../services/api-service";
import { type PostWithAuthor } from "../../typings/posts";
import { ref } from "vue";

const singlePostWithAuthorCache = ref<PostWithAuthor | null>(null);

export function useSinglePostWithAuthor() {
   const singlePostWithAuthor = ref<PostWithAuthor | null>(null);
   const error = ref<Error | null>(null);
   const loading = ref(false);

   async function fetchPostWithAuthor(postId: number): Promise<void> {
      if (singlePostWithAuthorCache.value && singlePostWithAuthorCache.value.id === postId) {
         singlePostWithAuthor.value = singlePostWithAuthorCache.value;
         return;
      }

      loading.value = true;
      try {
         const response = await ApiService.get(`/posts/${postId}?_expand=author`);
         singlePostWithAuthor.value = response.data;

         singlePostWithAuthorCache.value = response.data;
      } catch (err) {
         error.value = err as Error;
      } finally {
         loading.value = false;
      }
   }

   return { singlePostWithAuthor, error, loading, fetchPostWithAuthor };
}
