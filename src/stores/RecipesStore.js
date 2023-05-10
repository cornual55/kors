import { defineStore } from "pinia";
import { useProductsStore } from "./ProductsStore";
// import { axios } from "axios";

export const useRecipesStore = defineStore("recipes", {
  state: () => ({
    recipes: [],
    limit: 5,
    page: 1,
    filters: [],
    search: "",
    sorted: ''
  }),
  actions: {
    async fetchRecipes() {
      // axios.get("/recipes").then((res) => console.log(res));
      this.recipes.push({
        id: 50,
        title: "Бобер",
        storage: "холодильник",
        products: [
          { id: 4, quantity: 2 },
          { id: 5, quantity: 1 },
        ],
        content: "lorem",
      });
      for (var i = 1; i < 6; i++) {
        this.recipes.push({
          id: i,
          title: "Шаурма",
          products: [
            { id: 2, quantity: 3 },
            { id: 1, quantity: 2 },
            { id: 5, quantity: 1 },
          ],
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lectus orci, iaculis vel blandit sed, euismod sed augue. Proin posuere turpis nisi, ac varius ipsum elementum in.",
          storage: "комод",
        });
      }
    },
    async fetchProducts() {
      const products = useProductsStore();
      this.recipes.forEach((recipe) => {
        recipe.products.forEach((product) => {
          product["name"] = products.getProductById(product.id).name;
        });
      });
    },
    addFilter(filter) {
      this.filters.push(filter);
    },
    removeFilter(filter) {
      console.log(filter);
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
        if (filter["type"] === "storage") {
          recipes = recipes.filter(
            (x) => x["storage"].toLowerCase() === filter.value.toLowerCase()
          );
        } else if (filter["type"] === "product") {
          recipes = recipes.filter((x) =>
            x.products.find((y) => y.id == filter.value)
          );
        }
      });
      return recipes;
    },
    SortedFilteredAndLimitedRecipes() {
      var recipes = this.FilteredAndLimitedRecipes
      if (this.sorted === "+") {
        recipes = recipes.sort((r1, r2) =>
        r1["title"]?.localeCompare(r2["title"])
      )
      } else if (this.sorted === "-") {
        recipes = recipes.sort((r1, r2) =>
        -r1["title"]?.localeCompare(r2["title"])
      )
      }
      return recipes
      
    },
    SearchedSortedFilteredAndLimitedRecipes() {
      return this.SortedFilteredAndLimitedRecipes.filter((x) => 
        x.title.toLowerCase().includes(this.search.toLocaleLowerCase())
      )
    }
  },
});
