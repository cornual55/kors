<template>
  <div
    class="bg-green hover:scale-110 hover:shadow-2xl transition-all rounded-lg h-[19rem] flex flex-col overflow-y-hidden"
  >
    <h2 class="p-3 text-lg">{{ title }}</h2>
    <div class="bg-gray-100 p-5 rounded-b-lg flex-1 overflow-y-auto scrollbar">
      <h3 class="pb-3 text-xl">{{ place }}</h3>
      <div>
        {{ content }}
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: ["title", "place", "content"],
};
</script>

<style scoped>
.scrollbar::-webkit-scrollbar {
  width: 12px;
}

.scrollbar {
  scrollbar-width: thin;
}
</style>
