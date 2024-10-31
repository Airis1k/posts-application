import { mount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import ToastItem from "@/components/toastify/toast-item.vue";
import { useNotificationsStore } from "@/stores/notifications-store";
import { createTestingPinia } from "@pinia/testing";
import type { Notification } from "@/typings/notification";

const newPinia = createTestingPinia({
   stubActions: false,
   createSpy: vi.fn,
});

function factory(notification: Notification) {
   return mount(ToastItem, {
      props: {
         notification: {
            ...notification,
         },
      },
      global: {
         plugins: [newPinia],
      },
   });
}

const successObj = {
   id: "uniqueid123",
   message: "hello world success test",
   type: "success",
};

const errorObj = {
   id: "uniqueid456",
   message: "hello world failed test",
   type: "error",
};

describe("ToastItem", () => {
   it("should display success notification when action was successfull", () => {
      const wrapper = factory(successObj);

      expect(wrapper.find(".notificationIcon").attributes("src")).toMatch(/success/i);
      expect(wrapper.find(".notifyWrap > p").text()).toMatch(/success/i);
   });

   it("should display error notification when action was failed", () => {
      const wrapper = factory(errorObj);

      expect(wrapper.find(".notificationIcon").attributes("src")).toMatch(/error/i);
      expect(wrapper.find(".notifyWrap > p").text()).toMatch(/failed/i);
   });

   it("should close notification when user clicks on close icon", async () => {
      const notificationStore = useNotificationsStore();
      notificationStore.setSuccess("hello");
      const wrapper = factory(successObj);

      const notificationId = notificationStore.notifications[0].id;
      expect(notificationStore.notifications.length).toBe(1);
      await wrapper.find("[data-test='removeButton']").trigger("click");
      notificationStore.removeNotification(notificationId);
      expect(notificationStore.notifications.length).toBe(0);
   });
});
