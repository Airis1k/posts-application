<script setup lang="ts">
declare const ITEMS_PER_PAGE: number;

import { onMounted, ref, watch } from "vue";
import SearchForm from "@/components/forms/search-form.vue";
import { usePostsWithAuthor } from "@/composables/posts/get-posts-with-author";
import { useNotificationsStore } from "@/stores/notifications-store";
import PostsList from "@/components/posts/posts-list.vue";
import PaginationComponent from "@/components/pagination-component.vue";

const POSTS_PER_PAGE = ITEMS_PER_PAGE;

const currentPage = ref(1);
const currentSearchQuery = ref("");

const { postsWithAuthor, totalPostsCount, error, loading, fetchPostsWithAuthor } =
   usePostsWithAuthor();

const notificationStore = useNotificationsStore();

const notifySuccess = (msg: string) => notificationStore.setSuccess(msg);
const notifyError = (msg: string) => notificationStore.setError(msg);

onMounted(async () => {
   await fetchPostsWithAuthor(1, POSTS_PER_PAGE);
   if (postsWithAuthor.value) {
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
   fetchPostsWithAuthor(currentPage.value, POSTS_PER_PAGE, currentSearchQuery.value);
}

function handleSearchSubmit(searchValue: string) {
   currentSearchQuery.value = searchValue;
   currentPage.value = 1;
   fetchPostsWithAuthor(1, POSTS_PER_PAGE, currentSearchQuery.value);
}
</script>

<template>
   <div class="container">
      <h1 class="headingText">Posts page</h1>
      <SearchForm @form-submitted="handleSearchSubmit" />
      <PostsList :posts-with-author="postsWithAuthor" :loading="loading" :error="error" />
      <PaginationComponent
         v-if="totalPostsCount && totalPostsCount > 0"
         :total-count="totalPostsCount"
         :items-per-page="POSTS_PER_PAGE"
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
