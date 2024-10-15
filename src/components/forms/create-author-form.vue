<script setup lang="ts">
import { Field, Form as VeeForm, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import { type RawAuthor } from "@/typings/authors";
import { useCreateAuthor } from "@/composables/authors/create-author";

const emit = defineEmits(["form-submitted"]);

const { successMessage, errorMessage, createAuthor } = useCreateAuthor();

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

async function handleSubmit(values: RawAuthor, { resetForm }: { resetForm: () => void }) {
   await createAuthor(values);
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
   <VeeForm :validation-schema="schema" @submit="handleSubmit">
      <div class="field">
         <p class="control has-icons-left has-icons-right">
            <Field
               class="input"
               name="name"
               type="text"
               placeholder="Name"
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
               class="input"
               name="surname"
               type="text"
               placeholder="Surname"
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
            <button class="button">Create</button>
         </p>
      </div>
   </VeeForm>
</template>

<style scoped>
.redText {
   color: #d2042d;
}
</style>
