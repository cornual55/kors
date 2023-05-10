<template>
  <h2 class="text-xl" v-if="title">{{ title }}</h2>
  <div class="mt-2 text-gray-800">
    <input
      @change="this.$emit('change', { type, value }, $event.target.checked)"
      type="checkbox"
      :id="value"
      :value="value"
    />
    <label style="user-select: none" :for="value" class="p-3 text-sm">{{ name }}</label>
  </div>
</template>

<script>
export default {
  props: {
    type: String,
    name: String,
    value: String,
    title: String,
  },
};
</script>

<style></style>
