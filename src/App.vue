<template>
  <header class="sticky py-5 top-0 z-50 bg-white">
    <div class="container flex flex-wrap justify-between items-center">
      <h2 class="text-lg font-semibold tracking-tight leading-5">
        Срок<br />годности
      </h2>
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
        class="md:flex basis-full md:basis-auto md:items-center md:justify-between md:gap-3 lg:space-x-10 px-20 sm:px-0"
        v-bind:class="{ hidden: !showMobileMenu }"
      >
        <nav>
          <div
            class="flex flex-col my-5 md:my-0 items-center text-center divide-y-2 divide-darkgreen/20 border-b-black/25 md:flex-row md:divide-none md:gap-3 py-2"
          >
            <router-link
              to="/"
              class="rounded-xl bg-white py-3 sm:py-2 px-5 transition-all cursor-pointer hover:text-darkgreen sm:hover:bg-green sm:hover:text-black border-white text-sm text-left sm:text-center align-middle md:text-base hover:border-green max-md:w-full max-md:rounded-none"
            >
              Главная
            </router-link>
            <router-link
              to="/recipes"
              class="rounded-xl bg-white py-3 sm:py-2 px-5 transition-all cursor-pointer hover:text-darkgreen sm:hover:bg-green sm:hover:text-black border-white text-sm text-left sm:text-center align-middle md:text-base hover:border-green max-md:w-full max-md:rounded-none"
            >
              Рецепты
            </router-link>
            <a
              class="rounded-xl bg-white py-3 sm:py-2 px-5 transition-all cursor-pointer hover:text-darkgreen sm:hover:bg-green sm:hover:text-black border-white text-sm text-left sm:text-center align-middle md:text-base hover:border-green max-md:w-full max-md:rounded-none"
            >
              Советы
            </a>
          </div>
        </nav>
        <div
          class="grid min-[320px]:grid-cols-1 sm:grid-cols-2 gap-3 my-5 md:my-0"
        >
          <a
            class="rounded-xl bg-green py-2 px-6 transition-all cursor-pointer hover:bg-white hover:text-black border-green border-2 text-sm text-center align-middle md:text-base"
          >
            Войти
          </a>
          <a
            class="rounded-xl bg-green py-2 px-6 transition-all cursor-pointer hover:bg-white hover:text-black border-green border-2 text-sm text-center align-middle md:text-base"
          >
            Регистрация
          </a>
        </div>
      </div>
    </div>
  </header>
  <main class="flex-auto">
    <router-view />
  </main>
  <footer class="bg-gray-800">
    <div
      class="container flex flex-col md:flex-row justify-between items-center text-gray-100 space-y-7 md:space-y-0 py-10"
    >
      <h2 class="text-lg font-semibold tracking-tight leading-5">
        Срок<br />годности
      </h2>
      <div class="flex flex-col sm:flex-row justify-start gap-3 flex-nowrap">
        <a class="transition-all cursor-pointer hover:underline">Главная</a>
        <router-link
          to="/recipes"
          class="transition-all cursor-pointer hover:underline"
          >Рецепты</router-link
        >
        <a class="transition-all cursor-pointer hover:underline">Советы</a>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      showMobileMenu: false,
    };
  },
};
</script>

<style></style>
