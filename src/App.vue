<template>
  <header class="sticky py-5 top-0 z-40 bg-white">
    <Navbar />
  </header>
  <main style="font-family: 'Comfortaa', sans-serif" class="flex-auto">
    <router-view />
  </main>
  <footer v-if="user === null" class="bg-gray-800">
    <div
      class="container flex flex-col md:flex-row justify-between items-center text-gray-100 space-y-7 md:space-y-0 py-10"
    >
      <h2 class="text-lg font-semibold tracking-tight leading-5">
        Срок<br />годности
      </h2>
      <div class="flex flex-col sm:flex-row justify-start gap-3 flex-nowrap">
        <router-link
          to="/"
          class="transition-all cursor-pointer hover:underline"
          active-class="bokanach"
          >Главная</router-link
        >
        <router-link
          to="/recipes"
          class="transition-all cursor-pointer hover:underline"
          active-class="bokanach"
          >Рецепты</router-link
        >
        <a class="transition-all cursor-pointer hover:underline">Советы</a>
      </div>
    </div>
  </footer>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import { useUserStore } from "./stores/UserStore";
import { storeToRefs } from "pinia";

export default {
  data() {
    return {
      showMobileMenu: false,
    };
  },
  components: {
    Navbar,
  },
  setup() {
    const { user } = storeToRefs(useUserStore());
    return { user };
  },
};
</script>

<style></style>
