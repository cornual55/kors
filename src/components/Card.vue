<template>
  <div
    class="bg-green hover:scale-110 hover:drop-shadow-2xl transition-all rounded-lg h-full overflow-hidden"
  >
    <slot></slot>
    <h2 class="p-3 text-lg">{{ title }}</h2>
    <div class="bg-gray-100 p-5 rounded-b-lg h-full">
      <h3 class="pb-3 text-xl">{{ place }}</h3>
      {{ content }}
    </div>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: ["title", "place", "content"],
};
</script>
