<script setup lang="ts">
import { useNotificationsStore } from "../../stores/notifications-store";
import ToastItem from "./toast-item.vue";

const notificationStore = useNotificationsStore();
const notifications = notificationStore.notifications;
</script>

<template>
   <div class="toast-container">
      <transition-group name="list" tag="div">
         <ToastItem
            v-for="notification in notifications"
            :key="notification.id"
            :notification="notification"
         />
      </transition-group>
   </div>
</template>

<style scoped>
.toast-container {
   position: fixed;
   top: 20px;
   right: 20px;
   z-index: 9999;
   width: 300px;
}

.list-enter-active,
.list-leave-active {
   transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
   opacity: 0;
   transform: translateX(30px);
}
</style>
