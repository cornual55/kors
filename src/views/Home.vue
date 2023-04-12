<template>
  <section class="bg-lightpink w-full">
    <div class="container px-20 lg:px-40 py-20 grid md:grid-cols-2 mx-auto">
      <h1
        class="font-semibold text-4xl italic text-center md:text-left lg:text-5xl lg:py-28 lg:tracking-wider lg:max-w-lg"
      >
        Начните следить за свежестью своих продуктов прямо сейчас
      </h1>
      <div class="mt-12 self-center">
        <div
          class="rounded-xl bg-pink-400 py-3 transition-all hover:bg-white hover:text-black border-pink-400 border-2 text-sm text-center align-middle sm:text-base cursor-pointer tracking-wider font-bold text-white max-w-sm mx-auto"
        >
          Регистрация
        </div>
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
export default {
  name: "Home",
  data() {
    return {};
  },
};
</script>
