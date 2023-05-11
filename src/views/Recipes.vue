<template>
  <div class="container">
    <div v-if="user">
      <!-- <button @click="IsTable = true">Таблица |</button>
      <button @click="IsTable = false">Карточки</button> -->
    </div>
    <!-- Фильтры -->
    <TopBar
      v-model:search="search"
      @click_sort="changeSort"
      @click_filter="sidebarIsHidden = !sidebarIsHidden"
    />
    <!-- Основной контент -->
    <div class="flex gap-3" :class="{ hidden: !IsTable }">
      <table class="min-w-full bg-white">
        <thead class="bg-gray-800 text-white">
          <tr>
            <th
              class="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm"
            >
              Рецепт
            </th>
            <th
              class="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm"
            >
              Место хранения
            </th>
            <th class="text-left py-3 px-4 uppercase font-semibold text-sm">
              Описание
            </th>
          </tr>
        </thead>
        <tbody class="text-gray-700 [&>*:nth-child(even)]:bg-gray-100">
          <tr v-for="item in current_recipes" :key="item.id">
            <td class="w-1/3 text-left py-3 px-4">{{ item.title }}</td>
            <td class="w-1/3 text-left py-3 px-4">{{ item.storage }}</td>
            <td class="text-left py-3 px-4">
              <a class="hover:text-blue-500">{{ item.content }}</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="flex gap-3" :class="{ hidden: IsTable }">
      <sidebar
        class="fixed right-0 top-0 bottom-0 z-50 md:relative p-5"
        :class="{
          'left-full md:relative md:-left-1/2 md:hidden': sidebarIsHidden,
          'left-1/3 md:left-0': !sidebarIsHidden,
        }"
      >
        <my-button class="md:hidden" @click="sidebarIsHidden = true"
          >Закрыть</my-button
        >
        <my-accordion
          v-for="option in filterOptions"
          :key="option.name"
          :title="option.name"
        >
          <!-- <my-accordion
          v-for="option in filterOptions"
          :key="option.name"
          :title="option.name"
          :class="{ '[&>*]:invisible': sidebarIsHidden }"
        > -->
          <Filter
            v-for="value in option.values"
            :type="option.type"
            :name="value.name"
            :value="value.value"
            :key="value.id"
            @change="
              (filter, isForAdding) =>
                isForAdding
                  ? this.store.addFilter(filter)
                  : this.store.removeFilter(filter)
            "
          />
        </my-accordion>
      </sidebar>
      <div class="flex-1">
        <div
          class="grid max-sm:justify-center max-sm:gap-y-5 sm:grid-cols-2 lg:grid-cols-3 sm:gap-3"
        >
          <!-- <add-card
            v-model:title="title"
            v-model:storage="storage"
            v-model:content="content"
            v-if="user"
          /> -->
          <card
            v-for="recipe in store.SearchedSortedFilteredAndLimitedRecipes"
            :title="recipe.title"
            :products="recipe.products"
            :key="recipe.id"
            class="cursor_pointer"
            @click="this.$router.push('/recipes/' + recipe.id)"
          >
            {{ recipe.content }}

            <!-- <div class="mt-2 font-semibold">Для рецепта понадобится:</div>
            <table class="mt-3">
              <tr v-for="product in recipe.products">
                <td class="px-2">{{ product.quantity }}</td>
                <td class="px-2">{{ product.name }}</td>
              </tr>
            </table> -->
          </card>
        </div>
      </div>
    </div>
    <div class="my-16 flex justify-between gap-16">
      <Pagination v-model="page" :total_pages="total_pages" />
      <select v-model="limit" class="w-24 px-3">
        <option value="2">test 2</option>
        <option value="3">test 3</option>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>
      </select>
    </div>
  </div>
</template>

<script>
import Card from "../components/Card.vue";
import AddCard from "../components/AddCard.vue";
import Sidebar from "../components/Sidebar.vue";
import Filter from "../components/Filter.vue";
import Pagination from "../components/Pagination.vue";
import TopBar from "../components/TopBar.vue";
// import BarOnTop from "../components/BarOnTop.vue";
import { useUserStore } from "../stores/UserStore";
import { useRecipesStore } from "../stores/RecipesStore";
import { useProductsStore } from "../stores/ProductsStore";
import { storeToRefs } from "pinia";
import { computed } from "vue";
import { useStoragesStore } from "../stores/StoragesStore";

export default {
  data() {
    return {
      name: "Recipes",
      total_pages: 1,
      current_recipes: [],
      IsAdding: false,
      title: "",
      storage: "",
      content: "",
      IsTable: false,
      sidebarIsHidden: true,
      // filterOptions: [
      //   {
      //     name: "Место хранения",
      //     type: "storage",
      //     values: ["Комод", "Холодильник"],
      //   },
      // ],
      // currentFilters: [ {type: "", value: ""} ],
    };
  },
  components: {
    Card,
    Sidebar,
    AddCard,
    Filter,
    Pagination,
    TopBar,
  },
  // created() {
  //   this.$watch(
  //     () => this.$route.query,
  //     (query) => {
  //       this.loadPage(query.page);
  //     }
  //   );
  // },
  methods: {
    calculateTotalPages() {
      this.total_pages = Math.ceil(this.recipes.length / this.limit);
    },
    changeSort() {
      if (this.sorted === "+") {
        this.sorted = "-";
      } else {
        this.sorted = "+";
      }
    },
  },
  mounted() {
    this.calculateTotalPages();
  },
  watch: {
    limit() {
      this.calculateTotalPages();
    },
  },
  setup() {
    const { user } = storeToRefs(useUserStore());
    const store_products = useProductsStore();
    const store_storages = useStoragesStore();
    const store = useRecipesStore();
    const {
      recipes,
      SearchedSortedFilteredAndLimitedRecipes,
      page,
      limit,
      search,
      sorted,
    } = storeToRefs(store);
    store_products.fetchProducts();
    store_storages.fetchStorages();
    const { products } = storeToRefs(store_products);
    const { storages } = storeToRefs(store_storages);
    let filterOptions = [
      { type: "product", name: "Продукты", values: [] },
      { type: "storage", name: "Места хранения", values: [] },
    ];
    products.value.forEach((product) =>
      filterOptions[0].values.push({
        id: product.id,
        value: product.id,
        name: product.name,
      })
    );
    storages.value.forEach((storage) =>
      filterOptions[1].values.push({
        id: storage.id,
        value: storage.storage,
        name: storage.storage,
      })
    );
    store.fetchRecipes();
    store.fetchProducts();

    return {
      user,
      filterOptions,
      recipes,
      store,
      page,
      limit,
      search,
      SearchedSortedFilteredAndLimitedRecipes,
      sorted,
    };
  },
};
</script>
