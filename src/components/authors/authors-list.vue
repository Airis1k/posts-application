<script setup lang="ts">
import AuthorItem from "./author-item.vue";
import { type Author } from "@/typings/authors";

defineProps<{
   authors: Author[] | null;
   loading: boolean;
   error: Error | null;
}>();
</script>

<template>
   <ul v-if="authors && authors.length > 0" class="listWrap">
      <AuthorItem v-for="author in authors" :key="author.id" :author="author" />
   </ul>
   <p v-if="!loading && (!authors || authors.length === 0)">Sorry, no matches were found</p>
   <p v-if="loading" class="loadingStyle">Data is loading...</p>
   <p v-if="error">There are no authors created at the moment :(</p>
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
