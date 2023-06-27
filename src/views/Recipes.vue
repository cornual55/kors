<template>
  <div class="container">
    <!-- Фильтры -->
    <div v-show="isAdmin" class="flex gap-4">
      <router-link class="px-4 py-2" to="/recipes">Рецепты</router-link>
      <router-link class="px-4 py-2 hover:bg-green rounded-lg" to="/steps"
        >Шаги</router-link
      >
    </div>
    <TopBar
      v-if="isAdmin"
      v-model:search="store.search"
      @click_create="this.$router.push('/recipes/new')"
      @click_sort="changeSort"
      @click_filter="sidebarIsHidden = !sidebarIsHidden"
    />
    <TopBar
      v-else
      v-model:search="store.search"
      @click_create="isAdding = true"
      @click_sort="changeSort"
      :not_show="['create']"
      @click_filter="sidebarIsHidden = !sidebarIsHidden"
    />
    <div
      class="mx-auto w-fit font-bold text-xl flex flex-col items-center gap-3"
      v-if="recipes.length === 0"
    >
      Вы еще не добавили не одного рецепта
      <my-button @click="this.$router.push('/recipes/new')" class="w-36"
        >Добавить</my-button
      >
    </div>
    <div v-else class="flex">
      <sidebar :is_hidden="sidebarIsHidden">
        <Filters
          @change="
            (filter, isForAdding) =>
              isForAdding ? store.addFilter(filter) : store.removeFilter(filter)
          "
          :options="filter_options"
        />
      </sidebar>

      <div class="flex-1">
        <div
          class="grid max-sm:justify-center max-sm:gap-y-5 sm:grid-cols-2 lg:grid-cols-3 sm:gap-3"
        >
          <card
            v-for="recipe in store.SearchedSortedFilteredAndLimitedRecipes"
            @delete="store.deleteRecipe(recipe.id)"
            @edit="this.$router.push(`/recipes/${recipe.id}/edit`)"
            :title="recipe.name"
            :show_bar="isAdmin"
            :show_detail="true"
            :key="recipe.id"
          >
            {{ recipe.description }}
          </card>
        </div>
      </div>
    </div>
    <div class="my-16 flex justify-between gap-16">
      <Pagination v-model="store.page" :total_pages="total_pages" />
      <select @change="changePagination()" v-model="limit" class="w-24 px-3">
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>
      </select>
    </div>
  </div>
</template>

<script>
import { storeToRefs } from "pinia";
import Card from "../components/Card.vue";
import { useRecipesStore } from "../stores/RecipesStore";
import { useProductsStore } from "../stores/ProductsStore";
import { useUserStore } from "../stores/UserStore";
import TopBar from "../components/TopBar.vue";
import Sidebar from "../components/Sidebar.vue";
import Filters from "../components/Filters.vue";
import Pagination from "../components/Pagination.vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import CompleteAuto from "../components/CompleteAuto.vue";
import CompleteAutoOld from "../components/CompleteAutoOld.vue";

export default {
  data() {
    return {
      bokan: false,
      sidebarIsHidden: true,
      isAdding: false,
      form_products: [],
      form_steps: [],
      isChanging: false,
      current_recipe: "",
      temp1: [],
      temp2: [],
      total_pages: ''
    };
  },
  components: {
    Card,
    TopBar,
    Sidebar,
    Filters,
    Pagination,
    Form,
    Field,
    ErrorMessage,
    CompleteAuto,
    CompleteAutoOld,
  },
  methods: {
    changeRecipe() {
      this.current_recipe.ingredients.forEach((ingr) => {
        delete ingr.name;
        delete ingr.id;
      });
      this.store.updateRecipe(this.current_recipe);
    },
    changeSort() {
      if (this.store.sorted === "+") {
        this.store.sorted = "-";
      } else {
        this.store.sorted = "+";
      }
    },
    async setCurrentRecipe(recipe) {
      recipe.steps = await this.store.getRecipeSteps(recipe);
      recipe.ingredients = await this.store.getRecipeIngredients(recipe);
      recipe.ingredients.forEach((ingr) => {
        ingr.name = ingr.product.name;
        ingr.id = ingr.product.id;
      });

      this.current_recipe = { ...recipe };
      this.isChanging = true;
    },
    createRecipe(values, { resetForm }) {
      this.form_products.forEach((pr) => {
        pr.id_product = pr.id;
        pr.id_measure = 1;
      });
      this.store.createRecipe({
        ...values,
        steps: this.form_steps,
        ingredients: this.form_products,
        id_user: this.user.id,
      });
      this.isAdding = false;
      resetForm();
      this.form_steps = [];
      this.form_products = [];
    },
    changePagination() {
      this.store.page = 1
      this.total_pages = Math.ceil(this.recipes.length / this.limit);
    }
  },
  mounted() {
    this.store.fetchRecipes().then(() => {
      this.total_pages = Math.ceil(this.recipes.length / this.limit);
    });
  },
  setup() {
    const store = useRecipesStore();
    const store_products = useProductsStore();
    const { user, isAdmin } = storeToRefs(useUserStore());

    const { recipes, steps, limit } = storeToRefs(store);
    const { products } = storeToRefs(store_products);
    store.fetchSteps();
    let filter_options = [{ type: "product", name: "Продукты", values: [] }];
    store_products.fetchProducts().then(() => {
      products.value.forEach((product) =>
        filter_options[0].values.push({
          id: product.id,
          value: product.id,
          name: product.name,
        })
      );
    });

    return {
      recipes,
      store,
      filter_options,
      steps,
      products,
      user,
      isAdmin,
      limit
    };
  },
};
</script>
