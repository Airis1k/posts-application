<script setup lang="ts">
import { computed } from "vue";
import { useFormatDate } from "../utils/format-date";
import { type PostWithAuthor } from "../typings/posts";

const props = defineProps<{
   postWithAuthor: PostWithAuthor;
}>();

const authorFullName = computed(
   () => props.postWithAuthor.author.name + " " + props.postWithAuthor.author.surname,
);

const latestDate = computed(() => {
   const createdAt = new Date(props.postWithAuthor.created_at);
   const updatedAt = new Date(props.postWithAuthor.updated_at);

   const latest = createdAt > updatedAt ? createdAt : updatedAt;
   return useFormatDate(latest);
});
</script>

<template>
   <div class="postContainer">
      <p class="date">{{ latestDate }}</p>
      <h2 class="title">{{ postWithAuthor.title }}</h2>
      <p class="description">{{ postWithAuthor.body }}</p>
      <h3 class="author">{{ authorFullName }}</h3>
   </div>
</template>

<style scoped>
.postContainer {
   display: flex;
   flex-direction: column;
   row-gap: 1rem;
}

.date {
   font-size: 0.8rem;
}

.title {
   font-size: 1.5rem;
   font-weight: 600;
   margin: 0;
   color: var(--color-background-reverse);
}

.description {
   letter-spacing: -0.4px;
   max-width: 550px;
   white-space: break-spaces;
}

.author {
   font-size: 1.2rem;
   font-weight: 600;
   color: var(--color-background-reverse);
}
</style>
