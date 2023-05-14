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
        <Form
          class="flex flex-col gap-6 [&>input]:p-4 [&>select]:p-4 mt-5"
          @submit="createRecipe"
        >
          <Field name="name" type="text" placeholder="Название" />
          <Field
            name="description"
            as="textarea"
            type="text"
            placeholder="Описание"
          />
          <!-- <Field name="steps" as="select">
            <option disabled value="">Шаги</option>
            <option v-for="step in steps" :key="step.id" :value="step.id">
              {{ step.name }}
            </option>
          </Field> -->

          <CompleteAuto
            v-model="form_steps"
            placeholder="Шаги..."
            :order="true"
            :items="steps"
          ></CompleteAuto>
          <CompleteAuto
            :numeric="true"
            v-model="form_products"
            placeholder="Продукты..."
            :items="products"
          ></CompleteAuto>

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
import { useUserStore } from "../stores/UserStore";
import TopBar from "../components/TopBar.vue";
import Sidebar from "../components/Sidebar.vue";
import Filters from "../components/Filters.vue";
import Pagination from "../components/Pagination.vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import CompleteAuto from "../components/CompleteAuto.vue";

export default {
  data() {
    return {
      bokan: false,
      sidebarIsHidden: true,
      total_pages: "",
      isAdding: false,
      form_products: [],
      form_steps: [],
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
  },
  methods: {
    changeSort() {
      if (this.store.sorted === "+") {
        this.store.sorted = "-";
      } else {
        this.store.sorted = "+";
      }
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
  },
  mounted() {
    this.total_pages = Math.ceil(this.recipes.length / this.store.limit);
  },
  setup() {
    const store = useRecipesStore();
    const store_products = useProductsStore();
    const { user } = storeToRefs(useUserStore());

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

    return { recipes, store, filter_options, steps, products, user };
  },
};
</script>
