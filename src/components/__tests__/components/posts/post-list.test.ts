import { shallowMount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import PostsList from "@/components/posts/posts-list.vue";

function factory(props) {
   return shallowMount(PostsList, {
      props: {
         ...props,
      },
   });
}

const postObj = {
   postsWithAuthor: [
      {
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
      },
      {
         id: 2,
         title: "Second Post",
         body: "Hello world lorem ipsum dolor",
         authorId: 2,
         userId: 1,
         created_at: "2024-05-07T12:00:00Z",
         updated_at: "2024-05-07T12:00:00Z",
         author: {
            id: 2,
            name: "Jack",
            surname: "Smith",
            userId: 1,
            created_at: "2024-05-07T12:00:00Z",
            updated_at: "2024-05-07T12:00:00Z",
         },
      },
   ],
   loading: false,
   error: null,
};

const loadingObj = {
   postsWithAuthor: null,
   loading: true,
   error: null,
};

const errorObj = {
   postsWithAuthor: null,
   loading: false,
   error: new Error("Network Error"),
};

const emptyObj = {
   postsWithAuthor: null,
   loading: false,
   error: null,
};

describe("PostsList", () => {
   it("should render posts list", () => {
      const wrapper = factory(postObj);

      expect(wrapper.find(".listWrap").exists()).toBe(true);
      expect(wrapper.findAll("post-item-stub").length).toBe(2);
   });

   it("should not render any post when array list is empty", () => {
      const wrapper = factory(emptyObj);

      expect(wrapper.find("p").text()).toMatch(/no matches/i);
   });

   it("should render loading status when the HTTP request is not finished", () => {
      const wrapper = factory(loadingObj);

      expect(wrapper.find(".loadingStyle").exists()).toBe(true);
   });

   it("should render error message when HTTP request was failed", () => {
      const wrapper = factory(errorObj);

      expect(wrapper.find("[data-test='error-message']").text()).toMatch(/no posts/i);
   });
});
