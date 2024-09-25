<script setup lang="ts">
import AuthorsList from "../components/authors/authors-list.vue";
</script>

<template>
   <div class="container">
      <h1 class="headingText">Authors page</h1>
      <AuthorsList />
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
