<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<template>
   <header class="container">
      <nav class="navbar" role="navigation" aria-label="main navigation">
         <div class="navbar-brand">
            <RouterLink to="/" class="navbar-item">
               <img
                  alt="Vue logo"
                  class="logo"
                  src="../assets/svg/logo.svg"
                  width="50"
                  height="50"
               />
            </RouterLink>

            <a
               role="button"
               class="navbar-burger"
               aria-label="menu"
               aria-expanded="false"
               data-target="navbarBasicExample"
            >
               <span aria-hidden="true"></span>
               <span aria-hidden="true"></span>
               <span aria-hidden="true"></span>
               <span aria-hidden="true"></span>
            </a>
         </div>

         <div id="navbarBasicExample" class="navbar-menu">
            <div class="navbar-start">
               <RouterLink to="/" class="navbar-item">Home</RouterLink>
               <RouterLink :to="{ name: 'Authors' }" class="navbar-item">Authors</RouterLink>
            </div>
         </div>
      </nav>
   </header>
</template>

<style scoped>
.container {
   max-width: 1280px;
   margin: 0 auto;
   padding: 0 2rem;
}

.navbar {
   background-color: var(--color-background);
}

.logo {
   fill: var(--asd);
}
</style>
