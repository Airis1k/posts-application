<script setup lang="ts">
import { computed } from "vue";
import { useFormatDate } from "../../utils/format-date";
import { type Author } from "../../typings/authors";
import { useUserStore } from "@/stores/user-store";

const props = defineProps<{
   author: Author;
}>();

const emit = defineEmits(["edit-click", "delete-click"]);

const userStore = useUserStore();

const isAuthenticated = computed(() => userStore.user.id !== 0);

const authorFullName = computed(() => props.author.name + " " + props.author.surname);

const latestDate = computed(() => {
   const createdAt = new Date(props.author.created_at);
   const updatedAt = new Date(props.author.updated_at);

   const latest = createdAt > updatedAt ? createdAt : updatedAt;
   return useFormatDate(latest);
});

function handleEditClick() {
   emit("edit-click", props.author.id);
}

function handleDeleteClick() {
   emit("delete-click", props.author.id);
}
</script>

<template>
   <li class="cardItem">
      <div class="card">
         <header class="card-header">
            <p class="card-header-title">Author</p>
         </header>
         <div class="card-content">
            <div class="content">
               <h2 class="headingText" data-test="title">{{ authorFullName }}</h2>
               <span class="date" data-test="date">{{ latestDate }}</span>
            </div>
         </div>
         <footer v-if="isAuthenticated" class="card-footer">
            <button class="card-footer-item" data-test="edit" @click="handleEditClick">Edit</button>
            <button class="card-footer-item" data-test="delete" @click="handleDeleteClick">Delete</button>
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
</style>
