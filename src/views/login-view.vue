<script setup lang="ts">
import { watch } from "vue";
import { useRouter } from "vue-router";
import { useUserLogin } from "@/composables/login/user-login";
import { useNotificationsStore } from "@/stores/notifications-store";
import LoginForm from "@/components/forms/login-form.vue";
import { AxiosError } from "axios";

const router = useRouter();

const { credentials, error, loginUser } = useUserLogin();

const notificationStore = useNotificationsStore();

const notifySuccess = (msg: string) => notificationStore.setSuccess(msg);
const notifyError = (msg: string) => notificationStore.setError(msg);

async function handleLoginSubmit(email: string, password: string) {
   await loginUser(email, password);
   if (credentials.value) {
      notifySuccess("User has logged in successfully!");
      router.push("/");
   }
}

watch(error, (newError) => {
   if (newError instanceof AxiosError && newError.status === 400) {
      notifyError("Username or password is incorrect");
      return;
   }
   if (newError) {
      notifyError(newError.message);
   }
});
</script>

<template>
   <div class="container">
      <h1 class="headingText">Login form</h1>
      <LoginForm @form-submitted="handleLoginSubmit" />
   </div>
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
</style>
