import { shallowMount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import AuthorsList from "@/components/authors/authors-list.vue";

function factory(props) {
   return shallowMount(AuthorsList, {
      props: {
         ...props,
      },
   });
}

const authorObj = {
   authors: [
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
         name: "Rose",
         surname: "Smith",
         userId: 1,
         created_at: "2024-05-07T12:00:00Z",
         updated_at: "2024-05-07T12:00:00Z",
      },
   ],
   loading: false,
   error: null,
};

const loadingObj = {
   authors: null,
   loading: true,
   error: null,
};

const errorObj = {
   authors: null,
   loading: false,
   error: new Error("Network Error"),
};

const emptyObj = {
   authors: null,
   loading: false,
   error: null,
};

describe("AuthorsList", () => {
   it("should render no author list when authors array is empty", () => {
      const wrapper = factory(emptyObj);

      expect(wrapper.find("p").text()).toMatch(/no matches/i);
   });

   it("should render author list when authors array is not empty", () => {
      const wrapper = factory(authorObj);

      expect(authorObj.authors.length).toBe(2);
      expect(wrapper.find(".listWrap").exists()).toBe(true);
   });

   it("should render loading status when data is loading", () => {
      const wrapper = factory(loadingObj);

      expect(wrapper.find(".loadingStyle").exists()).toBe(true);
   });

   it("should render an error when request is failed", () => {
      const wrapper = factory(errorObj);

      const secondElement = wrapper.findAll("p")[1];
      expect(secondElement.text()).toMatch(/no authors/i);
   });
});
