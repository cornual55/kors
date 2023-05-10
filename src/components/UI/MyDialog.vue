<template>
  <div
    class="fixed bg-gray-900/50 top-0 bottom-0 left-0 right-0 z-50 flex"
    :class="{ hidden: !show }"
    @click="this.$emit('update:show', !show)"
  >
    <div class="bg-gray-100 p-10 m-auto rounded-lg" @click.stop>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "my-dialog",
  props: {
    show: Boolean,
  },
};
</script>

<style lang="scss" scoped></style>
