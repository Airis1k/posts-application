<script setup lang="ts">
import { computed, ref, watchEffect } from "vue";

const props = defineProps<{
   totalCount: number;
   itemsPerPage: number;
}>();

const emit = defineEmits(["page-changed"]);
const currentPage = ref(1);

const totalPages = computed(() => Math.ceil(props.totalCount / props.itemsPerPage));

const isMoreThanOnePage = computed(() => totalPages.value > 1);

function nextPage() {
   if (currentPage.value < totalPages.value) {
      currentPage.value++;
   }
}

function prevPage() {
   if (currentPage.value > 1) {
      currentPage.value--;
   }
}

watchEffect(() => {
   emit("page-changed", currentPage.value);
});
</script>

<template>
   <ul class="listWrap">
      <slot></slot>
   </ul>
   <div v-if="isMoreThanOnePage" class="button-container">
      <button class="nav-button" @click="prevPage" :disabled="currentPage <= 1">Previous</button>
      <button class="nav-button" @click="nextPage" :disabled="currentPage >= totalPages">
         Next
      </button>
   </div>
</template>

<style scoped>
.content-wrapper {
   display: flex;
   flex-direction: column;
   align-items: center;
   margin-top: 1rem;
}

.listWrap {
   display: flex;
   flex-wrap: wrap;
   gap: 2rem;
   margin-bottom: 1rem;
}

.button-container {
   display: flex;
   justify-content: center;
   gap: 1rem;
   margin-top: 1rem;
}

.nav-button {
   padding: 0.5rem 1rem;
   border: none;
   border-radius: 5px;
   background-color: #007bff;
   color: white;
   cursor: pointer;
   transition: background-color 0.3s ease;
}

.nav-button:hover {
   background-color: #0056b3;
}

.nav-button:disabled {
   background-color: #ccc;
   color: #007bff;
   cursor: not-allowed;
}
</style>
