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
          class="block absolute h-0. w-5 bg-current transform transition duration-500 ease-in-out"
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
          

          <router-link to="/shelf-lives" class="px-4 py-2" v-if="user">
            Сроки годности
          </router-link>
          <router-link to="/storages" class="px-4 py-2" v-if="user">
            Места хранения
          </router-link>
          <router-link to="/recipes" class="px-4 py-2"> Рецепты </router-link>
          <router-link to="/tips" class="px-4 py-2"> Советы </router-link>
        </div>
      </nav>
      <div
        class="grid min-[320px]:grid-cols-1 sm:grid-cols-2 gap-3 my-5 md:my-0"
        v-if="!user"
      >
        <my-button @click="this.$router.push('/login')">Войти</my-button>
        <my-button @click="this.$router.push('/sign-up')"
          >Регистрация</my-button
        >
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
      <div class="font-bold text-sm" v-else>
        {{ user.name }} <svg @click="store.logout(); this.$router.push('/login')" class="inline mb-1 ml-1 cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M10 2v2h12v16h-12v2h14v-20h-14zm0 7.408l2.963 2.592-2.963 2.592v-1.592h-8v-2h8v-1.592zm-2-4.408v4h-8v6h8v4l8-7-8-7z"/></svg> 

                <!-- <my-button @click="func_1">check</my-button> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useUserStore } from "../stores/UserStore";
import { storeToRefs } from "pinia";
import Logo from "../components/Logo.vue";
import axios from "axios";

const showMobileMenu = ref(false);

const store = useUserStore();
const { user } = storeToRefs(store);

/* const func_1 = () => { */
/*   axios */
/*     .post("/auth/refresh", { withCredentials: true }) */
/*     .then((res) => console.log(res.data)); */
/* }; */
</script>

<style type="postcss">
.router-link-active {
  background-color: #cde990;
  @apply rounded-lg;
}

nav a:hover {
  background-color: #cde990;
  @apply rounded-lg;
}
</style>
