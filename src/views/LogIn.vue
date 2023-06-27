<template>
  <div class="flex h-[90%] justify-center items-center">
    <h1 class="text-lg font-semibold"><slot></slot></h1>
    <form
      class="space-y-4 flex flex-col [&>input]:p-4 mt-5 bg-gray-300/40 rounded-xl p-10"
      @submit.prevent="login"
    >
      <input v-model="name" type="text" placeholder="имя пользователя" />
      <input v-model="password" type="password" placeholder="пароль" />
      <div class="error">{{ error_message }}</div>
      <my-button>Войти</my-button>
    </form>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/UserStore.js";
import { Field, Form, ErrorMessage } from "vee-validate";
import { ref } from "vue";
// const props = defineprops(["name", "password", "confirm_password"]);
const name = ref("");
const password = ref("");
const emit = defineEmits(["signup"]);
const store = useUserStore();

const router = useRouter();
const error_message = ref("");

const login = async () => {
  const { error } = await store.logIn(name.value, password.value);
  if (error) {
    error_message.value = error;
    return false;
  }
  router.push("/shelf-lives");
};
</script>

<style scoped></style>
