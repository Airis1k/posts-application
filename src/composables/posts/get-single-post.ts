import { readonly, ref } from "vue";
import type { Post, PostId } from "@/typings/posts";
import type { AxiosError } from "axios";
import { ApiService } from "@/services/api-service";

export function useSinglePost() {
   const post = ref<Post | null>(null);
   const error = ref<AxiosError | null>(null);
   const loading = ref(false);

   function resetProperties() {
      post.value = null;
      error.value = null;
      loading.value = false;
   }

   async function fetchPost(id: PostId) {
      resetProperties();
      loading.value = true;

      try {
         const response = await ApiService.get(`/posts/${id}`);

         post.value = response.data;
      } catch (err) {
         error.value = err as AxiosError;
      } finally {
         loading.value = false;
      }
   }

   return {
      post: readonly(post),
      error: readonly(error),
      loading: readonly(loading),
      fetchPost,
   };
}
