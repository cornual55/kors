<template>
  <div class="flex h-[90%] justify-center items-center">
    <h1 class="text-lg font-semibold"><slot></slot></h1>
    <Form
      class="space-y-4 flex flex-col [&>input]:p-4 mt-5 bg-gray-300/40 rounded-xl p-10"
      @submit="signUp"
    >
      <Field name="name" type="text" placeholder="Имя пользователя" />
      <ErrorMessage class="e:rror" name="name" />
      <Field
        name="password"
        type="password"
        :rules="passwordRules"
        placeholder="Пароль"
      />
      <ErrorMessage class="error" name="password" />
      <Field
        name="password_confirm"
        type="password"
        :rules="passwordRules"
        placeholder="Подтвердите пароль"
      />
      <ErrorMessage class="error" name="password_confirm" />
      <my-button>Зарегистрироваться</my-button>
    </Form>
  </div>
</template>

<script setup>
import { useUserStore } from "../stores/UserStore";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

// const props = defineProps(["name", "password", "confirm_password"]);
const emit = defineEmits(["signup"]);
const store = useUserStore();
const router = useRouter();

const signUp = ({ name, password, password_confirm }, actions) => {
  if (password !== password_confirm) {
    actions.setFieldError("password_confirm", "Пароли не совпадают");
    return false;
  }

  let { error } = store.signUp(name, password);

  if (error) {
    actions.setFieldError("password_confirm", error);
    return false;
  }
  router.push("/login");
};

const passwordRules = yup.string().required().min(8);
</script>

<style scoped></style>
