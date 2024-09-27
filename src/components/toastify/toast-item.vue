<script setup lang="ts">
import { useNotificationsStore } from "../../stores/notifications-store";
import { type Notification } from "../../typings/notification";
import successIcon from "../../assets/svg/success-icon.svg";
import errorIcon from "../../assets/svg/error-icon.svg";
import closeIcon from "../../assets/svg/close-icon.svg";

defineProps<{
   notification: Notification;
}>();

const notificationStore = useNotificationsStore();

function getIcon(type: string) {
   return type === "success" ? successIcon : errorIcon;
}
</script>

<template>
   <div class="toast">
      <div class="notifyWrap">
         <img :src="getIcon(notification.type)" alt="notification icon" class="notificationIcon" />
         <p>{{ notification.message }}</p>
      </div>
      <div>
         <button @click="notificationStore.removeNotification(notification.id)">
            <img :src="closeIcon" alt="close icon" class="closeIcon" />
         </button>
      </div>
   </div>
</template>

<style scoped>
.toast {
   padding: 10px 20px;
   margin-bottom: 10px;
   border-radius: 5px;
   color: var(--color-background);
   font-weight: bold;
   opacity: 0.9;
   transition: opacity 0.5s ease-out;
   display: flex;
   justify-content: space-between;
   background-color: var(--color-background-reverse);
}
.notifyWrap {
   display: flex;
   align-items: center;
   column-gap: 1rem;
   padding: 0.7rem;
}
.notificationIcon {
   width: 20px;
   height: 20px;
}
.closeIcon {
   width: 15px;
   height: 15px;
   display: block;
   cursor: pointer;
   filter: var(--toastify-close-button-color);
}
</style>
