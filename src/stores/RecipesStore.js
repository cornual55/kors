import { defineStore } from "pinia";
import { useProductsStore } from "./ProductsStore.js";
import axios from "axios";

export const useRecipesStore = defineStore("recipes", {
  state: () => ({
    recipes: [],
    steps: [],
    limit: 5,
    page: 1,
    filters: [],
    search: "",
    sorted: "",
  }),
  actions: {
    async fetchRecipes() {
      const res = await axios.get("/recipes");

      if ((res.status = 200)) {
        this.recipes = res.data.data.recipes;
        return true;
      }
      alert("Не удалось загрузить рецепты");
      return false;
      // this.recipes.push({
      //   id: 50,
      //   title: "Бобер",
      //   storage: "холодильник",
      //   products: [
      //     { id: 4, quantity: 2 },
      //     { id: 5, quantity: 1 },
      //   ],
      //   content: "lorem",
      // });
      // for (var i = 1; i < 6; i++) {
      //   this.recipes.push({
      //     id: i,
      //     title: "Шаурма",
      //     products: [
      //       { id: 2, quantity: 3 },
      //       { id: 1, quantity: 2 },
      //       { id: 5, quantity: 1 },
      //     ],
      //     content:
      //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lectus orci, iaculis vel blandit sed, euismod sed augue. Proin posuere turpis nisi, ac varius ipsum elementum in.",
      //     storage: "комод",
      //   });
      // }
    },
    async fetchProducts() {
      const products = useProductsStore();
      this.recipes.forEach((recipe) => {
        recipe.products.forEach((product) => {
          product["name"] = products.getProductById(product.id).name;
        });
      });
    },
    async fetchSteps() {
      axios.get("/steps").then((res) => {
        if (res.status == 200) {
          this.steps = res.data.data.steps;
        }
      });
    },
    addFilter(filter) {
      this.filters.push(filter);
    },
    removeFilter(filter) {
      this.filters = this.filters.filter((x) => {
        return x.type !== filter.type && x.value !== filter.value;
      });
    },
    getRecipeById(id) {
      // console.log(this.recipes.find((pr) => pr.id === id));
      return this.recipes.find((x) => {
        return x.id == id;
      });
    },
    createRecipe(recipe) {
      axios
        .post("/recipes/", {
          ...recipe,
        })
        .then((res) => {
          if (res.status === 200) {
            alert("Рецепт успешно добавлен");
            this.fetchRecipes();
          }
        });
    },
    async addProduct({ id, id_product, id_measure, quantity }) {
      const res = await axios.post(`/recipes/${id}/ingredients`, {
        id_product,
        id_measure,
        quantity,
      });
      if (res.status === 200) {
        this.fetchRecipes();
        return true;
      }
      alert("Не удалось добавить рецепт");
      return false;
    },
    async getRecipeIngredients(recipe) {
      const res = axios.get(`/recipes/${1}/ingredients`);
      if (res.status == 200) {
        recipe.products = res.data.data.ingredients;
      }
    },
    async deleteProduct({ id, id_product }) {
      const res = await axios.delete(`recipes/${id}`, {
        id_product: id_product,
      });

      if (res.status === 200) {
        this.fetchRecipes();
        return true;
      }

      alert("Не удалось удалить рецепт");
      return false;
    },
  },
  getters: {
    LimitedRecipes() {
      var recipes = [...this.recipes];
      var recipes_chunks = [];
      for (let i = 0; i < recipes.length; i += this.limit) {
        const chunk = recipes.slice(i, i + this.limit);
        recipes_chunks.push(chunk);
      }
      return recipes_chunks[this.page - 1];
    },
    FilteredAndLimitedRecipes() {
      var recipes = this.LimitedRecipes;
      this.filters.forEach((filter) => {
        if (filter["type"] === "product") {
          recipes.forEach((recipe) => {
            this.getRecipeIngredients(recipe);
          });
          recipes = recipes.filter((x) => x.find((y) => y.id == filter.value));
        }
      });
      return recipes;
    },
    SortedFilteredAndLimitedRecipes() {
      var recipes = this.FilteredAndLimitedRecipes;
      if (this.sorted === "+") {
        recipes = recipes.sort((r1, r2) =>
          r1["name"]?.localeCompare(r2["name"])
        );
      } else if (this.sorted === "-") {
        recipes = recipes.sort(
          (r1, r2) => -r1["name"]?.localeCompare(r2["name"])
        );
      }
      return recipes;
    },
    SearchedSortedFilteredAndLimitedRecipes() {
      return this.SortedFilteredAndLimitedRecipes.filter((x) =>
        x.name.toLowerCase().includes(this.search.toLocaleLowerCase())
      );
    },
  },
});
