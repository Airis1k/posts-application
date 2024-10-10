<script setup lang="ts">
import { computed } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { useFormatFirstName } from "@/utils/format-name";
import { useUserStore } from "@/stores/user-store";
import { useNotificationsStore } from "@/stores/notifications-store";

const userStore = useUserStore();
const notificationStore = useNotificationsStore();

const notifySuccess = (msg: string) => notificationStore.setSuccess(msg);

const isAuthenticated = computed(() => userStore.user.id !== 0);

const firstName = computed(() => {
   return isAuthenticated.value ? useFormatFirstName(userStore.user.name) : null;
});

const router = useRouter();

function logout() {
   userStore.reset();
   notifySuccess("User has logged out successfully!");
   router.push({ name: "Login" });
}
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

         <div v-if="isAuthenticated" class="authWrap">
            <p>
               Welcome, <span class="boldText">{{ firstName }}</span>
            </p>
            <button @click="logout" class="button">Logout</button>
         </div>
         <div v-else class="authWrap">
            <RouterLink :to="{ name: 'Login' }" class="button">Login</RouterLink>
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
   align-items: center;
}

.logo {
   fill: var(--asd);
}

.boldText {
   font-weight: 600;
}

.authWrap {
   display: flex;
   column-gap: 2rem;
   align-items: center;
}

.button {
   background-color: var(--logout-btn);
   color: var(--logout-btn-text);
}
</style>
