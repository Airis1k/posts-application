<script setup lang="ts">
import { computed } from "vue";
import { RouterLink } from "vue-router";
import { useFormatDate } from "../../utils/format-date";
import { type PostWithAuthor } from "../../typings/posts";
import { useUserStore } from "@/stores/user-store";

const props = defineProps<{
   postWithAuthor: PostWithAuthor;
}>();

const userStore = useUserStore();

const isAuthenticated = computed(() => userStore.user.id !== 0);

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
   <li class="cardItem">
      <div class="card">
         <header class="card-header">
            <p class="card-header-title">
               {{ authorFullName }}
            </p>
         </header>
         <div class="card-content">
            <div class="content">
               <RouterLink
                  :to="{ name: 'SinglePost', params: { id: postWithAuthor.id } }"
                  class="linkStyle"
               >
                  <h2 class="headingText">{{ postWithAuthor.title }}</h2>
               </RouterLink>
               <span class="date">{{ latestDate }}</span>
            </div>
         </div>
         <footer v-if="isAuthenticated" class="card-footer">
            <button class="card-footer-item">Edit</button>
            <button class="card-footer-item">Delete</button>
         </footer>
      </div>
   </li>
</template>

<style scoped>
.headingText {
   font-size: 1.2rem;
}

.cardItem {
   min-width: 250px;
   transition: transform 0.18s ease-in-out;
}

.cardItem:hover {
   transform: scale(1.1);
}

.cardItem:active {
   transform: scale(0.9);
}

.date {
   font-size: 0.8rem;
   font-weight: 400;
}

.card-footer-item {
   color: #7585ff;
}

.linkStyle {
   display: block;
   color: var(--color-background-reverse);
}

.linkStyle:hover {
   text-decoration: underline;
}
</style>
