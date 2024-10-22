<script setup lang="ts">
import { onMounted } from "vue";
import { useSinglePostWithAuthor } from "../composables/posts/get-single-post-w-author";
import { useNotificationsStore } from "../stores/notifications-store";
import SinglePost from "../components/single-post.vue";

const props = defineProps<{
   id: string;
}>();

const { singlePostWithAuthor, error, loading, fetchPostWithAuthor } = useSinglePostWithAuthor();
const notificationStore = useNotificationsStore();

const notifySuccess = (msg: string) => notificationStore.setSuccess(msg);
const notifyError = (msg: string) => notificationStore.setError(msg);

onMounted(async () => {
   const urlID = Number(props.id);
   await fetchPostWithAuthor(urlID);
   if (singlePostWithAuthor.value) {
      notifySuccess("Single post was fetched successfully!");
   }
   if (error.value) {
      notifyError(error.value.message);
   }
});
</script>

<template>
   <div class="container">
      <h1 class="headingText">Single Post Page</h1>
      <SinglePost v-if="singlePostWithAuthor" :postWithAuthor="singlePostWithAuthor" />
      <p v-if="loading">Data is loading...</p>
      <p v-if="error">We could not find post at the moment :(</p>
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
