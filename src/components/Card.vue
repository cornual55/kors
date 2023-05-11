<template>
  <div class="bg-green/70 hover:scale-105 hover:shadow-2xl transition-all rounded-lg ">
    <div
      style="
        backface-visibility: hidden;
        -webkit-font-smoothing: subpixel-antialiased;
      "
      class="card  flex flex-col overflow-y-hidden h-[16rem]"
    >
      <h2
        class="title tracking-wider  text-center transition-all px-3 py-3 text-lg"
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
    <div class="h-0 right-0 left-0 bottom-0 bg-green/80 text-sm opacity-0 super_card transition-all text-center absolute">
            В рецепт входит:<br>
            1 помидор<br>
            2 супер помидор
        </div>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: ["title", "subcaption", "content", "products"],
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

.card:hover + .super_card {
    opacity: 1;
    height: 5rem;
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
