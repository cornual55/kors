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
          class="p-3 capitalize text-lg bg-inherit placeholder:text-gray-600 rounded-t-lg focus-visible:outline-none"
          v-model="name"
        />
        <div class="bg-gray-100 p-5 rounded-b-lg flex-1 relative">
          Температура -
          <input
            type="text"
            v-model.number="temperature"
            class="bg-inherit inline w-11"
          />°C <br />Влажность -
          <input
            type="text"
            v-model.number="humidity"
            class="bg-inherit mt-1 inline w-11"
          />
          %
          <my-button class="absolute bottom-3 right-3" @click="submitStorage"
            >Создать</my-button
          >
          <select class="p-3 mt-1" v-model="type">
            <option value="" disabled selected>Тип места хранения</option>
            <option
              v-for="storage_type in storage_types"
              :key="storage_type.id"
              :value="storage_type.id + ',' + storage_type.name"
            >
              {{ storage_type.name }}
            </option>
          </select>
          <slot></slot>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { useStoragesStore } from "../stores/StoragesStore";
import { storeToRefs } from "pinia";
export default {
  data() {
    return {
      isAdding: false,
      name: "",
      temperature: "",
      humidity: "",
      type: "",
    };
  },
  methods: {
    submitStorage() {
      let storage = {};
      storage.name = this.name;
      storage.temperature = this.temperature;
      storage.humidity = this.humidity;
      let type = this.type.split(",");
      storage.id_type = Number(type[0])
      storage.type = type[1]
      this.$emit("create", { ...storage });
      this.name = "";
      this.temperature = "";
      this.humidity = "";
    },
  },
  setup() {
    const store = useStoragesStore();
    const { storage_types } = storeToRefs(store);

    if (storage_types.length == 0) {
      store.fetchStorageTypes();
    }

    return { store, storage_types };
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
