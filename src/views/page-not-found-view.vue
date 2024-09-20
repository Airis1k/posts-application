<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<template>
   <div class="mainWrap">
      <main class="content">
         <img
            src="https://raw.githubusercontent.com/Airis1k/gcsg-lt/main/src/assets/404-error-page.png"
            alt="car in front of mountains"
            class="backgroundImg"
         />
         <div class="textWrap">
            <p class="responseText">404</p>
            <h1 class="heading">Page not found</h1>
            <p class="description">Sorry, we could not find the page you are looking for.</p>
            <div class="linkWrap">
               <RouterLink to="/" class="linkText"> ← Back to home </RouterLink>
            </div>
         </div>
      </main>
   </div>
</template>

<style scoped>
.mainWrap {
   height: 100vh;
}

.content {
   min-height: 100%;
   isolation: isolate;
   position: relative;
}

.backgroundImg {
   object-position: top;
   object-fit: cover;
   width: 100%;
   height: 100%;
   z-index: -10;
   inset: 0px;
   position: absolute;
   display: block;
}

.textWrap {
   padding: 10rem 2rem;
   text-align: center;
}

.responseText {
   color: #fff;
   line-height: 2rem;
   font-weight: 600;
   font-size: 1rem;
   margin: 0;
}

.heading {
   font-size: 3rem;
   line-height: 1;
   color: #fff;
   letter-spacing: -0.025em;
   font-weight: 700;
   margin: 1rem 0 0 0;
}

.description {
   margin: 1rem 0 0 0;
   color: rgb(255 255 255 / 0.7);
   font-size: 1rem;
   line-height: 1.5rem;
}

.linkWrap {
   display: flex;
   justify-content: center;
   margin-top: 2.5rem;
}

.navigationText {
   color: #fff;
   line-height: 1.75rem;
   font-weight: 600;
   font-size: 0.875rem;
   text-decoration: none;
}

.linkText {
   color: #fff;
   text-decoration: none;
}

.linkText:hover {
   text-decoration: underline;
}
</style>
