<template>
  <div class="bg-gray-100 rounded-lg py-3 transition-all">
    <slot></slot>
  </div>
</template>

<script>
// modelValue == isHidden
export default {
  name: "Sidebar",
  props: [],
};
</script>
