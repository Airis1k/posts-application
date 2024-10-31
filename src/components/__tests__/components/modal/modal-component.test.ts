import { shallowMount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import ModalComponent from "@/components/modal/modal-component.vue";
import { useModalStore } from "@/stores/modal-store";
import { createTestingPinia } from "@pinia/testing";

const newPinia = createTestingPinia({
   initialState: {
      modal: null,
      isOpen: false,
   },
   stubActions: false,
   createSpy: vi.fn,
});

function factory(loadingState: boolean) {
   return shallowMount(ModalComponent, {
      props: {
         loading: loadingState,
      },
      global: {
         plugins: [newPinia],
      },
   });
}

describe("ModalComponent", () => {
   it("should display modal if the one is opened", () => {
      const modalStore = useModalStore();
      modalStore.selectModal({ template: "<div>Hello</div>" });

      const wrapper = factory(false);

      expect(wrapper.find(".modalContent").exists()).toBe(true);
   });

   it("should not display the modal if it's not opened", () => {
      const modalStore = useModalStore();
      modalStore.closeModal();

      const wrapper = factory(false);

      expect(wrapper.find(".modalContent").exists()).toBe(false);
   });

   it("should show loading message when the modal is loading", () => {
      const modalStore = useModalStore();
      modalStore.selectModal({ template: "<div>Hello</div>" });

      const wrapper = factory(true);

      expect(wrapper.find(".modalContent > div").text()).toMatch(/Loading/i);
   });
});
