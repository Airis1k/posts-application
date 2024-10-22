<script setup lang="ts">
import { Field, Form as VeeForm, ErrorMessage } from "vee-validate";
import { onMounted } from "vue";
import * as yup from "yup";
import { useAllAuthors } from "@/composables/authors/get-all-authors";
import { useCreatePost } from "@/composables/posts/create-post";
import type { RawPost } from "@/typings/posts";

const emit = defineEmits(["form-submitted", "network-error"]);

const { authors, error, loading, fetchAuthors } = useAllAuthors();
const { successMessage, errorMessage, loading: loadingCreate, createPost } = useCreatePost();

const schema = yup.object({
   title: yup.string().trim().min(2).max(40).required(),
   author: yup.number().positive().integer().required(),
   content: yup.string().trim().min(5).max(500).required(),
});

onMounted(async () => {
   await fetchAuthors();
   if (error.value) {
      emit("network-error");
   }
});

async function handleSubmit(values: RawPost, { resetForm }: { resetForm: () => void }) {
   const data: RawPost = {
      ...values,
      title: values.title.trim(),
   };
   await createPost(data);

   const argsObject = {
      responseMessage: {
         success: successMessage.value,
         error: errorMessage.value,
      },
      reset: resetForm,
   };

   emit("form-submitted", argsObject);
}
</script>

<template>
   <!-- @vue-ignore -->
   <VeeForm v-if="!loading" :validation-schema="schema" @submit="handleSubmit">
      <div class="field">
         <p class="control has-icons-left has-icons-right">
            <Field
               class="input"
               name="title"
               type="text"
               placeholder="Title"
               :validate-on-blur="true"
            />
            <span class="icon is-small is-left">
               <img src="../../assets/svg/title.svg" alt="person logo" />
            </span>
         </p>
         <ErrorMessage name="title" class="redText" />
      </div>
      <div class="field">
         <div class="control has-icons-left">
            <div class="select fullWidth">
               <Field name="author" as="select" class="fullWidth">
                  <option value="" disabled>Select author</option>
                  <option v-for="author in authors" :key="author.id" :value="author.id">
                     {{ `${author.name} ${author.surname}` }}
                  </option>
               </Field>
            </div>
            <span class="icon is-small is-left">
               <img src="../../assets/svg/person.svg" alt="signature logo" />
            </span>
         </div>
         <ErrorMessage name="author" class="redText" />
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
               :validate-on-blur="true"
            />
            <span class="icon is-small is-left">
               <img src="../../assets/svg/description.svg" alt="signature logo" />
            </span>
         </p>
         <ErrorMessage name="content" class="redText" />
      </div>
      <div class="field">
         <p class="control">
            <button class="button">Create</button>
            <span v-if="loadingCreate" class="waitIndicator">Loading...</span>
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

.fullWidth {
   width: 100%;
}

.control {
   display: flex;
   align-items: center;
   column-gap: 1.5rem;
}

.waitIndicator {
   display: inline-block;
}
</style>
