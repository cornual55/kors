<template>
  <div class="container">
    <top-bar
      v-model:search="store.search"
      :not_show="['tip', 'sort', 'create']"
      @click_filter="sidebarIsHidden = !sidebarIsHidden"
      @click_create="isAdding = true"
    />
    <div
      class="mx-auto w-fit font-bold text-xl flex flex-col items-center gap-3"
      v-if="tips.length === 0"
    >
      Вы еще не добавили не одного совета
    </div>
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
      <div
        :class="{ 'grid-cols-2': !sidebarIsHidden }"
        class="flex-1 grid max-sm:justify-center max-sm:gap-y-5 sm:grid-cols-2 lg:grid-cols-3 sm:gap-3"
      >
        <card
          v-for="tip in store.SearchedFilteredAndSortedTips"
          :key="tip.id"
          :title="'Совет'"
          :show_bar="isLoggedIn"
          @delete="store.deleteTip(tip.id)"
          @edit="changeTip(tip)"
        >
          {{ tip.description }}
        </card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useTipsStore } from "../stores/TipsStore";
import { useUserStore } from "../stores/UserStore";
import { useStoragesStore } from "../stores/StoragesStore";
import { useProductsStore } from "../stores/ProductsStore";
import { storeToRefs } from "pinia";
import { ref, onMounted } from "vue";

import TopBar from "../components/TopBar.vue";
import Sidebar from "../components/Sidebar.vue";
import Filters from "../components/Filters.vue";
import Card from "../components/Card.vue";

const store = useTipsStore();
const store_storages = useStoragesStore();
const store_products = useProductsStore();

const { isLoggedIn } = storeToRefs(useUserStore())
const isChanging = ref(false);
const isAdding = ref(false);
const sidebarIsHidden = ref(true);

const { tips } = storeToRefs(store);
store.fetchTips();

const filter_options = ref([
  { type: "storage", name: "Место хранения", values: [] },
  { type: "product", name: "Продукт", values: [] }
]);

onMounted(async () => {
  let { storages } = storeToRefs(store_storages);
  let { products } = storeToRefs(store_products);
  await store_storages.fetchStorages();
  await store_products.fetchProducts();
  storages.value.forEach((storage) => {
    /* console.log(storage_type); */
    filter_options.value[0].values.push({
      id: storage.id,
      name: storage.name,
      value: storage.id,
    });
  });
  products.value.forEach((product) => {
    filter_options.value[1].values.push({
      id: product.id,
      name: product.name,
      value: product.id
    })
  })
});

const changeTip = (tip) => {

}
</script>

<style scoped></style>
