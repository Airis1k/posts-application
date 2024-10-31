import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import ConfirmAction from "@/components/confirm-action.vue";
import { useConfirmGlobalState } from "@/stores/confirm-store";

describe("ConfirmAction", () => {
   it("should render a default modal message when confirm global state is not set", () => {
      const wrapper = mount(ConfirmAction);

      expect(wrapper.find(".question").text()).toBe(
         "Are you sure you want to perform this action?",
      );
   });

   it("should render a modal with message and buttons", () => {
      const confirmState = useConfirmGlobalState();
      const message = "Are you sure you want to delete this author?";
      confirmState.setConfirmMessage(message);

      const wrapper = mount(ConfirmAction);

      expect(wrapper.find(".title").exists()).toBe(true);
      expect(wrapper.find(".question").text()).toBe(message);
      expect(wrapper.find(".button").text()).toBe("Cancel");
      expect(wrapper.find(".button.is-danger").text()).toBe("OK");
   });

   it("should emit confirm action", async () => {
      const wrapper = mount(ConfirmAction);

      await wrapper.find(".button").trigger("click");
      expect(wrapper.emitted("cancel-action")).toHaveLength(1);
   });

   it("should emit cancel action", async () => {
      const wrapper = mount(ConfirmAction);

      await wrapper.find(".button.is-danger").trigger("click");
      expect(wrapper.emitted("confirm-action")).toHaveLength(1);
   });
});
