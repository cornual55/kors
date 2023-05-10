<template>
  <div class="mt-1">
    <button
      class="hover:bg-gray-200 p-3 transition-all"
      :class="{ 'bg-gray-200': isOpen }"
      @click="isOpen = !isOpen"
    >
      <h3 class="text-lg font-bold text-left inline">
        {{ title }}
      </h3>
      <font-awesome-icon
        class="inline-block ml-4 transition-all"
        :icon="['fas', 'chevron-up']"
        :class="{ 'rotate-180': isOpen }"
      />
    </button>
    <div
      class="relative left-6"
      :class="{ 'opacity-0': !isOpen, 'h-0': !isOpen, invisible: !isOpen }"
    >
      <p><slot></slot></p>
    </div>
  </div>
</template>

<script>
export default {
  name: "my-accordion",
  props: {
    title: {
      required: true,
      type: String,
    },
  },
  data() {
    return {
      isOpen: false,
    };
  },
};
</script>

<style scoped></style>
