<script setup lang="ts">
import { onMounted } from "vue";
import { useAuthors } from "../../composables/authors/get-authors";
import { useFormatDate } from "../../utils/format-date";
import AuthorItem from "./author-item.vue";
import { useNotificationsStore } from "../../stores/notifications-store";

const { authors, error, loading, fetchAuthors } = useAuthors();
const notificationStore = useNotificationsStore();

const notifySuccess = (msg: string) => notificationStore.setSuccess(msg);
const notifyError = (msg: string) => notificationStore.setError(msg);

function addLatestDateProperty(): void {
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
   if (authors.value) {
      notifySuccess("Authors were fetched successfully!");
   }
   if (error.value) {
      notifyError(error.value.message);
   }
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
