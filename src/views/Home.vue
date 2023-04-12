<template>
  <section class="bg-lightpink w-full">
    <div class="container py-20 grid md:grid-cols-2">
      <h1
        class="font-semibold text-4xl italic text-center md:text-left lg:text-5xl lg:py-28 lg:tracking-wider lg:max-w-lg"
      >
        Начните следить за свежестью своих продуктов прямо сейчас
      </h1>
      <div class="mt-12 self-center">
        <div class="rounded-xl bg-pink-400 py-2 px-6 transition-all cursor-pointer hover:bg-white hover:text-black border-pink-400 border-2 text-sm text-center align-middle md:text-base text-white max-w-sm mx-auto">
              Регистрация
        </div>
        
          <!-- <div
            class="rounded-xl bg-pink-400 py-3 transition-all hover:bg-white hover:text-black border-pink-400 border-2 text-sm text-center align-middle sm:text-base cursor-pointer tracking-wider font-bold text-white max-w-sm mx-auto"
          >
            Регистрация
          </div> -->
        <a
          href="#"
          class="underline block w-fit mx-auto mt-4 hover:text-pink-400"
          >Войти</a
        >
      </div>
    </div>
  </section>
</template>
<script>
import Button from '../components/Button.vue';

export default {
  name: "Home",
  data() {
    return {};
  },
  components: {
    Button
  }
};
</script>
