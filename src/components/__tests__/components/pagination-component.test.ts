import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import PaginationComponent from "@/components/pagination-component.vue";

function factory(props) {
   return mount(PaginationComponent, {
      props: {
         ...props,
      },
   });
}

const propsObj = {
   totalCount: 10,
   itemsPerPage: 3,
   currentPage: 1,
};

const emptyObj = {
   totalCount: 0,
   itemsPerPage: 0,
   currentPage: 0,
};

describe("PaginationComponent", () => {
   it("should show pagination component content", () => {
      const wrapper = factory(propsObj);

      expect(wrapper.find("p").exists()).toBe(true);
   });

   it("should emit on next button click", async () => {
      const wrapper = factory(propsObj);

      const nextBtn = wrapper.findAll(".navButton")[1];
      await nextBtn.trigger("click");

      expect(wrapper.emitted("page-changed")).toHaveLength(1);
   });

   it("should emit on previous button click", async () => {
      propsObj.currentPage = 3;
      const wrapper = factory(propsObj);

      const previousBtn = wrapper.findAll(".navButton")[0];
      await previousBtn.trigger("click");

      expect(wrapper.emitted("page-changed")).toHaveLength(1);
   });

   it("should not let you navigate to next page when you are on the last page", async () => {
      propsObj.currentPage = 4;
      const wrapper = factory(propsObj);

      const nextBtn = wrapper.findAll(".navButton")[1];
      await nextBtn.trigger("click");

      expect(wrapper.emitted()).toEqual({});
   });

   it("should net let you navigate to previous page when you are in the first page", async () => {
      propsObj.currentPage = 1;
      const wrapper = factory(propsObj);

      const previousBtn = wrapper.findAll(".navButton")[0];
      await previousBtn.trigger("click");

      expect(wrapper.emitted()).toEqual({});
   });

   it("should not show page info if total count of pages to show is 0", () => {
      const wrapper = factory(emptyObj);

      expect(wrapper.find(".pageInfo").exists()).toBe(false);
   });
});
