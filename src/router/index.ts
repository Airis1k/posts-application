import { createRouter, createWebHistory } from "vue-router";
import AuthorsView from "../views/authors-view.vue";
import PostsView from "../views/posts-view.vue";
import PageNotFoundView from "../views/page-not-found-view.vue";
import LoginView from "../views/login-view.vue";
import SinglePostView from "../views/single-post-view.vue";

const router = createRouter({
   history: createWebHistory(import.meta.env.BASE_URL),
   routes: [
      {
         path: "/",
         name: "Posts",
         component: PostsView,
      },
      {
         path: "/authors",
         name: "Authors",
         component: AuthorsView,
      },
      {
         path: "/login",
         name: "Login",
         component: LoginView,
      },
      {
         path: "/posts/:id",
         name: "SinglePost",
         component: SinglePostView,
      },
      {
         path: "/:catchAll(.*)",
         name: "PageNotFound",
         component: PageNotFoundView,
      },
   ],
});

export default router;
