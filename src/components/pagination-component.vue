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
.listWrap {
   display: flex;
   flex-wrap: wrap;
   gap: 2rem;
   margin-bottom: 1rem;
}

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
