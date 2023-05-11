<template>
  <div class="container px-11">
    <h1 class="text-3xl font-bold">{{ recipe.title }}</h1>
    <div class="mt-3">
      <h2 class="font-semibold text-lg">Используемые продукты:</h2>
      <a
        class="cursor-pointer"
        v-for="product in products"
        @click="this.$router.push('/products/' + product.id)"
        >{{ product.name }},
      </a>
    </div>
    <p class="mt-3">{{ recipe.content }}</p>
    <div class="grid grid-cols-2">
      <div>Шаги рецепта:</div>
      <div class="text-right">
        Советы:
        <ul>
          <li>Вы можете обоссать бомжа</li>
          <li>И не одного</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRecipesStore } from "../stores/RecipesStore";
import { storeToRefs } from "pinia";
import { useProductsStore } from "../stores/ProductsStore";
import { useRoute } from "vue-router";

const route = useRoute();
const store = useRecipesStore();
const store_products = useProductsStore();
store.fetchRecipes();
store_products.fetchProducts();
const recipe = store.getRecipeById(route.params.id);
let products = [];
recipe.products.forEach((product) => {
  products.push(store_products.getProductById(product.id));
});
</script>

<style scoped></style>
