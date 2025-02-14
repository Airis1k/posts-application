<script setup lang="ts">
declare const ITEMS_PER_PAGE: number;

import { computed, onMounted, ref, watch } from "vue";

import { useAuthors } from "@/composables/authors/get-authors";
import { useNotificationsStore } from "@/stores/notifications-store";
import { useModalStore } from "@/stores/modal-store";
import { useUserStore } from "@/stores/user-store";
import { useAuthorGlobalState } from "@/stores/author-store";
import { useRemoveAuthor } from "@/composables/authors/delete-author";
import { useConfirmGlobalState } from "@/stores/confirm-store";

import AuthorsList from "../components/authors/authors-list.vue";
import PaginationComponent from "@/components/pagination-component.vue";
import SearchForm from "@/components/forms/search-form.vue";
import ModalComponent from "@/components/modal/modal-component.vue";
import CreateAuthorForm from "@/components/forms/create-author-form.vue";
import EditAuthorForm from "@/components/forms/edit-author-form.vue";
import ConfirmAction from "@/components/confirm-action.vue";

import type { ModalArguments } from "@/typings/modal";
import type { AuthorId } from "@/typings/authors";

const AUTHORS_PER_PAGE = ITEMS_PER_PAGE;

const currentPage = ref(1);
const searchQuery = ref("");
const searchPlaceholder: string = "Find an author";
const modalLoadingStatus = ref(false);

const { authors, totalAuthorsCount, error, loading, fetchAuthors } = useAuthors();
const { successMessage, errorMessage, removeAuthor } = useRemoveAuthor();

const notificationStore = useNotificationsStore();
const modalStore = useModalStore();
const userStore = useUserStore();
const authorState = useAuthorGlobalState();
const confirmState = useConfirmGlobalState();

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

async function handleFormSubmit(theArgs: ModalArguments) {
   const { success, error } = theArgs.responseMessage;

   if (success) {
      notifySuccess(success);
      theArgs.reset();
      modalStore.closeModal();
      fetchAuthors(currentPage.value, AUTHORS_PER_PAGE, searchQuery.value);

      return;
   }

   notifyError(error);
}

function handleFormError() {
   modalStore.closeModal();
   notifyError("Network error occurred");
}

function handleEditClick(authorId: AuthorId) {
   authorState.setAuthorState(authorId);
   modalStore.selectModal(EditAuthorForm);
}

function handleDeleteClick(authorId: AuthorId) {
   authorState.setAuthorState(authorId);
   confirmState.setConfirmMessage("Are you sure you want to delete this author?");
   modalStore.selectModal(ConfirmAction);
}

async function handleConfirmAction() {
   if (!authorState.authorId.value) {
      notifyError("Network error occurred");
      return;
   }

   modalLoadingStatus.value = true;
   await removeAuthor(authorState.authorId.value);
   if (successMessage.value) {
      await fetchAuthors(1, AUTHORS_PER_PAGE, searchQuery.value);
      notifySuccess(successMessage.value);
   } else {
      notifyError(errorMessage.value!);
   }

   modalLoadingStatus.value = false;
   modalStore.closeModal();
}

function handleCancelAction() {
   modalStore.closeModal();
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
      <AuthorsList
         :authors="authors"
         :loading="loading"
         :error="error"
         @edit-click="handleEditClick"
         @delete-click="handleDeleteClick"
      />
      <PaginationComponent
         v-if="totalAuthorsCount && totalAuthorsCount > 0"
         :total-count="totalAuthorsCount"
         :items-per-page="AUTHORS_PER_PAGE"
         :current-page="currentPage"
         @page-changed="fetchOtherPages"
      />
   </div>
   <ModalComponent
      @form-submitted="handleFormSubmit"
      @network-error="handleFormError"
      @confirm-action="handleConfirmAction"
      @cancel-action="handleCancelAction"
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

.button {
   height: 40px;
}
</style>
