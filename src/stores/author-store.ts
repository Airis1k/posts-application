import { ref } from "vue";
import { createGlobalState } from "@vueuse/core";
import type { AuthorId } from "@/typings/authors";

export const useAuthorGlobalState = createGlobalState(
   () => {
      const authorId = ref<AuthorId | null>(null);

      function setAuthorState(id: AuthorId) {
         authorId.value = id;
      }

      return { authorId, setAuthorState  }
   }
)