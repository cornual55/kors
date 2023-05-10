<template>
  <div>
    <div
      style="user-select: none"
      class="shadow-xl py-2 px-4 bg-gray-100 rounded-2xl hover:bg-gray-200 cursor-pointer transition-all block w-fit ml-auto md:mr-auto md:ml-0 mb-4"
      @click="
        sidebarIsHidden = !sidebarIsHidden;
        $emit('update:sidebar', sidebarIsHidden);
      "
    >
      <!-- <div
      class="shadow-xl py-2 px-4 bg-gray-100 absolute rounded-2xl hover:bg-gray-200 cursor-pointer transition-all z-30"
      @click="sidebarIsHidden = !sidebarIsHidden"
      :class="{ 'left-2 -top-12': sidebarIsHidden }"
    > -->
      Фильтры
      <font-awesome-icon
        :icon="['fas', 'arrow-left']"
        :class="{
          'rotate-0 md:rotate-180': sidebarIsHidden,
          'rotate-180 md:rotate-0': !sidebarIsHidden,
        }"
        class="transition-all ml-2"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "my-bokan",
  data: {
    sidebarIsHidden: true,
  },
};
</script>

<style lang="scss" scoped></style>
