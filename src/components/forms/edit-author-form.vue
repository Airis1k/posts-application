<script setup lang="ts">
import { Field, Form, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import { useSingleAuthor } from "@/composables/authors/get-single-author";
import { onMounted, reactive } from "vue";
import { useAuthorGlobalState } from "@/stores/author-store";
import { useMutateAuthor } from "@/composables/authors/edit-author";
import type { RawAuthor, RawMutateAuthor } from "@/typings/authors";

const emit = defineEmits(["form-submitted", "network-error"]);

const { author, error, loading, fetchAuthor } = useSingleAuthor();
const { successMessage, errorMessage, loading: loadingMutation, mutateAuthor } = useMutateAuthor();
const authorState = useAuthorGlobalState();

const regExp = /^[a-zA-Z]+$/;
const schema = yup.object({
   name: yup.string().min(3).matches(regExp, "Name must contain only letters").max(15).required(),
   surname: yup
      .string()
      .min(3)
      .matches(regExp, "Surname must contain only letters")
      .max(15)
      .required(),
});

let formValues = {
   name: "",
   surname: "",
};

const responseMessage = reactive({ success: "", error: "" });

onMounted(async () => {
   const authorId = authorState.authorId.value;
   if (!authorId) return;

   await fetchAuthor(authorId);

   if (error.value) {
      emit("network-error");
      return;
   }

   formValues = {
      name: author.value!.name,
      surname: author.value!.surname,
   };
});

function isDataChanged({ name, surname }: RawAuthor): boolean {
   if (author.value?.name === name && author.value?.surname === surname) {
      return false;
   }

   return true;
}

async function onSubmit(values: RawAuthor, { resetForm }: { resetForm: () => void }) {
   if (!author.value?.id) {
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

   const rawData: RawMutateAuthor = {
      id: author.value!.id,
      name: values.name,
      surname: values.surname,
      created_at: author.value!.created_at,
   };

   await mutateAuthor(rawData);
   if (errorMessage.value) {
      emit("network-error");
      return;
   }

   Object.assign(responseMessage, {
      success: successMessage.value,
      error: errorMessage.value,
   });

   emit("form-submitted", { responseMessage, reset: resetForm });
}
</script>

<template>
   <div v-if="!loading">
      <!-- @vue-ignore -->
      <Form
         v-if="author"
         @submit="onSubmit"
         :validation-schema="schema"
         :initial-values="formValues"
      >
         <div class="field">
            <p class="control has-icons-left has-icons-right">
               <Field
                  name="name"
                  class="input"
                  type="text"
                  placeholder="Name"
                  v-model="formValues.name"
                  :validate-on-blur="true"
               />
               <span class="icon is-small is-left">
                  <img src="../../assets/svg/person.svg" alt="person logo" />
               </span>
            </p>
            <ErrorMessage name="name" class="redText" />
         </div>
         <div class="field">
            <p class="control has-icons-left">
               <Field
                  name="surname"
                  class="input"
                  type="text"
                  placeholder="Surname"
                  v-model="formValues.surname"
                  :validate-on-blur="true"
               />
               <span class="icon is-small is-left">
                  <img src="../../assets/svg/signature.svg" alt="signature logo" />
               </span>
            </p>
            <ErrorMessage name="surname" class="redText" />
         </div>
         <div class="field">
            <p class="control">
               <button class="button">Confirm</button>
               <span v-if="loadingMutation" class="infoMessage">Loading...</span>
            </p>
         </div>
      </Form>
      <div v-else>Network error</div>
   </div>
   <div v-else>Loading...</div>
</template>

<style scoped>
.redText {
   color: #d2042d;
   margin-top: 0.5rem;
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
