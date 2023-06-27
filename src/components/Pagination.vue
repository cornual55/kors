<template>
  <div class="flex justify-center text-gray-700">
    <button
      @click="
        this.$emit(
          'update:modelValue',
          modelValue - 1 != 0 ? modelValue - 1 : 1
        )
      "
      class="transition-all hover:bg-green bg-white py-3 px-5 cursor-pointer"
    >
      &lt;&lt;
    </button>
    <button
      class="transition-all hover:bg-green bg-white py-3 px-5 cursor-pointer"
      v-for="page in total_pages"
      @click="this.$emit('update:modelValue', page)"
      v-bind:class="{ 'bg-green': modelValue === page }"
    >
      {{ page }}
    </button>
    <button
      @click="
        this.$emit(
          'update:modelValue',
          modelValue + 1 > total_pages ? modelValue : modelValue + 1
        )
      "
      class="transition-all hover:bg-green bg-white py-3 px-5 cursor-pointer"
    >
      >>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: Number,
    total_pages: Number,
  },
};
</script>

<style scoped></style>
