import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import SinglePost from "@/components/single-post.vue";
import { useCurrentDateFormatted, useFormatDate } from "@/utils/format-date";

function factory(props) {
   return mount(SinglePost, {
      props: {
         postWithAuthor: {
            ...props,
         },
      },
   });
}

const postObj = {
   authorId: 1,
   body: "Hello World",
   created_at: "2024-05-05T12:00:00Z",
   id: 1,
   title: "First Post",
   updated_at: "2024-05-05T12:00:00Z",
   userId: 1,
   author: {
      created_at: "2024-05-05T12:00:00Z",
      id: 1,
      name: "John",
      surname: "Doe",
      updated_at: "2024-05-05T12:00:00Z",
      userId: 1,
   },
};

describe("SinglePost", () => {
   it("renders post info", () => {
      const wrapper = factory(postObj);

      expect(wrapper.find(".date").text()).toBe("2024-05-05");
      expect(wrapper.find(".title").text()).toBe("First Post");
      expect(wrapper.find(".description").text()).toBe("Hello World");
      expect(wrapper.find(".author").text()).toBe("John Doe");
   });

   it("should show different dates when post was updated", () => {
      postObj.updated_at = useCurrentDateFormatted();
      const formatted = useFormatDate(new Date(postObj.created_at));
      const wrapper = factory(postObj);

      expect(wrapper.find(".date").text()).not.toBe(formatted);
   });
});
