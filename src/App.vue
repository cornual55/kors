<template>
  <header class="container mx-auto p-7 flex flex-wrap justify-between items-center lg:px-28"> 
    <h2 class="text-lg font-semibold tracking-tight leading-5">Срок<br>годности</h2>
    <font-awesome-icon class="text-2xl cursor-pointer md:hidden" :icon="['fas', 'bars']" style="color: #0f6013;" @click="showMobileMenu = !showMobileMenu" />
    <div class="my-7 hidden md:flex basis-full md:basis-auto md:items-center md:justify-between md:gap-3 lg:space-x-10" v-bind:class="{'is-active': showMobileMenu}">
      <nav>
        <ul class="flex flex-col items-center text-center divide-y-2 divide-darkgreen border-b-black/25 md:flex-row md:divide-y-0 md:gap-3">
          <li class="hover:bg-green p-3 transition-all cursor-pointer w-full text-sm md:rounded-2xl md:text-base">Главная</li>
          <li class="hover:bg-green p-3 transition-all cursor-pointer w-full text-sm md:rounded-2xl md:text-base">Рецепты</li>
          <li class="hover:bg-green p-3 transition-all cursor-pointer w-full text-sm md:rounded-2xl md:text-base">Советы</li>
        </ul>
      </nav>
      <div class="grid min-[320px]:grid-cols-2 gap-3 my-5 md:my-0">
        <a href="#" class="rounded-xl bg-green p-2 px-6 transition-all hover:bg-white hover:text-black border-green border-2 text-sm text-center align-middle md:h-full md:text-base">Войти</a>
        <a href="#" class="rounded-xl bg-green p-2 px-6 transition-all hover:bg-white hover:text-black border-green border-2 text-sm text-center align-middle md:h-full md:text-base">Регистрация</a>
      </div>
    </div>
  </header>
  <router-view />
</template>

<script>
export default {
  data() {
    return {
      showMobileMenu: false
    }
  }
}
</script>

<style>
.is-active {
  display: block;
}
</style>
