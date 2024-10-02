<script setup lang="ts">
import { onMounted, watch } from "vue";
import { useAuthors } from "../../composables/authors/get-authors";
import AuthorItem from "./author-item.vue";
import { useNotificationsStore } from "../../stores/notifications-store";
import PaginationComponent from "../pagination-component.vue";

const POSTS_PER_PAGE = 2;

const { authors, totalAuthorsCount, error, loading, fetchAuthors } = useAuthors();
const notificationStore = useNotificationsStore();

const notifySuccess = (msg: string) => notificationStore.setSuccess(msg);
const notifyError = (msg: string) => notificationStore.setError(msg);

onMounted(async () => {
   await fetchAuthors();
   if (authors.value) {
      notifySuccess("Authors were fetched successfully!");
   }
});

function fetchOtherPages(page: number) {
   fetchAuthors(page, POSTS_PER_PAGE);
}

watch(error, (newError) => {
   if (newError) {
      notifyError(newError.message);
   }
});
</script>

<template>
   <PaginationComponent
      v-if="authors && authors.length > 0 && totalAuthorsCount && totalAuthorsCount > 0"
      :totalCount="totalAuthorsCount"
      :itemsPerPage="POSTS_PER_PAGE"
      @page-changed="fetchOtherPages"
   >
      <AuthorItem v-for="author in authors" :key="author.id" :author="author" />
   </PaginationComponent>
   <p v-if="loading">Data is loading...</p>
   <p v-if="error">There are no authors created at the moment :(</p>
</template>
