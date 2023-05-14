import { defineStore } from "pinia";
import { useStoragesStore } from "./StoragesStore";
import { useUserStore } from "./UserStore";
import axios from "axios";
import { storeToRefs } from "pinia";

export const useShelfLivesStore = defineStore("shelf_lives", {
  state: () => ({
    shelf_lives: [],
  }),
  actions: {
    fetchShelfs() {
      const store_user = useUserStore();
      const { user } = storeToRefs(store_user);
      axios.get(`/users/${user.value.id}/shelf-lives`).then((res) => {
        if (res.status == 200) {
          this.shelf_lives = res.data.data["shelf-lives"];
        }
      });
    },
    fetchStorages() {
      const storages = useStoragesStore();
      storages.fetchStorages();
      this.products.forEach((product) => {
        product.storage = storages.getStorageById(product.storage)[0];
      });
      // this.products = this.products.map(
      //   (x) => (x.storage = storages.getStorageById(x.storage))
      // );
    },
    createShelf({
      id_product,
      id_storage,
      id_measure,
      quantity,
      purchase_date,
      end_date,
    }) {
      const store_user = useUserStore();
      const { user } = storeToRefs(store_user);
      axios
        .post(`/users/${user.value.id}/shelf-lives`, {
          id_product: id_product,
          id_storage: id_storage,
          id_measure: id_measure,
          quantity: quantity,
          purchase_date: purchase_date,
          end_date: end_date,
        })
        .then((res) => {
          if (res.status == 200) {
            alert("Срок годности успешно создан");
          } else {
            alert("Не удалось создать срок годности");
          }
        })
        .catch((e) => alert("Ошибка: данные введены неверно"));
    },
    deleteShelf(id) {
      axios
        .delete(`/users/${user.value.id}/shelf-lives/`, {
          id_shelf_life: id,
        })
        .then((res) => {
          if (res.status == 200) {
            this.shelf_lives = this.shelf_lives.filter((sh) => sh.id !== id);
            alert("Срок годности успешно удален");
            this.fetchShelfs();
            this.fetchStorages();
          }
        });
    },
    updateShelf({
      id,
      id_product,
      id_storage,
      id_measure,
      quantity,
      purchase_date,
      end_date,
    }) {
      const store_user = useUserStore();
      const { user } = storeToRefs(store_user);
      axios
        .put(`/users/${user.value.id}/shelf-lives`, {
          id_shelf_life: id,
          id_product: id_product,
          id_storage: id_storage,
          id_measure: id_measure,
          quantity: quantity,
          purchase_date: purchase_date,
          end_date: end_date,
        })
        .then((res) => {
          if (res.status == 200) {
            alert("Срок годности успешно изменен");
            this.fetchShelfs();
            this.fetchStorages();
          }
        })
        .catch((e) => alert("Не удалось изменить срок годности"));
    },
  },
});
