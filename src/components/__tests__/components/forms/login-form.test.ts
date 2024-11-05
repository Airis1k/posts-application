import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import LoginForm from "@/components/forms/login-form.vue";

function factory() {
   return mount(LoginForm);
}

describe("LoginForm", () => {
   it("should emit login form", async () => {
      const wrapper = factory();

      const emailInput = wrapper.find("[name='email']");
      const passwordInput = wrapper.find("[name='password']");

      const email = "john@gmail.com";
      const password = "password123@k";

      await emailInput.setValue(email);
      await passwordInput.setValue(password);

      await wrapper.find("form").trigger("submit.prevent");

      expect(emailInput.attributes("value")).toBe(email);
      expect(passwordInput.attributes("value")).toBe(password);
      expect(wrapper.emitted()).toHaveProperty("submit");
   });
});
