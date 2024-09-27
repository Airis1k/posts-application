import { defineStore } from "pinia";
import { ref, readonly } from "vue";
import { v4 as uuidv4 } from "uuid";
import { type Notification } from "../typings/notification";

export const useNotificationsStore = defineStore("notifications", () => {
   const notifications = ref<Notification[]>([]);

   function addNotificationToList(notification: Notification) {
      notifications.value.push(notification);

      if (notifications.value.length === 1) {
         startNotificationTimer();
      }
   }

   function startNotificationTimer(timeout: number = 4000) {
      if (notifications.value.length === 0) return;

      setTimeout(() => {
         notifications.value.shift();
         startNotificationTimer();
      }, timeout);
   }

   function removeNotification(id: string) {
      const index = notifications.value.findIndex((notification) => notification.id === id);
      if (index !== -1) {
         notifications.value.splice(index, 1);
      }
   }

   function setSuccess(message: string) {
      const notificationObj: Notification = {
         id: uuidv4(),
         message: message,
         type: "success",
      };

      addNotificationToList(notificationObj);
   }

   function setError(message: string) {
      const notificationObj: Notification = {
         id: uuidv4(),
         message: message,
         type: "error",
      };

      addNotificationToList(notificationObj);
   }

   return { notifications: readonly(notifications), setSuccess, setError, removeNotification };
});
