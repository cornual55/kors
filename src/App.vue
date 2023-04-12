<template>
  <header class="sticky py-5 top-0 z-50 bg-white">
    <div
      class="container flex flex-wrap justify-between items-center"
    >
      <h2 class="text-lg font-semibold tracking-tight leading-5">
        Срок<br />годности
      </h2>
      <font-awesome-icon
        class="text-[#0f6013] text-2xl cursor-pointer md:hidden"
        :icon="['fas', 'bars']"
        @click="showMobileMenu = !showMobileMenu"
        v-bind:class="{ hidden: showMobileMenu }"
      />
      <font-awesome-icon
        class="text-[#0f6013] text-2xl cursor-pointer md:hidden"
        :icon="['fas', 'xmark']"
        @click="showMobileMenu = !showMobileMenu"
        v-bind:class="{ hidden: !showMobileMenu }"
      />
      <div
        class="hidden md:flex basis-full md:basis-auto md:items-center md:justify-between md:gap-3 lg:space-x-10"
        v-bind:class="{ 'is-active': showMobileMenu }"
      >
        <nav>
          <div
            class="flex flex-col my-5 md:my-0 items-center text-center divide-y-2 divide-darkgreen border-b-black/25 md:flex-row md:divide-none md:gap-3"
          >
            <router-link to="/" class="rounded-xl bg-white py-2 px-5 transition-all cursor-pointer hover:bg-green hover:text-black border-white text-sm text-center align-middle md:text-base hover:border-green max-md:w-full max-md:rounded-none">
              Главная
            </router-link>
            <router-link to="/recipes" class="rounded-xl bg-white py-2 px-5 transition-all cursor-pointer hover:bg-green hover:text-black border-white text-sm text-center align-middle md:text-base hover:border-green max-md:w-full max-md:rounded-none">
              Рецепты
            </router-link>
            <a class="rounded-xl bg-white py-2 px-5 transition-all cursor-pointer hover:bg-green hover:text-black border-white text-sm text-center align-middle md:text-base hover:border-green max-md:w-full max-md:rounded-none">
              Советы
            </a>
          </div>
        </nav>
        <div class="grid min-[320px]:grid-cols-2 gap-3 my-5 md:my-0">
          <a class="rounded-xl bg-green py-2 px-6 transition-all cursor-pointer hover:bg-white hover:text-black border-green border-2 text-sm text-center align-middle md:text-base">
              Войти
            </a>
            <a class="rounded-xl bg-green py-2 px-6 transition-all cursor-pointer hover:bg-white hover:text-black border-green border-2 text-sm text-center align-middle md:text-base">
              Регистрация
            </a>
        </div>
      </div>
    </div>
  </header>
  <router-view />
  <footer class="bg-gray-800">
    <div
      class="container flex flex-col md:flex-row justify-between items-center text-gray-100 space-y-7 md:space-y-0 py-10"
    >
      <h2 class="text-lg font-semibold tracking-tight leading-5">
        Срок<br />годности
      </h2>
      <div class="flex flex-col md:flex-row justify-start space-y-1 md:space-y-0 md:space-x-4 text-sm">
        <a class="transition-all cursor-pointer hover:underline">Главная</a>
        <router-link to="/recipes" class="transition-all cursor-pointer hover:underline">Рецепты</router-link>
        <a class="transition-all cursor-pointer hover:underline">Советы</a>
      </div>
    </div>
  </footer>
</template>

<script>
import Button from './components/Button.vue'

export default {
  data() {
    return {
      showMobileMenu: false,
    };
  }
};
</script>

<style>
.is-active {
  display: block;
}
</style>
