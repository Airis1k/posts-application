import { mount, shallowMount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import NavigationBar from "@/components/navigation-bar.vue";
import { createTestingPinia } from "@pinia/testing";
import { useUserStore } from "@/stores/user-store";
import { useRouter } from "vue-router";

const newPinia = createTestingPinia({
   stubActions: false,
   createSpy: vi.fn,
});

vi.mock("vue-router", async () => {
   const actual = await vi.importActual("vue-router");

   return {
      ...actual,
      useRouter: vi.fn(() => ({
         push: vi.fn(),
      })),
   };
});

function factory() {
   return shallowMount(NavigationBar, {
      global: {
         plugins: [newPinia],
         stubs: ["router-link"],
      },
   });
}

describe("NavigationBar", () => {
   it("should render user name when the user is authenticated", () => {
      const userStore = useUserStore(newPinia);
      userStore.user.id = 1;
      userStore.user.name = "Blessed";
      const wrapper = factory();

      expect(wrapper.find(".authWrap > p").text()).toBe(`Welcome, ${userStore.user.name}`);
      expect(wrapper.find("[data-test='login']").exists()).toBe(false);
   });

   it("should render login button when the user is not authenticated", () => {
      const userStore = useUserStore(newPinia);
      userStore.reset();
      const wrapper = factory();

      expect(wrapper.find("[data-test='login']").exists()).toBe(true);
   });

   it("should log off when authenticated user clicks on logout button", async () => {
      const push = vi.fn();
      useRouter.mockImplementationOnce(() => ({
         push,
      }));

      const userStore = useUserStore(newPinia);
      userStore.user.id = 1;
      userStore.user.name = "Blessed";
      const wrapper = factory();

      const logoutBtn = wrapper.find(".authWrap > button");
      await logoutBtn.trigger("click");

      expect(wrapper.find("[data-test='login']").exists()).toBe(true);
      expect(push).toHaveBeenCalledTimes(1);
      expect(push).toHaveBeenCalledWith({ name: "Login" });
   });

   it("should render other routes", () => {
      const wrapper = factory();

      const routerLinks = wrapper.findAll(".navbar-start .navbar-item");
      expect(routerLinks.length).toBe(2);
   });
});
