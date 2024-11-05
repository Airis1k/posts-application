import { mount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import EditAuthorForm from "@/components/forms/edit-author-form.vue";
import { useSingleAuthor } from "@/composables/authors/get-single-author";
import { useMutateAuthor } from "@/composables/authors/edit-author";
import { ref } from "vue";

function factory() {
   return mount(EditAuthorForm);
}

vi.mock("@/composables/authors/get-single-author", () => ({
   useSingleAuthor: () => ({
      author: ref({
         id: 1,
         name: "John",
         surname: "Doe",
         userId: 1,
         created_at: "2024-05-05T12:00:00Z",
         updated_at: "2024-05-05T12:00:00Z",
      }),
      error: ref("Something went wrong"),
      loading: ref(false),
      fetchAuthor: vi.fn(),
   }),
}));

vi.mock("@/composables/authors/edit-author", () => ({
   useMutateAuthor: () => ({
      successMessage: ref("Author was successfully updated"),
      errorMessage: ref("Something went wrong"),
      mutateAuthor: vi.fn(),
   }),
}));

const authorObj = {
   id: 1,
   name: "Tom",
   surname: "Smith",
   created_at: "2024-05-05T12:00:00Z",
};

describe("EditAuthorForm", () => {
   it("should load edit form with the fetched single author values filled in", async () => {
      const wrapper = factory();
      const { author, fetchAuthor } = useSingleAuthor();
      await fetchAuthor(1);

      const nameInput = wrapper.find("[name='name']");
      const surnameInput = wrapper.find("[name='surname']");

      await nameInput.setValue(author.value?.name);
      await surnameInput.setValue(author.value?.surname);

      expect(nameInput.attributes("value")).toBe(author.value?.name);
      expect(surnameInput.attributes("value")).toBe(author.value?.surname);
   });

   it("should not fill single author values in edit form", async () => {
      const wrapper = factory();
      const { fetchAuthor } = useSingleAuthor();
      await fetchAuthor(0);

      expect(wrapper.find("[name='name']").attributes("value")).toBe("");
      expect(wrapper.find("[name='surname']").attributes("value")).toBe("");
   });

   it("should return success message after form submit", async () => {
      const wrapper = factory();

      const nameInput = wrapper.find("[name='name']");
      const surnameInput = wrapper.find("[name='surname']");

      await nameInput.setValue("Arthur");
      await surnameInput.setValue("Morgan");

      await wrapper.find("form").trigger("submit.prevent");
      const { successMessage, mutateAuthor } = useMutateAuthor();
      mutateAuthor(authorObj);

      expect(successMessage.value).toMatch(/successfully/i);
      expect(nameInput.attributes("value")).toBe("Arthur");
      expect(surnameInput.attributes("value")).toBe("Morgan");
   });

   it("should return error message after form submit", async () => {
      const wrapper = factory();

      const nameInput = wrapper.find("[name='name']");
      const surnameInput = wrapper.find("[name='surname']");

      await nameInput.setValue("Arthur");
      await surnameInput.setValue("Morgan");

      await wrapper.find("form").trigger("submit.prevent");
      const { errorMessage, mutateAuthor } = useMutateAuthor();
      mutateAuthor(authorObj);

      expect(errorMessage.value).toMatch(/wrong/i);
   });
});
