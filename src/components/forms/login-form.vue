<script setup lang="ts">
import { Field, Form as VeeForm, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import { type Credentials } from "@/typings/login";

const emit = defineEmits(["form-submitted"]);

const schema = yup.object({
   email: yup.string().email().required(),
   password: yup.string().min(6).required(),
});

function handleSubmit(values: Credentials, { resetForm }: { resetForm: () => void }) {
   emit("form-submitted", values.email, values.password);
   resetForm();
}
</script>

<template>
   <!-- @vue-ignore -->
   <VeeForm :validation-schema="schema" @submit="handleSubmit">
      <div class="field">
         <p class="control has-icons-left has-icons-right">
            <Field
               class="input"
               name="email"
               type="email"
               placeholder="Email"
               :validate-on-blur="true"
            />
            <span class="icon is-small is-left">
               <img src="../../assets/svg/mail.svg" alt="mail logo" />
            </span>
         </p>
         <ErrorMessage name="email" class="redText" />
      </div>
      <div class="field">
         <p class="control has-icons-left">
            <Field
               class="input"
               name="password"
               type="password"
               placeholder="Password"
               :validate-on-blur="true"
            />
            <span class="icon is-small is-left">
               <img src="../../assets/svg/lock.svg" alt="lock logo" />
            </span>
         </p>
         <ErrorMessage name="password" class="redText" />
      </div>
      <div class="field">
         <p class="control">
            <button class="button">Login</button>
         </p>
      </div>
   </VeeForm>
</template>

<style scoped>
.field {
   max-width: 300px;
}

.redText {
   color: #d2042d;
}
</style>
