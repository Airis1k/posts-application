import { ref, readonly, type Component, markRaw } from "vue";
import { defineStore } from "pinia";

export const useModalStore = defineStore("modal", () => {
   const modal = ref<Component | null>(null);
   const isOpen = ref(false);

   function selectModal(newModal: Component) {
      modal.value = markRaw(newModal);
      isOpen.value = true;
   }

   function closeModal() {
      isOpen.value = false;
      modal.value = null;
   }

   return { modal: readonly(modal), isOpen, selectModal, closeModal };
});
