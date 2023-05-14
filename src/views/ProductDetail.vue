<template>
  <div class="container bg-gray-100 p-10 rounded-xl">
    <h1 class="text-2xl">{{ product.name }}</h1>
    <p>{{ product.descripti }}</p>
    <h2 class="text-lg mt-1 mb-3">Советы: </h2>
        <ul class="[&>li]:bg-gray-200/90 [&>li]:hover:bg-gray-300/60 tips">
            <li v-for="tip in tips" :key="tip.id">{{ tip.description}}</li>
        </ul>
  </div>

</template>

<script setup>
import { useProductsStore } from "../stores/ProductsStore";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import {onMounted, ref} from "vue";
const product = ref('');

const store = useProductsStore();
const route = useRoute();
const tips = ref('')
onMounted(async () =>{
    let id = route.params.id
    product.value = await store.getProductById(id);
    tips.value = await store.getProductTips(id)
})
/* console.log(GetProductById(1)) */
</script>

<style scoped>
.tips > li {
    padding: 0.7rem;
}
</style>
