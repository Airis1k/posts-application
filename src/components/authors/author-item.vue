<script setup lang="ts">
import { type Author } from "../../typings/authors";

defineProps<{
   author: Author;
}>();
</script>

<template>
   <li class="cardItem">
      <div class="card">
         <header class="card-header">
            <p class="card-header-title">Author</p>
         </header>
         <div class="card-content">
            <div class="content">
               <h2 class="headingText">{{ author.name }} {{ author.surname }}</h2>
               <span class="date">{{ author.latest_date }}</span>
            </div>
         </div>
         <footer class="card-footer">
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
</style>
