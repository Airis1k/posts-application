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
         authors.value = [
            {
               id: 1,
               name: "John",
               surname: "Doe",
               userId: 1,
               created_at: "2024-05-05T12:00:00Z",
               updated_at: "2024-05-05T12:00:00Z",
            },
            {
               id: 2,
               name: "Jack",
               surname: "Doe",
               userId: 1,
               created_at: "2024-05-07T12:00:00Z",
               updated_at: "2024-05-07T12:00:00Z",
            },
         ];
         error.value = null;
      });

      return { authors, error, fetchAuthors };
   },
}));

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

   it("should successfully fetch authors when component is mounted", async () => {
      const wrapper = factory();

      const { error, fetchAuthors } = useAllAuthors();
      await fetchAuthors();

      expect(wrapper.findAll("select option").length).toBe(3);
      expect(error.value).toBe(null);
   });
});
