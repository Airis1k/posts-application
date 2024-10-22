import { ref } from "vue";
import { ApiService } from "@/services/api-service";
import { useUserStore } from "@/stores/user-store";
import { useCurrentDateFormatted } from "@/utils/format-date";
import type { RawMutatePost } from "@/typings/posts";
import type { AxiosError } from "axios";

export function useMutatePost() {
   const successMessage = ref<string | null>(null);
   const errorMessage = ref<string | null>(null);
   const loading = ref(false);

   async function mutatePost(post: RawMutatePost) {
      const userStore = useUserStore();
      const { id, title, body, authorId, created_at } = post;
      loading.value = true;

      try {
         await ApiService.put(`/posts/${id}`, {
            title,
            body,
            authorId,
            userId: userStore.user.id,
            created_at,
            updated_at: useCurrentDateFormatted(),
         });

         successMessage.value = "Post was successfully updated";
      } catch (err) {
         const error = err as AxiosError;

         if (error.status === 401) {
            errorMessage.value = "You are not allowed to perform this action";
         } else if (error.message === "Network Error") {
            errorMessage.value = "Network error occurred";
         } else {
            errorMessage.value = "Something went wrong";
         }
      } finally {
         loading.value = false;
      }
   }

   return { successMessage, errorMessage, loading, mutatePost };
}
