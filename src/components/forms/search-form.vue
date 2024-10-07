<script setup lang="ts">
import { ref } from "vue";

const emit = defineEmits(["form-submitted"]);
const search = ref("");

function handleSubmit() {
   emit("form-submitted", search.value);
}
</script>

<template>
   <div class="level-item">
      <form @submit.prevent="handleSubmit" class="field has-addons">
         <p class="control">
            <input class="input" type="text" placeholder="Find a post" v-model="search" />
         </p>
         <p class="control">
            <button class="button">Search</button>
         </p>
      </form>
   </div>
</template>

<style scoped>
.level-item {
   justify-content: flex-start;
   margin-bottom: 2rem;
}
</style>
