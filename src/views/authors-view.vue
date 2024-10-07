<script setup lang="ts">
declare const ITEMS_PER_PAGE: number;

import { onMounted, ref, watch } from "vue";
import { useAuthors } from "@/composables/authors/get-authors";
import { useNotificationsStore } from "@/stores/notifications-store";
import AuthorsList from "../components/authors/authors-list.vue";
import PaginationComponent from "@/components/pagination-component.vue";
import SearchForm from "@/components/forms/search-form.vue";

const AUTHORS_PER_PAGE = ITEMS_PER_PAGE;

const currentPage = ref(1);
const currentSearchQuery = ref("");

const { authors, totalAuthorsCount, error, loading, fetchAuthors } = useAuthors();

const notificationStore = useNotificationsStore();

const notifySuccess = (msg: string) => notificationStore.setSuccess(msg);
const notifyError = (msg: string) => notificationStore.setError(msg);

onMounted(async () => {
   await fetchAuthors(1, AUTHORS_PER_PAGE);
   if (authors.value) {
      notifySuccess("Authors were fetched successfully!");
   }
});

watch(error, (newError) => {
   if (newError) {
      notifyError(newError.message);
   }
});

function fetchOtherPages(page: number) {
   currentPage.value = page;
   fetchAuthors(currentPage.value, AUTHORS_PER_PAGE, currentSearchQuery.value);
}

function handleSearchSubmit(searchValue: string) {
   currentSearchQuery.value = searchValue;
   currentPage.value = 1;
   fetchAuthors(1, AUTHORS_PER_PAGE, currentSearchQuery.value);
}
</script>

<template>
   <div class="container">
      <h1 class="headingText">Authors page</h1>
      <SearchForm @form-submitted="handleSearchSubmit" />
      <AuthorsList :authors="authors" :loading="loading" :error="error" />
      <PaginationComponent
         v-if="totalAuthorsCount && totalAuthorsCount > 0"
         :total-count="totalAuthorsCount"
         :items-per-page="AUTHORS_PER_PAGE"
         :current-page="currentPage"
         @page-changed="fetchOtherPages"
      />
   </div>
</template>

<style scoped>
.container {
   max-width: 1280px;
   margin: 0 auto;
   padding: 0 2rem;
}

.headingText {
   font-size: 2.5rem;
   font-weight: 600;
   margin-bottom: 2rem;
}
</style>
