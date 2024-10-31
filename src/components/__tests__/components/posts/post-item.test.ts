import { mount, shallowMount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import PostItem from "@/components/posts/post-item.vue";
import { useUserStore } from "@/stores/user-store";
import { createTestingPinia } from "@pinia/testing";
import { useFormatDate } from "@/utils/format-date";

const newPinia = createTestingPinia({
   stubActions: false,
   createSpy: vi.fn,
});

function factory(props) {
   return shallowMount(PostItem, {
      props: {
         postWithAuthor: {
            ...props,
         },
      },
      global: {
         plugins: [newPinia],
      },
   });
}

const postObj = {
   id: 1,
   title: "First Post",
   body: "Lorem ipsum dolor",
   authorId: 1,
   userId: 1,
   created_at: "2024-05-05T12:00:00Z",
   updated_at: "2024-05-05T12:00:00Z",
   author: {
      id: 1,
      name: "John",
      surname: "Doe",
      userId: 1,
      created_at: "2024-05-05T12:00:00Z",
      updated_at: "2024-05-05T12:00:00Z",
   },
};

const userObj = {
   accessToken: "mytoken",
   user: { id: 1, email: "user@gmail.com", name: "username" },
};

describe("PostItem", () => {
   it("should render post information", () => {
      const userStore = useUserStore();
      userStore.save(userObj);

      const wrapper = factory(postObj);

      const fullName = `${postObj.author.name} ${postObj.author.surname}`;
      expect(wrapper.find(".card-header-title").text()).toBe(fullName);

      const formatted = useFormatDate(new Date(postObj.created_at));
      expect(wrapper.find(".date").text()).toBe(formatted);
   });

   it("should render edit and delete buttons for authenticated user", () => {
      const userStore = useUserStore();
      userStore.save(userObj);

      const wrapper = factory(postObj);

      expect(wrapper.find("[data-test='edit-button']").exists()).toBe(true);
      expect(wrapper.find("[data-test='delete-button']").exists()).toBe(true);
   });

   it("should not render edit and delete buttons for not authenticated user", () => {
      const userStore = useUserStore();
      userStore.reset();
      const wrapper = factory(postObj);

      expect(wrapper.find("[data-test='edit-button']").exists()).toBe(false);
      expect(wrapper.find("[data-test='delete-button']").exists()).toBe(false);
   });

   it("should emit edit click", async () => {
      const userStore = useUserStore();
      userStore.save(userObj);

      const wrapper = factory(postObj);

      await wrapper.find("[data-test='edit-button']").trigger("click");
      expect(wrapper.emitted("edit-click")).toHaveLength(1);
   });

   it("should emit delete click", async () => {
      const userStore = useUserStore();
      userStore.save(userObj);

      const wrapper = factory(postObj);

      await wrapper.find("[data-test='delete-button']").trigger("click");
      expect(wrapper.emitted("delete-click")).toHaveLength(1);
   });
});
