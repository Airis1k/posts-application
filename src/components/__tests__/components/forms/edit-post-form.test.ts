import { mount } from "@vue/test-utils";
import { describe, expect, it, vi } from "vitest";
import EditPostForm from "@/components/forms/edit-post-form.vue";
import { useMutatePost } from "@/composables/posts/edit-post";
import { ref } from "vue";
import { RawMutatePost } from "@/typings/posts";

function factory() {
   return mount(EditPostForm);
}

vi.mock("@/composables/posts/edit-post", () => ({
   useMutatePost: () => {
      const successMessage = ref<string | null>(null);
      const errorMessage = ref<string | null>(null);

      function isEmpty(obj) {
         for (const prop in obj) {
            if (Object.hasOwn(obj, prop)) {
               return false;
            }
         }

         return true;
      }

      const mutatePost = vi.fn((post: RawMutatePost) => {
         console.log(post);
         if (!isEmpty(post)) {
            successMessage.value = "Post has been updated successfully";
            errorMessage.value = null;
         } else {
            successMessage.value = null;
            errorMessage.value = "Something went wrong";
         }
      });

      return { successMessage, errorMessage, mutatePost };
   },
}));

const postObj = {
   id: 1,
   title: "First Post Updated",
   body: "Lorem ipsum dolor",
   authorId: 1,
   created_at: "2024-05-05T12:00:00Z",
};

describe("EditPostForm", () => {
   it("should return success message after form submit", async () => {
      const wrapper = factory();

      const { successMessage, errorMessage, mutatePost } = useMutatePost();
      await wrapper.find("form").trigger("submit.prevent");
      await mutatePost(postObj);

      expect(successMessage.value).toMatch(/successfully/i);
      expect(errorMessage.value).toBe(null);
   });

   it("should return error message after form submit", async () => {
      const wrapper = factory();

      const { successMessage, errorMessage, mutatePost } = useMutatePost();
      await wrapper.find("form").trigger("submit.prevent");
      await mutatePost({});

      expect(successMessage.value).toBe(null);
      expect(errorMessage.value).toMatch(/wrong/i);
   });
});
