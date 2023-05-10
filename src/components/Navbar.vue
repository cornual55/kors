<template>
  <div class="container flex flex-wrap justify-between items-center">
    <div class="flex items-end gap-3 -mt-3">
      <logo class="inline w-[3.2rem] h-auto" />
      <h2 class="text-lg tracking-wider leading-5 inline">
        Срок <br />годности
      </h2>
    </div>
    <button
      class="text-gray-500 w-10 h-10 relative focus:outline-none bg-white md:hidden"
      @click="showMobileMenu = !showMobileMenu"
    >
      <span class="sr-only">Open main menu</span>
      <div
        class="block w-5 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
      >
        <span
          aria-hidden="true"
          class="block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out"
          :class="{
            'rotate-45': showMobileMenu,
            ' -translate-y-1.5': !showMobileMenu,
          }"
        ></span>
        <span
          aria-hidden="true"
          class="block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out"
          :class="{ 'opacity-0': showMobileMenu }"
        ></span>
        <span
          aria-hidden="true"
          class="block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out"
          :class="{
            '-rotate-45': showMobileMenu,
            ' translate-y-1.5': !showMobileMenu,
          }"
        ></span>
      </div>
    </button>
    <div
      class="md:flex basis-full md:basis-auto md:items-center md:justify-between md:gap-3 lg:space-x-10"
      v-bind:class="{ hidden: !showMobileMenu }"
    >
      <nav>
        <div
          class="flex flex-col my-5 md:my-0 border-b-black/25 md:flex-row md:divide-none md:gap-3 py-2"
        >
          <router-link to="/" class="px-4 py-2" v-if="!user">
            Главная
          </router-link>
          <router-link to="/products" class="px-4 py-2" v-if="user">
            Продукты
          </router-link>
          <router-link to="/storages" class="px-4 py-2" v-if="user">
            Места хранения
          </router-link>
          <router-link to="/recipes" class="px-4 py-2"> Рецепты </router-link>
          <a class="px-4 py-2"> Советы </a>
        </div>
      </nav>
      <div
        class="grid min-[320px]:grid-cols-1 sm:grid-cols-2 gap-3 my-5 md:my-0"
        v-if="!user"
      >
        <my-button @click="isLogging = true">Войти</my-button>
        <my-dialog v-model:show="isLogging">
          <log-in-form
            @signup="
              isLogging = false;
              store.fetchUser();
            "
          ></log-in-form>
        </my-dialog>
        <my-button @click="isRegistering = true">Регистрация</my-button>
        <my-dialog v-model:show="isRegistering">
          <sign-up-form
            @signup="
              isRegistering = false;
              store.fetchUser();
            "
          ></sign-up-form>
        </my-dialog>
        <!-- <a
          class="rounded-xl bg-green py-2 px-6 transition-all cursor-pointer hover:bg-white hover:text-black border-green border-2 text-sm text-center align-middle md:text-base"
        >
          Войти
        </a>
        <a
          class="rounded-xl bg-green py-2 px-6 transition-all cursor-pointer hover:bg-white hover:text-black border-green border-2 text-sm text-center align-middle md:text-base"
        >
          Регистрация
        </a> -->
      </div>
      <div class="font-bold" v-else>БОКАНАЧ</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "../stores/UserStore";
import { storeToRefs } from "pinia";
import SignUpForm from "../components/SignUpForm.vue";
import LogInForm from "../components/LogInForm.vue";
import Logo from "../components/Logo.vue";

const showMobileMenu = ref(false);
const isRegistering = ref(false);
const isLogging = ref(false);

const store = useUserStore();
const { user } = storeToRefs(store);
</script>

<style type="postcss">
.router-link-active {
  background-color: #cde990;
  @apply rounded-lg;
}
</style>
