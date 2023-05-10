import { defineStore } from "pinia";
import { useStoragesStore } from "./StoragesStore";

export const useProductsStore = defineStore("products", {
  state: () => ({
    products: [],
  }),
  actions: {
    fetchProducts() {
      this.products = [
        {
          id: 1,
          name: "Помидор",
          date_start: "02.05.2023",
          date_end: "12.05.2023",
          quantity: 5,
          storage: 1,
          state: "Хорошо",
        },
        {
          id: 2,
          name: "Супер помидор",
          date_start: "01.05.2023",
          date_end: "11.05.2023",
          quantity: 10,
          storage: 2,
          state: "Плохо",
        },
        {
          id: 3,
          name: "Невероятный помидор",
          date_start: "01.05.2023",
          date_end: "5.05.2023",
          quantity: 14,
          storage: 1,
          state: "Просрочен",
        },
        {
          id: 4,
          name: "Яйцо",
          date_start: "01.05.2023",
          date_end: "5.05.2023",
          quantity: 14,
          storage: 1,
          state: "Просрочен",
        },
        {
          id: 5,
          name: "Лук",
          date_start: "01.05.2023",
          date_end: "5.05.2023",
          quantity: 14,
          storage: 1,
          state: "Просрочен",
        },
      ];
    },
    fetchStorages() {
      const storages = useStoragesStore();
      storages.fetchStorages();
      this.products.forEach((product) => {
        product.storage = storages.getStorageById(product.storage)[0];
      })
      // this.products = this.products.map(
      //   (x) => (x.storage = storages.getStorageById(x.storage))
      // );
    },
    createProduct(product) {
      this.products.push(product);
      return true;
    },
    deleteProduct(product) {
      this.products = this.products.filter((pr) => pr.id !== product.id);
      return true;
    },
    updateProduct(product) {
      this.products = this.products.map((pr) =>
        pr.id === product.id ? product : pr
      );
      return true;
    },
    getProductsByStorage(storage_id) {
      return this.products.filter((product) => product.place === storage_id);
    },
    getProductById(id) {
      return this.products.find((pr) => pr.id == id);
    },
  },
});
