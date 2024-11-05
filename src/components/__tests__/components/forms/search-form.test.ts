import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import SearchForm from "@/components/forms/search-form.vue";
import { ref } from "vue";

function factory(search: string) {
   return mount(SearchForm, {
      props: {
         searchPlaceholder: search,
      },
   });
}

describe("SearchForm", () => {
   it("should emit search submit", async () => {
      const wrapper = factory("author");

      const search = ref("hey");
      await wrapper.find("input").setValue("hello");
      console.log(wrapper.html());
      console.log(wrapper.find("input").html());
   });
});
