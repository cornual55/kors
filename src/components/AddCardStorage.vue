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
        class="bg-green flex flex-col h-[16rem] rounded-lg"
        :class="{ 'blur-sm': !isAdding }"
      >
        <input
          type="text"
          placeholder="Название"
          class="p-3 text-lg bg-inherit placeholder:text-gray-600 rounded-t-lg focus-visible:outline-none"
          v-model="title"
        />
        <div class="bg-gray-100 p-5 rounded-b-lg flex-1 relative">
          Температура -
          <input type="text" v-model="temp" class="bg-inherit inline w-11" />°C
          <br />Влажность -
          <input type="text" v-model="hum" class="bg-inherit inline w-11" />
          %
          <my-button class="absolute bottom-3 right-3" @click="submitStorage"
            >Создать</my-button
          >
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
      title: "",
      temp: "",
      hum: "",
    };
  },
  methods: {
    submitStorage() {
      let storage = {};
      storage.id = Date.now();
      storage.storage = this.title;
      storage.temp = this.temp;
      storage.hum = this.hum;
      this.$emit("create", { ...storage });
      this.title = "";
      this.temp = "";
      this.hum = "";
    },
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
