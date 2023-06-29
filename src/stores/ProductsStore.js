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
        .get("/products/?limit=30")
        .then((res) => {
          if (res.status == 200) {
            this.products = res.data.data.products;
            // this.products.forEach(async (product) => {
            //   let category = await this.getProductCategory(product.id);
            //   product.id_category = category[0].id
            //   product.name_category = category[0].name
            // });
            return true;
          }
        })
        .catch((e) => console.log(e));
    },
    async createProduct({ name, category_id }) {
      return axios
        .post("/products", {
          name: name,
        })
        .then(async (res) => {
          if (res.status == 200) {
            await this.fetchProducts();
            let product = this.products.find((x) => x.name == name);
            axios.post(`/products/${product.id}/categories/${category_id}`);
            await this.fetchProducts();
            // НЕТ ID this.products.push({ name: name, id:  });
          } else {
            alert("Не удалось создать продукт");
          }
        });
    },
    async updateProduct(product) {
      let id = product.id;
      let category_id = product.category_id;
      return axios
        .put("/products/" + id, { name: product.name })
        .then(async (res) => {
          if (res.status == 200) {
            let categories = await this.getProductCategory(id);
            categories.forEach((t_cat) => {
              axios.delete(`/products/${product.id}/categories/${t_cat.id}`);
            });
            await axios.post(
              `/products/${product.id}/categories/${category_id}`
            );
            this.fetchProducts();
            alert("Продукт успешно обновлен");
          }
        });
    },
    async getProductCategory(id) {
      return axios.get(`/products/${id}/categories`).then((res) => {
        return res.data.data.categories;
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
    async addTip(id, id_tip) {
      return axios.post(`/products/${id}/tips/${id_tip}`).then((res) => {
        if (res.status == 200) {
          this.fetchProducts();
          return true;
        }
      });
    },
    async deleteTip(id, id_tip) {
      return axios.delete(`/products/${id}/tips/${id_tip}`).then(res => {
        if (res.status == 200) {
          this.fetchProducts();
          return true;
        }
      })
    }
  },
  getters: {
    SearchedProducts() {
      let products = [...this.products];
      products.forEach(async (product) => {
        let category = await this.getProductCategory(product.id);
        product.id_category = category[0].id;
        product.name_category = category[0].name;
      });
      return products.filter((x) =>
        x.name.toLowerCase().includes(this.search.toLocaleLowerCase())
      );
    },
  },
});
