<template>
  <div class="flex justify-between mt-2">
    <div
      style="user-select: none"
      class="shadow-xl py-2 px-4 bg-gray-100 rounded-2xl hover:bg-gray-200 cursor-pointer transition-all block w-fit ml-auto md:mr-auto md:ml-0 mb-4"
      @click="
        sidebarIsHidden = !sidebarIsHidden;
        this.$emit('click_filter');
      "
    >
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
    <div
      style="user-select: none"
      class="shadow-xl py-2 px-4 bg-gray-100 rounded-2xl hover:bg-gray-200 cursor-pointer transition-all block w-fit ml-auto md:mr-auto md:ml-0 mb-4"
      @click="
        sidebarIsHidden = !sidebarIsHidden;
        this.$emit('click_filter');
      "
    >
            Создать
    </div>
    <div>
      <div
        style="user-select: none"
        @click="this.$emit('click_sort')"
        class="shadow-xl py-2 px-4 bg-gray-100 rounded-2xl hover:bg-gray-200 cursor-pointer transition-all inline-block w-fit mb-4"
      >
        Сортировка
      </div>
      <input
        type="text"
        class="shadow-xl py-2 px-4 bg-gray-100 rounded-2xl hover:bg-gray-200 transition-all inline-block w-fit ml-3 mb-4"
        :value="search"
        @input="this.$emit('update:search', $event.target.value)"
        placeholder="Поиск..."
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sidebarIsHidden: true,
    };
  },
  props: {
    search: String,
  },
};
</script>

<style></style>
