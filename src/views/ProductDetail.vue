<template>
  <div class="container">
    <h1>{{ product.name }}</h1>
  </div>
</template>

<script setup>
import { useProductsStore } from "../stores/ProductsStore";
import { useRoute } from "vue-router";

const store = useProductsStore();
const route = useRoute();
store.fetchProducts();
const product = store.getProductById(route.params.id);
</script>

<style scoped></style>
