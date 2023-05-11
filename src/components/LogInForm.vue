<template>
  <div>
    <h1 class="text-lg font-semibold"><slot></slot></h1>
    <form class="space-y-4 flex flex-col [&>*]:p-4 mt-5" @submit.prevent>
      <input v-model="name" type="text" placeholder="Имя пользователя" />
      <input v-model="password" type="text" placeholder="Пароль" />
      <my-button @click="signUp">Войти</my-button>
    </form>
  </div>
</template>

<script setup>
import { useUserStore } from "../stores/UserStore";
import { storeToRefs } from "pinia";
import { ref } from "vue";
// const props = defineProps(["name", "password", "confirm_password"]);
const name = ref("");
const password = ref("");
const emit = defineEmits(["signup"]);
const store = useUserStore();

const signUp = () => {
  store.signIn(name.value, password.value);
  emit("signup");
};
</script>

<style scoped></style>
