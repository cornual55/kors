import { defineStore } from "pinia";
import axios from "axios";

export const useProductsStore = defineStore("products", {
  state: () => ({
    product: {},
    products: [],
    search: "",
  }),
  actions: {
    async fetchProducts() {
      return axios
        .get("/products")
        .then((res) => {
          if (res.status == 200) {
            this.products = res.data.data.products;
                        return true
          }
        })
        .catch((e) => console.log(e));
    },
    createProduct({ name }) {
      axios
        .post("/products", {
          name: name,
        })
        .then((res) => {
          if (res.status == 200) {
            this.fetchProducts();
            // НЕТ ID this.products.push({ name: name, id:  });
          } else {
            alert("Не удалось создать продукт");
          }
        });
    },
    updateProduct(id) {
      axios.put("/products/" + id).then((res) => {
        if (res.status == 200) {
          this.fetchProducts();
          alert("Продукт успешно обнавлен");
        }
      });
    },
    deleteProduct(id) {
      axios.delete("/products/" + id).then((res) => {
        if (res.status == 200) {
          alert("Продукт успешно удален");
          this.products = this.products.filter((pr) => pr.id !== id);
        }
      });
    },
    async getProductById(id) {
      let res = await axios.get("products/" + id);
      if (res.status === 200) {
        return res.data.data.product;
      }
    },
    async getProductTips(id) {
      let res = await axios.get(`products/${id}/tips`);
      if (res.status === 200) {
        return res.data.data.tips;
      }
    },
    createTip() {},
  },
  getters: {
    SearchedProducts() {
      let products = [...this.products];
      return products.filter((x) =>
        x.name.toLowerCase().includes(this.search.toLocaleLowerCase())
      );
    },
  },
});
