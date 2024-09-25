<script setup lang="ts">
import { onMounted } from "vue";
import { useAuthors } from "../../composables/authors/get-authors";
import { useFormatDate } from "../../utils/format-date";
import AuthorItem from "./author-item.vue";

const { authors, error, loading, fetchAuthors } = useAuthors();

function addLatestDateProperty() {
   if (!authors.value) return;

   authors.value.forEach((author) => {
      const createdAt = new Date(author.created_at);
      const updatedAt = new Date(author.updated_at);

      const latestDate = createdAt > updatedAt ? createdAt : updatedAt;
      author.latest_date = useFormatDate(latestDate);
   });
}

onMounted(async () => {
   await fetchAuthors();
   addLatestDateProperty();
});
</script>

<template>
   <ul v-if="authors && authors.length > 0" class="authorsWrap">
      <AuthorItem v-for="author in authors" :key="author.id" :author="author" />
   </ul>
   <p v-if="loading">Data is loading...</p>
   <p v-if="error">There are no authors created at the moment :(</p>
</template>

<style scoped>
.authorsWrap {
   display: flex;
   flex-wrap: wrap;
   gap: 2rem;
}
</style>
