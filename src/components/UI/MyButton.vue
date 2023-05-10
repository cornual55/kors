<template>
  <button
    :class="`rounded-xl bg-${color} p-2 px-6 transition-all cursor-pointer hover:bg-${hover_color} hover:text-black border-${color} border-2 text-sm text-center align-middle md:text-base`"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "my-button",
  props: {
    color: {
      default: "green",
    },
    hover_color: {
      default: "white",
    },
  },
};
</script>
