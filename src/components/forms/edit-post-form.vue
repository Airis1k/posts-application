<script setup lang="ts">
import { onMounted, reactive } from "vue";
import { Field, Form as VeeForm, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import { useSinglePost } from "@/composables/posts/get-single-post";
import { useMutatePost } from "@/composables/posts/edit-post";
import { usePostGlobalState } from "@/stores/post-store";
import type { RawMutatePost, RawPost } from "@/typings/posts";

const emit = defineEmits(["form-submitted", "network-error"]);

const { post, error, loading, fetchPost } = useSinglePost();
const { successMessage, errorMessage, loading: mutationLoading, mutatePost } = useMutatePost();
const postState = usePostGlobalState();

const schema = yup.object({
   title: yup.string().trim().min(2).max(40).required(),
   content: yup.string().trim().min(5).max(500).required(),
});

let formValues = {
   title: "",
   content: "",
};

const responseMessage = reactive({ success: "", error: "" });

onMounted(async () => {
   const postId = postState.postId.value;
   if (!postId) return;

   await fetchPost(postId);

   if (error.value) {
      emit("network-error");
      return;
   }

   formValues = {
      title: post.value!.title,
      content: post.value!.body,
   };
});

function isDataChanged({ title, content }: RawPost): boolean {
   if (post.value?.title === title && post.value?.body === content) {
      return false;
   }

   return true;
}

async function onSubmit(values: RawPost, { resetForm }: { resetForm: () => void }) {
   if (!post.value?.id) {
      emit("network-error");
      return;
   }

   if (!isDataChanged(values)) {
      Object.assign(responseMessage, {
         success: "",
         error: "No changes were made",
      });

      emit("form-submitted", { responseMessage, reset: resetForm });
      return;
   }

   const rawData: RawMutatePost = {
      id: post.value!.id,
      title: values.title.trim(),
      body: values.content,
      authorId: post.value.authorId,
      created_at: post.value.created_at,
   };

   await mutatePost(rawData);
   if (errorMessage.value) {
      emit("network-error");
      return;
   }

   Object.assign(responseMessage, {
      success: successMessage.value,
      error: "",
   });

   emit("form-submitted", { responseMessage, reset: resetForm });
}
</script>

<template>
   <!-- @vue-ignore -->
   <VeeForm
      v-if="!loading"
      @submit="onSubmit"
      :validation-schema="schema"
      :initial-values="formValues"
   >
      <div class="field">
         <p class="control has-icons-left has-icons-right">
            <Field
               name="title"
               class="input"
               type="text"
               placeholder="title"
               v-model="formValues.title"
               :validate-on-blur="true"
            />
            <span class="icon is-small is-left">
               <img src="../../assets/svg/title.svg" alt="title logo" />
            </span>
         </p>
         <ErrorMessage name="title" class="redText" />
      </div>
      <div class="field">
         <p class="control has-icons-left">
            <Field
               as="textarea"
               cols="30"
               rows="10"
               class="input description"
               name="content"
               placeholder="Content"
               v-model="formValues.content"
               :validate-on-blur="true"
            />
            <span class="icon is-small is-left">
               <img src="../../assets/svg/description.svg" alt="description logo" />
            </span>
         </p>
         <ErrorMessage name="content" class="redText" />
      </div>
      <div class="field">
         <p class="control">
            <button class="button">Confirm</button>
            <span v-if="mutationLoading" class="infoMessage">Loading...</span>
         </p>
      </div>
   </VeeForm>
   <div v-else>Loading...</div>
</template>

<style scoped>
.redText {
   color: #d2042d;
   margin-top: 0.5rem;
   display: block;
}

.description {
   height: 170px;
   resize: vertical;
}

.control {
   display: flex;
   column-gap: 2rem;
}

.infoMessage {
   display: flex;
   align-items: center;
}
</style>
