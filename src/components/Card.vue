<template>
  <div
    class="bg-green/70 hover:scale-105 hover:shadow-2xl transition-all rounded-lg relative"
  >
    <div
      style="
        backface-visibility: hidden;
        -webkit-font-smoothing: subpixel-antialiased;
      "
      class="card flex flex-col overflow-y-hidden h-[16rem]"
    >
      <h2
        class="title capitalize tracking-wider text-center transition-all px-3 py-3 text-lg"
      >
        {{ title }}
      </h2>
      <div class="main bg-gray-100/90 p-5 rounded-b-lg flex-1">
        <h3 class="pb-3 text-xl mb-5" v-if="subcaption">{{ subcaption }}</h3>
        <div class="content text-sm">
          <p><slot></slot></p>
        </div>
      </div>
    </div>
    <!--  <div class="absolute -bottom-5 right-0 left-0 flex justify-center gap-10">
  <button
        class="shadow-lg text-xl py-2 px-4 bg-gray-200 rounded-3xl hover:bg-gray-300"
      >
        +
      </button>
      <button
        class="shadow-lg text-xl py-2 px-4 bg-gray-200 rounded-3xl hover:bg-gray-300"
      >
        /
      </button> 
    </div>-->

    <div class="bg-gray-200/50" v-if="!show_bar">
      <div
        class="bg-gray-200/90 relative px-10 py-3 cursor-pointer hover:shadow-inner hover:bg-gray-300 transition-all" @click="this.$emit('detail')"
      >
        <button class="w-full">Посмотреть</button>
      </div>
    </div>
    <div
      class="h-0 right-0 bg-green/30 left-0 bottom-0 text-sm opacity-0 super_card transition-all absolute flex justify-center items-center gap-6"
    >
      <button
        class="shadow-lg transition-all text-xl text-gray-600/90 py-2 px-4 bg-gray-100 rounded-2xl hover:bg-gray-300 hover:text-gray-700"
        @click="this.$emit('edit')"
      >
        <font-awesome-icon
          :icon="['far', 'pen-to-square']"
          class="transition-all text-2xl"
        />
      </button>
      <button
        class="shadow-lg transition-all text-xl py-2 px-4 bg-gray-100 rounded-2xl hover:bg-gray-300 text-gray-600/90 hover:text-gray-700"
        @click="this.$emit('delete')"
      >
        <font-awesome-icon
          :icon="['far', 'trash-can']"
          class="transition-all text-2xl"
        />
      </button>
      <button
        v-if="show_detail"
        class="shadow-lg transition-all text-xl py-2 px-4 bg-gray-100 rounded-2xl hover:bg-gray-300 text-gray-600/90 hover:text-gray-700"
        @click="this.$emit('detail')"
      >
        <font-awesome-icon
          class="transition-all text-2xl rotate-180"
          :icon="['fas', 'arrow-left']"
        />
      </button>

      <!--В рецепт входит:<br>
            1 помидор<br>
            2 супер помидор -->
    </div>
  </div>
</template>

<script>
import { useUserStore } from "../stores/UserStore";
import { storeToRefs } from "pinia";
export default {
  name: "Card",
  props: [
    "title",
    "subcaption",
    "content",
    "products",
    "show_bar",
    "show_detail",
    "not_show_all"
  ],
  setup() {
    const store = useUserStore();
    store.fetchCurrentUser();
    const { isLoggedIn } = storeToRefs(store);

    return { isLoggedIn };
  },
};
</script>

<style scoped>
.card:hover .title {
  padding-bottom: 0.5rem !important;
  padding-top: 0.5rem !important;
}
.scrollbar::-webkit-scrollbar {
  width: 10px; /* width of the entire scrollbar */
}

.card:hover + .super_card,
.super_card:hover {
  opacity: 1;
  height: 4rem;
  padding: 0.3rem;
}

/* .scrollbar::-webkit-scrollbar-track {
  background: orange;
} */

.scrollbar::-webkit-scrollbar-thumb {
  background-color: lightgray;
  /* border-radius: 20px; */
  /* border: 3px solid orange; */
}

.scrollbar {
  scrollbar-width: thin;
}

/* .content > span:first-child::before {
  content: "ASDsad";
} */
</style>
