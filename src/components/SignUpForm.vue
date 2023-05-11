<template>
  <div>
    <h1 class="text-lg font-semibold"><slot></slot></h1>
    <form class="space-y-4 flex flex-col [&>*]:p-4 mt-5" @submit.prevent>
      <input v-model="name" type="text" placeholder="Имя пользователя" />
      <input v-model="password" type="text" placeholder="Пароль" />
      <input
        v-model="password_confirm"
        type="text"
        placeholder="Подтвердите пароль"
      />
      <my-button @click="signUp">Зарегистрироваться</my-button>
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
const password_confirm = ref("");
const emit = defineEmits(["signup"]);
const store = useUserStore();

const signUp = () => {
  store.signUp(name.value, password.value, password_confirm.value);
  emit("signup");
};
</script>

<style scoped></style>
