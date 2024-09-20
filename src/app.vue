<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from "vue-router";
import { computed } from "vue";

const route = useRoute();
const isNotPage404 = computed(() => route.name !== "PageNotFound");
</script>

<template>
   <header v-if="isNotPage404" class="headerWrap container">
      <RouterLink to="/">
         <img alt="Vue logo" class="logo" src="../src/assets/svg/logo.svg" />
      </RouterLink>

      <div class="wrapper">
         <nav class="navWrap">
            <RouterLink to="/" class="navItem">Home</RouterLink>
            <RouterLink to="/authors" class="navItem">Authors</RouterLink>
         </nav>
      </div>
   </header>

   <main>
      <RouterView />
   </main>
</template>

<style scoped>
.container {
   max-width: 1280px;
   margin: 0 auto;
   padding: 0 2rem;
}

.headerWrap {
   display: flex;
   align-items: center;
   column-gap: 2rem;
}

.navWrap {
   display: flex;
   column-gap: 1rem;
}

.logo {
   height: 50px;
   width: 50px;
   display: block;
}

.navItem {
   text-decoration: none;
   color: hsla(160, 100%, 37%, 1);
   padding: 3px;
}

.navItem:hover {
   background-color: hsla(160, 100%, 37%, 0.2);
}

.router-link-active {
   color: black;
   font-weight: 600;
}
</style>
