<script setup lang="ts">
import { onMounted } from "vue";
import { usePostsWithAuthor } from "../../composables/posts/get-posts-with-author";
import PostItem from "./post-item.vue";
import { useNotificationsStore } from "../../stores/notifications-store";

const { postsWithAuthor, error, loading, fetchPostsWithAuthor } = usePostsWithAuthor();
const notificationStore = useNotificationsStore();

const notifySuccess = (msg: string) => notificationStore.setSuccess(msg);
const notifyError = (msg: string) => notificationStore.setError(msg);

onMounted(async () => {
   await fetchPostsWithAuthor();
   if (postsWithAuthor.value) {
      notifySuccess("Posts were fetched successfully!");
   }
   if (error.value) {
      notifyError(error.value.message);
   }
});
</script>

<template>
   <ul v-if="postsWithAuthor && postsWithAuthor.length > 0" class="postsWrap">
      <PostItem
         v-for="postWithAuthor in postsWithAuthor"
         :key="postWithAuthor.id"
         :postWithAuthor="postWithAuthor"
      />
   </ul>
   <p v-if="loading">Data is loading...</p>
   <p v-if="error">There are no posts created at the moment :(</p>
</template>

<style scoped>
.postsWrap {
   display: flex;
   flex-wrap: wrap;
   gap: 2rem;
}
</style>
