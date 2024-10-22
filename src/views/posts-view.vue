<script setup lang="ts">
declare const ITEMS_PER_PAGE: number;

import { onMounted, ref, watch } from "vue";
import { usePostsWithAuthor } from "@/composables/posts/get-posts-with-author";
import { useNotificationsStore } from "@/stores/notifications-store";
import { usePostGlobalState } from "@/stores/post-store";
import { useModalStore } from "@/stores/modal-store";

import SearchForm from "@/components/forms/search-form.vue";
import PostsList from "@/components/posts/posts-list.vue";
import PaginationComponent from "@/components/pagination-component.vue";
import EditPostForm from "@/components/forms/edit-post-form.vue";
import ModalComponent from "@/components/modal/modal-component.vue";

import type { PostId } from "@/typings/posts";
import type { ModalArguments } from "@/typings/modal";

const POSTS_PER_PAGE = ITEMS_PER_PAGE;

const currentPage = ref(1);
const searchQuery = ref("");
const searchPlaceholder: string = "Find a post";
const modalLoadingStatus = ref(false);

const { postsWithAuthor, totalPostsCount, error, loading, fetchPostsWithAuthor } =
   usePostsWithAuthor();

const notificationStore = useNotificationsStore();
const modalStore = useModalStore();
const postState = usePostGlobalState();

const notifySuccess = (msg: string) => notificationStore.setSuccess(msg);
const notifyError = (msg: string) => notificationStore.setError(msg);

const isAuthenticated = computed(() => userStore.user.id !== 0);

onMounted(async () => {
   await fetchPostsWithAuthor(1, POSTS_PER_PAGE);
   if (postsWithAuthor.value) {
      notifySuccess("Posts were fetched successfully!");
   }
});

watch(error, (newError) => {
   if (newError) {
      notifyError(newError.message);
   }
});

function fetchOtherPages(page: number) {
   currentPage.value = page;
   fetchPostsWithAuthor(currentPage.value, POSTS_PER_PAGE, searchQuery.value);
}

function handleSearchSubmit(searchValue: string) {
   searchQuery.value = searchValue;
   currentPage.value = 1;
   fetchPostsWithAuthor(1, POSTS_PER_PAGE, searchQuery.value);
}

function handleEditClick(postId: PostId) {
   postState.setPostState(postId);
   modalStore.selectModal(EditPostForm);
}

async function handleFormSubmit(theArgs: ModalArguments) {
   const { success, error } = theArgs.responseMessage;

   if (success) {
      modalLoadingStatus.value = true;
      theArgs.reset();
      await fetchPostsWithAuthor(currentPage.value, POSTS_PER_PAGE, searchQuery.value);
      modalLoadingStatus.value = false;
      modalStore.closeModal();
      notifySuccess(success);

      return;
   }

   notifyError(error);
}

function handleFormError() {
   notifyError("Network error occurred");
}
</script>

<template>
   <div class="container">
      <h1 class="headingText">Posts page</h1>
      <div class="wrapper">
         <SearchForm @form-submitted="handleSearchSubmit" :searchPlaceholder="searchPlaceholder" />
         <button
            v-if="isAuthenticated"
            class="button"
            @click="modalStore.selectModal(CreatePostForm)"
         >
            Create Post
         </button>
      </div>
      <PostsList
         :posts-with-author="postsWithAuthor"
         :loading="loading"
         :error="error"
         @edit-click="handleEditClick"
      />
      <PaginationComponent
         v-if="totalPostsCount && totalPostsCount > 0"
         :total-count="totalPostsCount"
         :items-per-page="POSTS_PER_PAGE"
         :current-page="currentPage"
         @page-changed="fetchOtherPages"
      />
   </div>
   <ModalComponent
      @form-submitted="handleFormSubmit"
      @network-error="handleFormError"
      :loading="modalLoadingStatus"
   />
</template>

<style scoped>
.container {
   max-width: 1280px;
   margin: 0 auto;
   padding: 0 2rem;
}

.headingText {
   font-size: 2.5rem;
   font-weight: 600;
   margin-bottom: 2rem;
}

.wrapper {
   display: flex;
   column-gap: 2rem;
   margin-bottom: 2rem;
}
</style>
