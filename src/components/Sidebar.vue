<template>
  <div>
    <div
      :class="{ hidden: is_hidden }"
      @click="is_hidden = true"
      class="fixed md:hidden right-0 bottom-0 left-0 top-0 bg-gray-900/50 z-30"
    ></div>
    <div
      :class="{
        'left-full md:relative md:-left-1/2 md:hidden': is_hidden,
        'left-1/3 md:left-0': !is_hidden,
      }"
      class="bg-gray-100 md:mr-3 rounded-lg py-3 transition-all fixed right-0 top-0 bottom-0 z-30 md:relative p-5"
    >
      <my-button class="md:hidden" @click="is_hidden = true">Закрыть</my-button>
      <slot></slot>
    </div>
  </div>
</template>

<script>
// modelValue == isHidden
export default {
  name: "Sidebar",
  props: ["is_hidden"],
};
</script>
