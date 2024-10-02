<script setup lang="ts">
import { onMounted, watch } from "vue";
import { usePostsWithAuthor } from "../../composables/posts/get-posts-with-author";
import { useNotificationsStore } from "../../stores/notifications-store";
import PostItem from "../../components/posts/post-item.vue";
import PaginationComponent from "../pagination-component.vue";

const POSTS_PER_PAGE = 2;

const { postsWithAuthor, totalPostsCount, error, loading, fetchPostsWithAuthor } =
   usePostsWithAuthor();
const notificationStore = useNotificationsStore();

const notifySuccess = (msg: string) => notificationStore.setSuccess(msg);
const notifyError = (msg: string) => notificationStore.setError(msg);

onMounted(async () => {
   await fetchPostsWithAuthor();
   if (postsWithAuthor.value) {
      notifySuccess("Posts were fetched successfully!");
   }
});

function fetchOtherPages(page: number) {
   fetchPostsWithAuthor(page, POSTS_PER_PAGE);
}

watch(error, (newError) => {
   if (newError) {
      notifyError(newError.message);
   }
});
</script>

<template>
   <PaginationComponent
      v-if="postsWithAuthor && postsWithAuthor.length > 0 && totalPostsCount && totalPostsCount > 0"
      :totalCount="totalPostsCount"
      :itemsPerPage="POSTS_PER_PAGE"
      @page-changed="fetchOtherPages"
   >
      <PostItem
         v-for="postWithAuthor in postsWithAuthor"
         :key="postWithAuthor.id"
         :postWithAuthor="postWithAuthor"
      />
   </PaginationComponent>
   <p v-if="loading">Data is loading...</p>
   <p v-if="error">There are no posts created at the moment :(</p>
</template>
