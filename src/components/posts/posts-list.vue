<script setup lang="ts">
import PostItem from "../../components/posts/post-item.vue";
import { type PostWithAuthor } from "@/typings/posts";

defineProps<{
   postsWithAuthor: PostWithAuthor[] | null;
   loading: boolean;
   error: Error | null;
}>();
</script>

<template>
   <ul v-if="postsWithAuthor && postsWithAuthor.length > 0" class="listWrap">
      <PostItem
         v-for="postWithAuthor in postsWithAuthor"
         :key="postWithAuthor.id"
         :postWithAuthor="postWithAuthor"
      />
   </ul>
   <p v-if="!loading && (!postsWithAuthor || postsWithAuthor.length === 0)">
      Sorry, no matches were found
   </p>
   <p v-if="loading" class="loadingStyle">Data is loading...</p>
   <p v-if="error">There are no posts created at the moment :(</p>
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
