<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
   totalCount: number;
   itemsPerPage: number;
   currentPage: number;
}>();

const emit = defineEmits(["page-changed"]);

const totalPages = computed(() => Math.ceil(props.totalCount / props.itemsPerPage));

const isMoreThanOnePage = computed(() => totalPages.value > 1);

function nextPage() {
   if (props.currentPage < totalPages.value) {
      emit("page-changed", props.currentPage + 1);
   }
}

function prevPage() {
   if (props.currentPage > 1) {
      emit("page-changed", props.currentPage - 1);
   }
}
</script>

<template>
   <div v-if="isMoreThanOnePage" class="pageInfo">
      <div>
         <p>
            Showing <span class="boldNumber">{{ currentPage }}</span> of
            <span class="boldNumber">{{ totalPages }}</span> pages
         </p>
      </div>
      <div class="buttonWrap">
         <button class="navButton" @click="prevPage" :disabled="currentPage <= 1">Previous</button>
         <button class="navButton" @click="nextPage" :disabled="currentPage >= totalPages">
            Next
         </button>
      </div>
   </div>
</template>

<style scoped>
.pageInfo {
   display: flex;
   justify-content: space-between;
   border-top: 1px solid gray;
   padding-top: 1rem;
   margin-top: 5rem;
   align-items: center;
}

.boldNumber {
   font-weight: 600;
}

.navButton {
   padding: 0.5rem 0.75rem;
   font-size: 0.875rem;
   line-height: 1.25rem;
   font-weight: 600;
   border-radius: 0.375rem;
   background-color: var(--color-background-btn);
   color: var(--color-txt-btn);
}

.navButton:hover {
   background-color: var(--color-background-btn-hover);
}

.buttonWrap {
   display: flex;
   column-gap: 0.7rem;
}

.navButton:disabled {
   background-color: var(--btn-disabled);
   opacity: 0.7;
   cursor: not-allowed;
}
</style>
