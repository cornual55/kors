
import { defineStore } from "pinia";
import axios from "axios";

export const useCategoriesStore = defineStore("categories", {
  state: () => ({
    category: {},
    categories: [],
    search: "",
  }),
  actions: {
    async fetchCategories() {
      return axios
        .get("/product-categories/?limit=30")
        .then((res) => {
          if (res.status == 200) {
            this.categories = res.data.data.categories;
            return true;
          }
        })
        .catch((e) => false);
    },
    createCategory({ name }) {
      axios
        .post("/product-categories", {
          name: name,
        })
        .then((res) => {
          if (res.status == 200) {
            this.fetchCategories();
          } else {
            alert("Не удалось создать категорию");
          }
        });
    },
    updateCategory(id) {
      axios.put("/product-categories/" + id).then((res) => {
        if (res.status == 200) {
          this.fetchCategories();
          alert("Категория успешна обновлена");
        }
      });
    },
    deleteCategory(id) {
      axios.delete("/product-categories/" + id).then((res) => {
        if (res.status == 200) {
          alert("Категория успешна удалена");
          this.categories = this.categories.filter((pr) => pr.id !== id);
        }
      });
    },
  },
  getters: {
    SearchedCategories() {
      let categories = [...this.categories];
      return categories.filter((x) =>
        x.name.toLowerCase().includes(this.search.toLocaleLowerCase())
      );
    },
  },
});
