import { mount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import CreatePostForm from "@/components/forms/create-post-form.vue";
import { useCreatePost } from "@/composables/posts/create-post";
import { useAllAuthors } from "@/composables/authors/get-all-authors";
import { ref } from "vue";
import type { Author } from "@/typings/authors";

function factory() {
   return mount(CreatePostForm);
}

vi.mock("@/composables/posts/create-post", () => ({
   useCreatePost: () => {
      const successMessage = ref<string | null>(null);
      const errorMessage = ref<string | null>(null);

      const createPost = vi.fn(({ title, author, content }) => {
         if (title && author && content) {
            successMessage.value = "Post was created successfully";
            errorMessage.value = null;
         } else {
            successMessage.value = null;
            errorMessage.value = "There was an error";
         }
      });

      return { successMessage, errorMessage, createPost };
   },
}));

vi.mock("@/composables/authors/get-all-authors", () => ({
   useAllAuthors: () => {
      const authors = ref<Author[] | null>(null);
      const error = ref<string | null>(null);

      const fetchAuthors = vi.fn(() => {
         
      })
   }
}))

describe("CreatePostForm", () => {
   it("should submit a form and return success message", async () => {
      const wrapper = factory();

      await wrapper.find("form").trigger("submit.prevent");
      const { successMessage, errorMessage, createPost } = useCreatePost();
      await createPost({ title: "First Post", author: 1, content: "Lorem ipsum dolor" });

      expect(successMessage.value).toMatch(/successfully/i);
      expect(errorMessage.value).toBe(null);
   });

   it("should submit a form and return error message", async () => {
      const wrapper = factory();

      await wrapper.find("form").trigger("submit.prevent");
      const { successMessage, errorMessage, createPost } = useCreatePost();
      await createPost({ title: "", author: 1, content: "" });

      expect(successMessage.value).toBe(null);
      expect(errorMessage.value).toMatch(/error/i);
   });
});
