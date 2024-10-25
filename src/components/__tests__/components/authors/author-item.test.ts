import { mount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import AuthorItem from "@/components/authors/author-item.vue";
import { createTestingPinia } from "@pinia/testing";
import { useUserStore } from "@/stores/user-store";

const newPinia = createTestingPinia({
   stubActions: false,
   createSpy: vi.fn,
});

function factory(props) {
   return mount(AuthorItem, {
      props: {
         author: {
            ...props,
         },
      },
      global: {
         plugins: [newPinia],
      },
   });
}

const authorObj = {
   id: 1,
   name: "John",
   surname: "Doe",
   userId: 1,
   created_at: "2024-05-05T12:00:00Z",
   updated_at: "2024-05-05T12:00:00Z",
};

describe("AuthorItem", () => {
   it("renders an author", () => {
      const wrapper = factory(authorObj);

      const title = wrapper.get("[data-test='title']");

      expect(title.text()).toBe("John Doe");
   });

   it("renders edit and delete buttons", async () => {
      const store = useUserStore(newPinia);
      store.user.id = 1;
      const wrapper = factory(authorObj);

      expect(wrapper.find("[data-test='edit']").exists()).toBe(true);
      expect(wrapper.find("[data-test='delete']").exists()).toBe(true);
   });

   it("doesn't render edit and delete buttons", async () => {
      const store = useUserStore(newPinia);
      store.user.id = 0;
      const wrapper = factory(authorObj);

      expect(wrapper.find("[data-test='edit']").exists()).toBe(false);
      expect(wrapper.find("[data-test='delete']").exists()).toBe(false);
   });

   it("emit edit click event", async () => {
      const store = useUserStore(newPinia);
      store.user.id = 1;
      const wrapper = factory(authorObj);

      await wrapper.find("[data-test='edit']").trigger("click");
      expect(wrapper.emitted()["edit-click"][0][0]).toBe(authorObj.id);
   });

   it("emit delete click event", async () => {
      const store = useUserStore(newPinia);
      store.user.id = 1;
      const wrapper = factory(authorObj);

      await wrapper.find("[data-test='delete']").trigger("click");
      expect(wrapper.emitted()["delete-click"][0][0]).toBe(authorObj.id);
   });

   it("show latest date", () => {
      authorObj.updated_at = "2024-05-07T12:00:00Z";
      const wrapper = factory(authorObj);

      expect(wrapper.find("[data-test='date']").text()).toBe("2024-05-07");
   });
});
