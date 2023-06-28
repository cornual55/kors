<template>
  <div class="container">
    <div class="flex gap-4">
      <router-link class="px-4 py-2 hover:bg-green rounded-lg" to="/shelf-lives"
        >Сроки годности</router-link
      >
      <router-link class="px-4 py-2" to="/products">Продукты</router-link>
      <router-link class="px-4 py-2 hover:bg-green rounded-lg" to="/categories"
        >Категории</router-link
      >
    </div>
    <top-bar
      v-if="isAdmin"
      class="-ml-4"
      :not_show="['sort', 'filter']"
      v-model:search="store.search"
      @click_create="isAdding = !isAdding"
    />
    <top-bar v-else class="-ml-4" :not_show="['sort', 'filter', 'create']" v-model:search="store.search" @click_create="isAdding = true" />
    <my-dialog v-model:show="isAdding">
      <Form
        @submit="
          (values, actions) => {
            store.createProduct(values);
            isAdding = false;
            actions.resetForm();
          }
        "
        class="flex [&>*]:p-4 flex-col gap-4"
      >
        Название продукта:
        <Field
          class="-mt-2"
          name="name"
          type="text"
          placeholder="Название продукта"
        />
        Категория:
        <Field class="-mt-2" name="category_id" as="select">
          <option disabled hidden selected="selected" value="">
            Выберите категорию...
          </option>
          <option
            v-for="category in categories"
            :key="category.id"
            :value="category.id"
          >
            {{ category.name }}
          </option>
        </Field>
        <my-button>Создать </my-button>
      </Form>
    </my-dialog>
    <my-dialog v-model:show="isChanging">
      <Form
        @submit="
          (values, actions) => {
            store.updateProduct(current_product);
            isChanging = false;
          }
        "
        class="flex [&>*]:p-4 flex-col gap-4"
      >
        Название продукта:
        <Field
          class="-mt-2"
          name="name"
          type="text"
          v-model="current_product.name"
          placeholder="Название продукта"
        />
        Категория:
        <Field
          class="-mt-2"
          name="category_id"
          as="select"
          v-model="current_product.category_id"
        >
          <option disabled hidden selected="selected" value="">
            Выберите категорию...
          </option>
          <option
            v-for="category in categories"
            :key="category.id"
            :value="category.id"
          >
            {{ category.name }}
          </option>
        </Field>
        <my-button>Создать </my-button>
      </Form>
    </my-dialog>

    <div class="mt-5 flex">
      <!-- <sidebar class="flex-1" /> -->
      <div class="flex-1 bg-gray-100 p-8 rounded-xl overflow-hidden">
        <h1 class="text-xl font-bold">Продукты</h1>
        <div
          class="mt-3 rounded-lg p-4 bg-gray-200/90 hover:bg-gray-300/70 transition-all flex justify-between"
          v-for="product in store.SearchedProducts"
        >
          <div
            @click="router.push('/products/' + product.id)"
            class="hover:underline cursor-pointer"
          >
            {{ product.name }}
            <span class="text-sm">{{ product.name_category }}</span>
          </div>
          <div>
            <font-awesome-icon
              v-show="isAdmin"
              :icon="['far', 'pen-to-square']"
              @click="clickChange(product)"
              class="text-gray-700/70 transition-all text-2xl cursor-pointer hover:text-gray-700"
            />
            <font-awesome-icon
              v-show="isAdmin"
              @click="store.deleteProduct(product.id)"
              :icon="['far', 'trash-can']"
              class="text-gray-700/70 ml-7 transition-all text-2xl cursor-pointer hover:text-gray-700"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import TopBar from "../components/TopBar.vue";
import { useProductsStore } from "../stores/ProductsStore";
import { useUserStore } from "../stores/UserStore";
import { useCategoriesStore } from "../stores/CategoriesStore";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";
import { Form, Field } from "vee-validate";
import { useRouter } from "vue-router";

const router = useRouter();
const isAdding = ref(false);
const isChanging = ref(false);
const store = useProductsStore();
const store_categories = useCategoriesStore();
let current_product = ref({});

const { categories } = storeToRefs(store_categories);
store_categories.fetchCategories();
const { products } = storeToRefs(store);
const { isAdmin } = storeToRefs(useUserStore());
store.fetchProducts();

let clickChange = async (product) => {
  current_product.value = {...product};
  delete current_product.name_category;
  let category = await store.getProductCategory(product.id)
  current_product.value.category_id = category[0].id;
  isChanging.value = true;
};

// let fetchProducts = async () => {
            // this.products.forEach(async (product) => {
            //   let category = await this.getProductCategory(product.id);
            //   product.id_category = category[0].id
            //   product.name_category = category[0].name
            // });
// }
</script>

<style lang="postcss" scoped>
table,
tr,
td,
th {
  /* display: block; */
  text-align: left;
  padding: 10px;
  font-size: 0.9rem;
}

table {
  width: 100%;
}
tr:nth-child(odd) {
  @apply bg-green/40;
}

tr:first-child {
  @apply bg-green/60 text-gray-900;
}

tr:nth-child(even) {
  @apply bg-green/20;
}

tr {
  padding: 0.7em 2vw;
}
</style>
