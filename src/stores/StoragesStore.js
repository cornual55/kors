import { defineStore } from "pinia";

export const useStoragesStore = defineStore("storages", {
  state: () => ({ storages: [] }),
  actions: {
    fetchStorages() {
      this.storages = [
        {
          id: 1,
          storage: "Холодильник",
          temp: 23,
          hum: 56,
        },
        {
          id: 2,
          storage: "Комод",
          temp: 22,
          hum: 51,
        },
      ];
    },
    getStorageById(id) {
      return this.storages.filter((storage) => storage.id === id);
    },
    addStorage(storage) {
      console.log(storage);
      this.storages.push(storage);
    },
  },
});
