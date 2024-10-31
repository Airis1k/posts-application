import { mount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import CreateAuthorForm from "@/components/forms/create-author-form.vue";
import { useCreateAuthor } from "@/composables/authors/create-author";
import { ref } from "vue";

function factory() {
   return mount(CreateAuthorForm);
}

vi.mock("@/composables/authors/create-author", () => ({
   useCreateAuthor: () => {
      const successMessage = ref<string | null>(null);
      const errorMessage = ref<string | null>(null);

      const createAuthor = vi.fn(async ({ name, surname }) => {
         if (name && surname) {
            successMessage.value = "Author was created successfully";
            errorMessage.value = null;
         } else {
            errorMessage.value = "An error occurred while creating the author";
            successMessage.value = null;
         }
      });

      return { successMessage, errorMessage, createAuthor };
   },
}));

describe("CreateAuthorForm", () => {
   it("should submit a form and return success message", async () => {
      const wrapper = factory();

      await wrapper.find("form").trigger("submit.prevent");
      const { successMessage, errorMessage, createAuthor } = useCreateAuthor();
      await createAuthor({ name: "hey", surname: "yo" });

      expect(errorMessage.value).toBe(null);
      expect(successMessage.value).toMatch(/successfully/i);
   });

   it("should submit a form and return error message", async () => {
      const wrapper = factory();

      await wrapper.find("form").trigger("submit.prevent");
      const { successMessage, errorMessage, createAuthor } = useCreateAuthor();
      await createAuthor({ name: "hey", surname: "" });

      expect(successMessage.value).toBe(null);
      expect(errorMessage.value).toMatch(/error/i);
   });
});
