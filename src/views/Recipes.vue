<template>
  <div class="container">
    <!-- Фильтры -->
    <TopBar
      v-model:search="store.search"
      @click_create="isAdding = true"
      @click_sort="changeSort"
      @click_filter="sidebarIsHidden = !sidebarIsHidden"
    />
    <div class="flex">
      <sidebar :is_hidden="sidebarIsHidden">
        <Filters
          @change="
            (filter, isForAdding) =>
              isForAdding ? store.addFilter(filter) : store.removeFilter(filter)
          "
          :options="filter_options"
        />
      </sidebar>
      <my-dialog v-model:show="isAdding">
        <Form class="flex flex-col gap-6 [&>input]:p-4 [&>select]:p-4  mt-5" @submit="createRecipe">
          <Field name="name" type="text" placeholder="Название" />
          <Field name="description" type="text" placeholder="Описание" />
          <Field name="steps" as="select">
            <option disabled value="">Шаги</option>
            <option v-for="step in steps" :key="step.id" :value="step.id">
              {{ step.name }}
            </option>
          </Field>
          <Field name="ingredients" as="select">
            <option disabled value="">Продукты</option>
            <option
              v-for="product in products"
              :key="product.id"
              :value="product.id"
            >
              {{ product.name }}
            </option>
          </Field>
          <my-button>Создать</my-button>
        </Form>
      </my-dialog>
      <div class="flex-1">
        <div
          class="grid max-sm:justify-center max-sm:gap-y-5 sm:grid-cols-2 lg:grid-cols-3 sm:gap-3"
        >
          <card
            v-for="recipe in store.SearchedSortedFilteredAndLimitedRecipes"
            :title="recipe.name"
            :key="recipe.id"
            @click="this.$router.push('/recipes/' + recipe.id)"
          >
            {{ recipe.description }}
          </card>
        </div>
      </div>
    </div>
    <div class="my-16 flex justify-between gap-16">
      <Pagination v-model="store.page" :total_pages="total_pages" />
      <select v-model="store.limit" class="w-24 px-3">
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
import TopBar from "../components/TopBar.vue";
import Sidebar from "../components/Sidebar.vue";
import Filters from "../components/Filters.vue";
import Pagination from "../components/Pagination.vue";
import { Form, Field, ErrorMessage } from "vee-validate";

export default {
  data() {
    return {
      bokan: false,
      sidebarIsHidden: true,
      total_pages: "",
      isAdding: false,
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
  },
  methods: {
    changeSort() {
      if (this.store.sorted === "+") {
        this.store.sorted = "-";
      } else {
        this.store.sorted = "+";
      }
    },
    createRecipe(values) {
      this.store.createRecipe(values);
      this.isAdding = false;
    },
  },
  mounted() {
    this.total_pages = Math.ceil(this.recipes.length / this.store.limit);
  },
  setup() {
    const store = useRecipesStore();
    const store_products = useProductsStore();

    const { recipes, steps } = storeToRefs(store);
    const { products } = storeToRefs(store_products);
    store.fetchRecipes();
    store.fetchSteps();
    store_products.fetchProducts();

    let filter_options = [{ type: "product", name: "Продукты", values: [] }];
    products.value.forEach((product) =>
      filter_options[0].values.push({
        id: product.id,
        value: product.id,
        name: product.name,
      })
    );

    return { recipes, store, filter_options, steps, products };
  },
};
</script>
