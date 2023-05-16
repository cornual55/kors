<template>
  <div class="container">
    <!-- Фильтры -->
    <div class="flex gap-4">
      <router-link class="px-4 py-2" to="/recipes">Рецепты</router-link>
      <router-link
        class="px-4 py-2 hover:bg-green rounded-lg"
        to="/steps"
        >Шаги</router-link>
    </div>
    <TopBar
      v-model:search="store.search"
      @click_create="isAdding = true"
      @click_sort="changeSort"
      @click_filter="sidebarIsHidden = !sidebarIsHidden"
    />
    <div v-if="recipes === ''">Данные загружаются...</div>
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
      <my-dialog v-model:show="isAdding">
        <h2 class="text-lg">Добавление рецепта</h2>
        <Form
          class="flex flex-col gap-6 [&>div>input]:p-4 [&>div>select]:p-4 mt-5 md:grid grid-cols-2"
          @submit="createRecipe"
        >
          <div>
            <div>Название</div>
            <Field name="name" type="text" placeholder="Название" />
          </div>
          <div>
            <div>Описание</div>
            <Field
              class="p-4"
              name="description"
              as="textarea"
              type="text"
              placeholder="Описание"
            />
          </div>

          <!-- <Field name="steps" as="select">
            <option disabled value="">Шаги</option>
            <option v-for="step in steps" :key="step.id" :value="step.id">
              {{ step.name }}
            </option>
          </Field> -->

          <CompleteAuto
            class="md:hidden"
            v-model="form_steps"
            placeholder="Шаги..."
            :selected="temp1"
            :key="1"
            :order="true"
            :items="steps"
          ></CompleteAuto>
          <CompleteAuto
            class="md:hidden"
            :numeric="true"
            :key="2"
            :selected="temp2"
            v-model="form_products"
            placeholder="Продукты..."
            :items="products"
          ></CompleteAuto>

          <CompleteAutoOld
            class="hidden md:block"
            v-model="form_steps"
            :key="3"
            placeholder="Шаги..."
            :selected="temp1"
            :order="true"
            :items="steps"
          ></CompleteAutoOld>
          <CompleteAutoOld
            class="hidden md:block"
            :key="4"
            :numeric="true"
            v-model="form_products"
            :selected="temp2"
            placeholder="Продукты..."
            :items="products"
          ></CompleteAutoOld>

          <my-button>Создать</my-button>
        </Form>
      </my-dialog>
      <my-dialog v-model:show="isChanging">
        <h2 class="text-lg">Изменение рецепта</h2>
        <Form
          class="flex flex-col gap-6 [&>div>input]:p-4 [&>div>select]:p-4 mt-5 md:grid grid-cols-2"
          @submit="changeRecipe"
        >
          <div>
            <div>Название</div>
            <Field
              v-model="current_recipe.name"
              name="name"
              type="text"
              placeholder="Название"
            />
          </div>
          <div>
            <div>Описание</div>
            <Field
              v-model="current_recipe.description"
              class="p-4"
              name="description"
              as="textarea"
              type="text"
              placeholder="Описание"
            />
          </div>

          <!-- <Field name="steps" as="select">
            <option disabled value="">Шаги</option>
            <option v-for="step in steps" :key="step.id" :value="step.id">
                  {{ step.name }}
            </option>
          </Field> -->

          <CompleteAuto
            class="md:hidden"
            v-model="current_recipe.steps"
            placeholder="Шаги..."
            :key="1"
            :selected="current_recipe.steps"
            :order="true"
            :items="current_recipe.steps"
          ></CompleteAuto>
          <CompleteAuto
            class="md:hidden"
            :numeric="true"
            :key="2"
            v-model="current_recipe.ingredients"
            :selected="current_recipe.ingredients"
            placeholder="Продукты..."
            :items="products"
          ></CompleteAuto>

          <CompleteAutoOld
            class="hidden md:block"
            v-model="current_recipe.steps"
            :selected="current_recipe.steps"
            :key="3"
            placeholder="Шаги..."
            :order="true"
            :items="steps"
          ></CompleteAutoOld>
          <CompleteAutoOld
            class="hidden md:block"
            :numeric="true"
            v-model="current_recipe.ingredients"
            :key="4"
            :selected="current_recipe.ingredients"
            placeholder="Продукты..."
            :items="products"
          ></CompleteAutoOld>

          <my-button>Создать</my-button>
        </Form>
      </my-dialog>

      <div class="flex-1">
        <div
          class="grid max-sm:justify-center max-sm:gap-y-5 sm:grid-cols-2 lg:grid-cols-3 sm:gap-3"
        >
          <card
            v-for="recipe in store.SearchedSortedFilteredAndLimitedRecipes"
            @delete="store.deleteRecipe(recipe.id)"
            @edit="setCurrentRecipe(recipe)"
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
import CompleteAutoOld from "../components/CompleteAutoOld.vue";

export default {
  data() {
    return {
      bokan: false,
      sidebarIsHidden: true,
      total_pages: "",
      isAdding: false,
      form_products: [],
      form_steps: [],
      isChanging: false,
      current_recipe: "",
      temp1: [],
      temp2: [],
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
            })
            this.store.updateRecipe(this.current_recipe)
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
      console.log(recipe.ingredients);
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
