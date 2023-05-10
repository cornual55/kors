<template>
  <section
    class="w-full bg-gradient-to-r from-[#ffd5d4] from-10% to-[#fff9e5] to-90% flex justify-center items-center"
  >
    <div class="container py-20 grid md:grid-cols-2">
      <h1
        class="font-bold text-4xl text-center md:text-left lg:text-6xl lg:py-28 lg:tracking-wider lg:max-w-lg bg-clip-text bg-gradient-to-r from-gray-800 to-gray-600 text-transparent"
        style="font-family: 'Comfortaa', cursive"
      >
        Начните следить за свежестью своих продуктов прямо сейчас
      </h1>
      <div class="mt-12 self-center">
        <div
          class="rounded-xl bg-[#ffd4d4] py-4 px-6 transition-all cursor-pointer hover:bg-white border-pink-[#ffd4d4] border-2 text-sm text-center align-middle md:text-base max-w-sm mx-auto"
        >
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
  <section class="container text-lg py-20 text-center">
    <h2>
      Нам доверяют множество людей, <b>таганрок vision</b> позволит вам
      отслеживать срок годности продукции и не только
    </h2>
    <h3 class="mt-10 text-xl font-semibold">Довольные клиенты:</h3>
    <article></article>
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
