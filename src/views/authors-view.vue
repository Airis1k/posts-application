<script setup lang="ts">
declare const ITEMS_PER_PAGE: number;

import { computed, onMounted, ref, watch } from "vue";
import { useAuthors } from "@/composables/authors/get-authors";
import { useNotificationsStore } from "@/stores/notifications-store";
import AuthorsList from "../components/authors/authors-list.vue";
import PaginationComponent from "@/components/pagination-component.vue";
import SearchForm from "@/components/forms/search-form.vue";
import ModalComponent from "@/components/modal/modal-component.vue";
import { useModalStore } from "@/stores/modal-store";
import { useUserStore } from "@/stores/user-store";
import CreateAuthorForm from "@/components/forms/create-author-form.vue";
import { type ModalArguments } from "@/typings/modal";

const AUTHORS_PER_PAGE = ITEMS_PER_PAGE;

const currentPage = ref(1);
const searchQuery = ref("");
const searchPlaceholder: string = "Find an author";

const { authors, totalAuthorsCount, error, loading, fetchAuthors } = useAuthors();

const notificationStore = useNotificationsStore();
const modalStore = useModalStore();
const userStore = useUserStore();

const notifySuccess = (msg: string) => notificationStore.setSuccess(msg);
const notifyError = (msg: string) => notificationStore.setError(msg);

const isAuthenticated = computed(() => userStore.user.id !== 0);

onMounted(async () => {
   await fetchAuthors(1, AUTHORS_PER_PAGE);
   if (authors.value) {
      notifySuccess("Authors were fetched successfully!");
   }
});

watch(error, (newError) => {
   if (newError) {
      notifyError(newError.message);
   }
});

function fetchOtherPages(page: number) {
   currentPage.value = page;
   fetchAuthors(currentPage.value, AUTHORS_PER_PAGE, searchQuery.value);
}

function handleSearchSubmit(searchValue: string) {
   searchQuery.value = searchValue;
   currentPage.value = 1;
   fetchAuthors(currentPage.value, AUTHORS_PER_PAGE, searchQuery.value);
}

async function handleCreateAuthorForm(theArgs: ModalArguments) {
   const { success, error } = theArgs.responseMessage;

   if (success) {
      notifySuccess(success);
      theArgs.reset();
      modalStore.closeModal();
   } else if (error) {
      notifyError(error);
   }

   fetchAuthors(currentPage.value, AUTHORS_PER_PAGE, searchQuery.value);
}
</script>

<template>
   <div class="container">
      <h1 class="headingText">Authors page</h1>
      <div class="wrapper">
         <SearchForm @form-submitted="handleSearchSubmit" :searchPlaceholder="searchPlaceholder" />
         <button
            v-if="isAuthenticated"
            class="button"
            @click="modalStore.selectModal(CreateAuthorForm)"
         >
            Create Author
         </button>
      </div>
      <AuthorsList :authors="authors" :loading="loading" :error="error" />
      <PaginationComponent
         v-if="totalAuthorsCount && totalAuthorsCount > 0"
         :total-count="totalAuthorsCount"
         :items-per-page="AUTHORS_PER_PAGE"
         :current-page="currentPage"
         @page-changed="fetchOtherPages"
      />
   </div>
   <ModalComponent @form-submitted="handleCreateAuthorForm" />
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

.button {
   height: 40px;
}
</style>
