<script setup lang="ts">
import { computed } from "vue";
import { useModalStore } from "@/stores/modal-store";

const modalStore = useModalStore();

const dynamicComponent = computed(() => modalStore.modal);
const isOpen = computed(() => modalStore.isOpen);
</script>

<template>
   <div v-if="isOpen" class="modalOverlay" @click="modalStore.closeModal">
      <div class="modalContent" @click.stop>
         <component :is="dynamicComponent" />
      </div>
   </div>
</template>

<style scoped>
.modalOverlay {
   position: fixed;
   top: 0;
   left: 0;
   right: 0;
   bottom: 0;
   background-color: rgba(0, 0, 0, 0.5);
   display: flex;
   justify-content: center;
   align-items: center;
   z-index: 1000;
}

.modalContent {
   background: white;
   padding: 20px;
   border-radius: 10px;
   width: 400px;
   max-width: 100%;
}
</style>
