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
      axios.get(`/users/${user.value.id}/shelf-lives/?limit=30`).then((res) => {
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
    detectShelfDates(photo) {
     return axios.post("/shelf-life-detector", photo, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(res => {
          if (res.status == 200) {
            return res.data
          }
        }).catch(e => {
          console.log(e)
          if (e.status === 413) {
            return {error: "Файл должен вешать 512КБ"}
          } else {
            return {error: "Не удалось распознать даты с изображения"}
          }
        })

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
            this.fetchShelfs();
            this.fetchStorages();
            alert("Срок годности успешно создан");
          } else {
            alert("Не удалось создать срок годности");
          }
        })
        .catch((e) => console.log(e));
    },
    deleteShelf(id) {
      let isCertain = confirm("Вы действительно хотите удалить срок годности?");
            if (!isCertain) {
                return false
            }
      axios.delete(`/shelf-lives/${id}`).then((res) => {
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
      axios
        .put(`/shelf-lives/${id}`, {
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
          }
        })
        .catch((e) => {
          console.log(e);
          alert("Не удалось изменить срок годности");
        });
    },
  },
});
