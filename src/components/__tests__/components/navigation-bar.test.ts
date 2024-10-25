import { mount, shallowMount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import NavigationBar from "@/components/navigation-bar.vue";
import { createTestingPinia } from "@pinia/testing";
import { useUserStore } from "@/stores/user-store";

const newPinia = createTestingPinia({
   stubActions: false,
   createSpy: vi.fn,
});

function factory() {
   return shallowMount(NavigationBar, {
      global: {
         plugins: [newPinia],
      },
   });
}

describe("NavigationBar", () => {
   const userStore = useUserStore(newPinia);
   userStore.user.id = 1;
   const wrapper = factory();

   console.log(wrapper.html());
});
