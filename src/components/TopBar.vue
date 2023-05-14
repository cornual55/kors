<template>
  <div class="flex max-[452px]:flex-wrap gap-y-3 justify-between mt-2 mb-4">
    <div class="flex w-full sm:w-auto" style="align-content: center">
      <div
        style="user-select: none"
        class="shadow-xl py-2 px-4 bg-gray-100 rounded-2xl hover:bg-gray-200 cursor-pointer transition-all inline-block w-fit"
        v-if="!not_show.includes('filter')"
        @click="
          sidebarIsHidden = !sidebarIsHidden;
          this.$emit('click_filter');
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            d="M19.479 2l-7.479 12.543v5.924l-1-.6v-5.324l-7.479-12.543h15.958zm3.521-2h-23l9 15.094v5.906l5 3v-8.906l9-15.094z"
          />
        </svg>
      </div>
      <div
        v-if="!not_show.includes('create')"
        style="user-select: none"
        class="shadow-xl max-[452px]:text-center py-2 px-4 bg-gray-100 rounded-2xl hover:bg-gray-200 cursor-pointer transition-all ml-4 inline-block w-fit max-[452px]:w-full"
        @click="
          sidebarIsHidden = !sidebarIsHidden;
          this.$emit('click_create');
        "
      >
        Создать
      </div>
    </div>
    <div class="flex max-[640px]:w-full" style="align-content: center">
      <div
        style="user-select: none"
        v-if="!not_show.includes('sort')"
        @click="this.$emit('click_sort')"
        class="shadow-xl py-2 px-4 bg-gray-100 rounded-2xl hover:bg-gray-200 cursor-pointer transition-all inline-block w-fit"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            d="M8 10v4h4l-6 8-6-8h4v-4h-4l6-8 6 8h-4zm10.19-1.016h3.237l.581 1.807h1.992l-3.11-8.791h-2.078l-3.138 8.792h1.921l.595-1.808zm1.641-4.974l1.11 3.459h-2.251l1.141-3.459zm-1.393 16.439h4.562v1.551h-6.787v-1.551l4.493-5.684h-4.38v-1.557h6.662v1.473l-4.55 5.768z"
          />
        </svg>
      </div>
      <input
        type="text"
        class="shadow-xl py-2 px-4 bg-gray-100 rounded-2xl hover:bg-gray-200 transition-all ml-4 inline-block w-full sm:w-fit max-[452px]:w-full"
        :value="search"
        v-if="!not_show.includes('search')"
        @input="this.$emit('update:search', $event.target.value)"
        placeholder="Поиск..."
      />
      <!-- <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M21.172 24l-7.387-7.387c-1.388.874-3.024 1.387-4.785 1.387-4.971 0-9-4.029-9-9s4.029-9 9-9 9 4.029 9 9c0 1.761-.514 3.398-1.387 4.785l7.387 7.387-2.828 2.828zm-12.172-8c3.859 0 7-3.14 7-7s-3.141-7-7-7-7 3.14-7 7 3.141 7 7 7z"/></svg> -->
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
    not_show: {
      type: Array,
      default: [],
    },
  },
};
</script>

<style></style>
