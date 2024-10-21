import { ref } from "vue";
import { createGlobalState } from "@vueuse/core";

export const useConfirmGlobalState = createGlobalState(() => {
   const message = ref<string | null>(null);

   function setConfirmMessage(msg: string) {
      message.value = msg;
   }

   return { message, setConfirmMessage };
});
