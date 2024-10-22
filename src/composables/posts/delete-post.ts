import { ApiService } from "@/services/api-service";
import type { PostId } from "@/typings/posts";
import type { AxiosError } from "axios";
import { ref } from "vue";

export function useRemovePost() {
   const successMessage = ref<string | null>(null);
   const errorMessage = ref<string | null>(null);
   const loading = ref(false);

   async function removePost(postId: PostId) {
      loading.value = true;

      try {
         await ApiService.delete(`/posts/${postId}`);

         successMessage.value = "Post was removed successfully!";
      } catch (err) {
         const error = err as AxiosError;

         if (error.status === 401) {
            errorMessage.value = "You are not allowed to perform this action";
         } else {
            errorMessage.value = "An error ocurred while trying to remove a post";
         }
      } finally {
         loading.value = false;
      }
   }

   return { successMessage, errorMessage, loading, removePost };
}
