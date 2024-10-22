import { ref } from "vue";
import { ApiService } from "@/services/api-service";
import { useUserStore } from "@/stores/user-store";
import { useCurrentDateFormatted } from "@/utils/format-date";
import type { RawPost } from "@/typings/posts";
import type { AxiosError } from "axios";

export function useCreatePost() {
   const successMessage = ref<string | null>(null);
   const errorMessage = ref<string | null>(null);
   const loading = ref(false);

   async function createPost(post: RawPost) {
      loading.value = true;
      const userStore = useUserStore();
      const { title, author, content } = post;

      try {
         await ApiService.post("/posts", {
            title,
            body: content,
            authorId: author,
            userId: userStore.user.id,
            created_at: useCurrentDateFormatted(),
            updated_at: useCurrentDateFormatted(),
         });

         successMessage.value = "Post was created successfully";
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

   return { successMessage, errorMessage, loading, createPost };
}
