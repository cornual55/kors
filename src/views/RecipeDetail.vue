<template>
  <div class="container px-11">
    <h1 class="text-lg font-bold">{{ recipe.title }}</h1>
    <p>
      <span class="font-semibold">Используемые продукты: </span>
      <a
        class="cursor-pointer"
        v-for="product in products"
        @click="this.$router.push('/products/' + product.id)"
        >{{ product.name }},
      </a>
    </p>
    <div>{{ recipe.content }}</div>
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
