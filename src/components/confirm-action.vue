<script setup lang="ts">
import { useConfirmGlobalState } from "@/stores/confirm-store";
import { computed } from "vue";

const emit = defineEmits(["confirm-action", "cancel-action"]);

const confirmState = useConfirmGlobalState();
const message = computed(() =>
   confirmState.message.value
      ? confirmState.message.value
      : "Are you sure you want to perform this action?",
);

function confirm() {
   emit("confirm-action");
}

function cancel() {
   emit("cancel-action");
}
</script>

<template>
   <div>
      <h3 class="title">Confirm</h3>
      <p class="question">
         {{ message }}
      </p>
      <div class="buttonWrap">
         <button class="button" @click="cancel">Cancel</button>
         <button class="button is-danger" @click="confirm">OK</button>
      </div>
   </div>
</template>

<style scoped>
.question {
   margin-bottom: 1rem;
}

.buttonWrap {
   display: flex;
   justify-content: flex-end;
   column-gap: 1rem;
}
</style>
