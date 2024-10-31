import { shallowMount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import ToastList from "@/components/toastify/toast-list.vue";
import { useNotificationsStore } from "@/stores/notifications-store";
import { createTestingPinia } from "@pinia/testing";

const newPinia = createTestingPinia({
   stubActions: false,
   createSpy: vi.fn,
});

function factory() {
   return shallowMount(ToastList, {
      global: {
         plugins: [newPinia],
      },
   });
}

describe("ToastList", () => {
   it("should display notification list", () => {
      const notificationStore = useNotificationsStore();
      notificationStore.setSuccess("Success message");
      notificationStore.setError("Error message");

      const wrapper = factory();
      expect(wrapper.findAll("toast-item-stub").length).toBe(2);
   });

   it("should not display notification list", () => {
      const notificationStore = useNotificationsStore();
      notificationStore.removeNotification(notificationStore.notifications[1].id);
      notificationStore.removeNotification(notificationStore.notifications[0].id);

      const wrapper = factory();
      expect(wrapper.find("toast-item-stub").exists()).toBe(false);
   });
});
