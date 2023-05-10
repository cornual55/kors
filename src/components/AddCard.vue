<template>
  <div
    class="relative transition-all hover:drop-shadow-2xl"
    :class="{ 'cursor-pointer': !isAdding, 'hover:scale-110': isAdding }"
  >
    <font-awesome-icon
      :icon="['far', 'plus-square']"
      style="box-sizing: border-box !important"
      class="absolute z-10 h-full w-full transition-all hover:scale-110 p-24 text-gray-700/50"
      @click="isAdding = !isAdding"
      :class="{ hidden: isAdding }"
    />
    <form @submit.prevent>
      <div
        class="bg-green/70 flex flex-col h-[16rem] rounded-lg"
        :class="{ 'blur-sm': !isAdding }"
      >
        <input
          type="text"
          placeholder="Название"
          class="p-3 tracking-wider text-center text-lg bg-inherit placeholder:text-gray-600 rounded-t-lg focus-visible:outline-none"
          :value="title"
          @input="this.$emit('update:title', $event.target.value)"
        />
        <div class="bg-gray-100/90 p-5 rounded-b-lg flex-1">
          <input
            type="text"
            class="pb-3 text-xl bg-inherit placeholder:text-gray-600 focus-visible:outline-none w-full"
            placeholder="Место хранения"
            :value="storage"
            @input="this.$emit('update:storage', $event.target.value)"
          />
          <textarea
            style="scrollbar-width: thin"
            class="placeholder:text-gray-600 bg-inherit resize-none focus-visible:outline-none overflow-y-auto scrollbar w-full h-[76%]"
            placeholder="Описание"
            :value="content"
            @input="this.$emit('update:content', $event.target.value)"
          />
          <slot></slot>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isAdding: false,
    };
  },
  props: {
    title: String,
    storage: String,
    content: String,
  },
};
</script>

<style scoped>
.scrollbar::-webkit-scrollbar {
  width: 12px;
}

.scrollbar {
  scrollbar-width: thin;
}
</style>
