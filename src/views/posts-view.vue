<script setup lang="ts">
import PostsList from "../components/posts/posts-list.vue";
</script>

<template>
   <div class="container">
      <h1 class="headingText">Posts page</h1>
      <PostsList />
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
