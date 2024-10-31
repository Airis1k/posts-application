<script setup lang="ts">
import PostItem from "../../components/posts/post-item.vue";
import type { PostId, PostWithAuthor } from "@/typings/posts";

defineProps<{
   postsWithAuthor: PostWithAuthor[] | null;
   loading: boolean;
   error: Error | null;
}>();

const emit = defineEmits(["delete-click", "edit-click"]);

function handleDeleteClick(postId: PostId) {
   emit("delete-click", postId);
}

function handleEditClick(postId: PostId) {
   emit("edit-click", postId);
}
</script>

<template>
   <ul v-if="postsWithAuthor && postsWithAuthor.length > 0" class="listWrap">
      <PostItem
         v-for="postWithAuthor in postsWithAuthor"
         :key="postWithAuthor.id"
         :postWithAuthor="postWithAuthor"
         @delete-click="handleDeleteClick"
         @edit-click="handleEditClick"
      />
   </ul>
   <p v-if="!loading && (!postsWithAuthor || postsWithAuthor.length === 0)">
      Sorry, no matches were found
   </p>
   <p v-if="loading" class="loadingStyle">Data is loading...</p>
   <p v-if="error" data-test="error-message">There are no posts created at the moment :(</p>
</template>

<style scoped>
.listWrap {
   display: flex;
   flex-wrap: wrap;
   gap: 2rem;
   margin-bottom: 1rem;
}

.loadingStyle {
   position: absolute;
   bottom: -3rem;
}
</style>
