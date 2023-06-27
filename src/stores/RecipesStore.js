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
        return x.type !== filter.type || x.value !== filter.value;
      });
    },
    async getRecipeById(id) {
      // console.log(this.recipes.find((pr) => pr.id === id));
      // return this.recipes.find((x) => {
      //   return x.id == id;
      // });
      return axios.get("/recipes/" + id).then((res) => {
        if (res.status === 200) {
          return res.data.data.recipe;
        }
      });
    },
    async createRecipe(recipe) {
      return axios
        .post("/recipes/", {
          ...recipe,
        })
        .then((res) => {
          if (res.status === 200) {
            alert("Рецепт успешно добавлен");
            return true;
          } else {
            alert("Не удалось создать рецепт");
            return false;
          }
        })
        .catch((e) => {
          return false;
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
    async getRecipeIngredients(id) {
      const res = await axios.get(`/recipes/${id}/ingredients`);
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
    async updateRecipe(id, recipe) {
      axios
        .put(`/recipes/${id}`, {
          ...recipe,
        })
        .then((res) => {
          if (res.status === 200) {
            return true;
          } else {
            return false;
          }
        }).catch(() => {
          return false
        });
    },
    async updateRecipeIngredient(id, ingredient) {
      return axios
        .put(`/recipes/${id}/ingredients`, {
          ...ingredient,
        })
        .then((res) => {
          if (res.status === 200) {
            return true;
          } else {
            return false;
          }
        })
        .catch(() => {
          return false;
        });
    },
    async addRecipeIngredient(id, ingredient) {
      return axios.post(`/recipes/${id}/ingredients`, {...ingredient})
        .then(res => {
          if (res.status === 200) {
            return true
          } else {
            return false
          }
        }).catch(() => {
          return false;
        })
    },
    async deleteRecipeIngredient(id, id_product) {
      return axios.delete(`/recipes/${id}/ingredients`, {data: {id_product: id_product}})
    },
    async deleteRecipeStep(id, step_id, place) {
      return axios.delete(`/recipes/${id}/steps/${step_id}`, {data: {place: place}})
        .then(res => {
          if (res.status === 200) {
            return true;
          } else {
            return false;
          }
        }).catch(() => {
          return false;
        })
    },
    async addRecipeStep(recipe_id, { id, place }) {
      return axios
        .post(`/recipes/${recipe_id}/steps/${id}`, {
          place: place,
        })
        .then((res) => {
          if (res.status === 200) {
            return true;
          } else {
            return false;
          }
        })
        .catch(() => {
          return false;
        });
    },
    async createStep({ name }) {
      axios
        .post("/steps", {
          name: name,
        })
        .then((res) => {
          if (res.status === 200) {
            alert("шаг успешно создан");
            this.fetchSteps();
          }
        });
    },
    async deleteStep(id) {
      axios.delete(`/steps/${id}}`).then((res) => {
        if (res.status === 200) {
          alert("успешно удалено");
        }
      });
    },
    async fetchSteps() {
      axios.get("/steps/?limit=30").then((res) => {
        this.steps = res.data.data.steps;
      });
    },
    async getRecipesByProductId(id) {
      axios.get(`/products/${id}/recipes`).then((res) => {
        this.recipes = res.data.data.recipes;
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
      var t_pr = [];
      this.filters.forEach((filter) => {
        if (filter["type"] === "product") {
          t_pr.push(filter.value);
        }
      });
      if (t_pr.length > 0) {
        for (const recipe of recipes) {
          if (recipe.ingredients) {
            continue;
          }
          this.getRecipeIngredients(recipe.id).then((ingrs) => {
            recipe.ingredients = ingrs;
          });
        }
        recipes = recipes.filter((x) => {
          let total = 0;
          x.ingredients.forEach((ing) => {
            if (t_pr.includes(ing.product.id)) {
              total++;
            }
          });
          if (total === t_pr.length) {
            return true;
          }
        });
      }
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
      let recipes = this.SortedFilteredAndLimitedRecipes;
      return recipes.filter((x) =>
        x.name.toLowerCase().includes(this.search.toLocaleLowerCase())
      );
    },
    // FilterByProductsSearchedSortedFilteredAndLimitedRecipes() {
    //   var recipes = this.SearchedSortedFilteredAndLimitedRecipes;
    //   if (this.products.length === 0) {
    //     return recipes;
    //   }
    //   var temp_recipies = [];
    //   var recipes_product = [];
    //   this.products.forEach((product) => {
    //     recipes_product = this.getRecipesByProductId(product.id);
    //     let recs = [];
    //     if ((temp_recipies.length = 0)) {
    //       recs = recipes_product;
    //     } else {
    //       recipes_product.forEach((recipe) => {
    //         let count = 0;
    //         let max = temp_recipies.length;
    //         temp_recipies.forEach((recipes) => {
    //           if (recipes.find((x) => x.id === recipe.id)) {
    //             count++;
    //           }
    //         });
    //         if (count == max) {
    //           recs.push(recipe);
    //         }
    //       });
    //     }
    //     temp_recipies.push(recs);
    //   });
    //   return temp_recipies;
    // },
  },
});
