<script setup lang="ts">
import { RouterView, useRoute } from "vue-router";
import { computed } from "vue";
import NavigationBar from "./components/navigation-bar.vue";

const route = useRoute();
const isNotPage404 = computed(() => route.name !== "PageNotFound");
</script>

<template>
   <NavigationBar v-if="isNotPage404" />

   <main>
      <RouterView />
   </main>
</template>
