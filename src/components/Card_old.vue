<template>
  <div
    style="
      backface-visibility: hidden;
      -webkit-font-smoothing: subpixel-antialiased;
    "
    class="bg-green hover:scale-105 hover:perspec hover:shadow-2xl transition-all rounded-lg h-[16rem] flex flex-col overflow-y-hidden"
  >
    <h2 class="p-3 text-lg">{{ title }}</h2>
    <div class="bg-gray-100 p-5 rounded-b-lg flex-1">
      <h3 class="pb-3 text-xl" v-if="storage">{{ storage }}</h3>
      <div class="content">
        <!-- Для рецепта понадобится: -->
        <table>
          <tr v-for="product in products">
            <td class="px-2">{{ product.quantity }}</td>
            <td class="px-2">{{ product.name }}</td>
          </tr>
        </table>
        <p class="mt-5"><slot></slot></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: ["title", "storage", "content", "products"],
};
</script>

<style scoped>
.scrollbar::-webkit-scrollbar {
  width: 10px; /* width of the entire scrollbar */
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
