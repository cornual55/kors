import { defineStore } from "pinia";
import { useProductsStore } from "./ProductsStore.js";
import axios from "axios";

export const useRecipesStore = defineStore("recipes", {
  state: () => ({
    recipes: "",
    steps: [],
    limit: 5,
    page: 1,
    steps: [],
    filters: [],
    search: "",
    sorted: "",
  }),
  actions: {
    async fetchRecipes() {
      const res = await axios.get("/recipes/?limit=30");

      if ((res.status = 200)) {
        this.recipes = res.data.data.recipes;
        return true;
      }
      return false;
    },

    async fetchSteps() {
      axios.get("/steps/?limit=30").then((res) => {
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
      const res = await axios.get(`/recipes/${recipe.id}/ingredients`);
      console.log(res)
      if (res.status == 200) {
        return res.data.data.ingredients;
      }
    },
    async getRecipeSteps(recipe) {
      const res = await axios.get(`/recipes/${recipe.id}/steps`);
      if (res.status == 200) {
        return res.data.data.steps;
      }
    },
    async deleteRecipe(id) {
      const res = await axios.delete(`/recipes/${id}`);
      if (res.status === 200) {
        this.fetchRecipes();
        return true;
      }

      alert("Не удалось удалить рецепт");
      return false;
    },
        async updateRecipe(recipe) {
            axios.put(`/recipes/${recipe.id}`, {
                ...recipe
            }).then(res => {
                    if (res.status === 200) {
                        alert("Рецепт успешно удален");
                        this.fetchRecipes();
                    }
                })
        },
        async createStep({name}) {
            axios.post('/steps', {
                name: name
            }).then(res => {
                    if (res.status === 200) {
                        alert('шаг успешно создан')
                        this.fetchSteps();
                    }
                })
        },
        async deleteStep(id) {
            axios.delete(`/steps/${id}}`)
                .then(res => {
                    if (res.status === 200) {
                        alert("успешно удалено")
                        this.fetchSteps();
                    }
                })
        },
        async fetchSteps() {
            axios.get("/steps/?limit=30")
                .then(res => {
                    this.steps = res.data.data.steps
                })
        }
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
          recipes = recipes.filter((x) => x.find((y) => y.ingredients.includes(filter.value)));
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
