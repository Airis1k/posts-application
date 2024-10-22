import { ref } from "vue";
import { createGlobalState } from "@vueuse/core";
import type { PostId } from "@/typings/posts";

export const usePostGlobalState = createGlobalState(() => {
   const postId = ref<PostId | null>(null);

   function setPostState(id: PostId) {
      postId.value = id;
   }

   return { postId, setPostState };
});
