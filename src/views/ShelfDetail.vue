<template>
  <div class="container px-11">
    <h1 class="text-2xl font-bold">Срок годности</h1>
    <p>
      Дата начала:
      {{
        new Date(shelf_life.purchase_date).toLocaleString("ru-RU", {
          dateStyle: "short",
        })
      }}
    </p>
    <p>
      Дата окончания:
      {{
        new Date(shelf_life.end_date).toLocaleString("ru-RU", {
          dateStyle: "short",
        })
      }}
    </p>

    <h2 class="text-xl mt-4 font-semibold">Советы {{ product.name }}</h2>
    <div class="mt-2">
      <div class="bg-gray-200/70 rounded-xl p-5">
        <ol class="list-decimal ml-5">
          <div v-if="tips.length === 0">
            <p class="text-sm">По этому продукту еще нету советов</p>
          </div>
          <li v-else v-for="tip in tips" :key="tip.id">
            {{ tip.description }}
            <font-awesome-icon
              v-if="isAdmin"
              @click="
                store_products.deleteTip(product.id, tip.id).then((res) => {
                  router.go();
                })
              "
              :icon="['far', 'trash-can']"
              class="text-gray-700/70 transition-all text-xl cursor-pointer hover:text-gray-700"
            />
          </li>
          <button
            v-if="isAdmin"
            @click="
              isAddingTip = true;
              current_ingredient = ingredient;
            "
            class="text-sm bg-green py-2 px-4 mt-1 rounded-lg"
          >
            Добавить
          </button>
        </ol>
      </div>
    </div>
    <div class="mt-4 grid md:grid-cols-2 gap-5">
      <h2 class="text-xl mt-4 font-semibold">Место хранения {{ storage.name }}</h2>
    <p>Температура - {{ storage.temperature }}°C</p>
    <p>Влажность - {{ storage.humidity }}%</p>
    <p>Тип места: {{ storage_type.name }}</p>
    </div>
    <h2 class="text-xl mt-4 font-semibold">Советы</h2>
    <div class="mt-2">
      <div class="bg-gray-200/70 rounded-xl p-5">
        <ol class="list-decimal ml-5">
          <div v-if="storage_tips.length === 0">
            <p class="text-sm">По этому месту хранения еще нету советов</p>
          </div>
          <li v-else v-for="tip in storage_tips" :key="tip.id">
            {{ tip.description }}
            <font-awesome-icon
              v-if="isAdmin"
              @click="
                store_storages.deleteTip(storage.id, tip.id).then((res) => {
                  router.go();
                })
              "
              :icon="['far', 'trash-can']"
              class="text-gray-700/70 transition-all text-xl cursor-pointer hover:text-gray-700"
            />
          </li>
          <button
            v-if="isAdmin"
            @click="
              isAddingTip = true;
              current_ingredient = ingredient;
            "
            class="text-sm bg-green py-2 px-4 mt-1 rounded-lg"
          >
            Добавить
          </button>
        </ol>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { useShelfLivesStore } from "../stores/ShelfLivesStore";
import { useProductsStore } from "../stores/ProductsStore";
import { useUserStore } from "../stores/UserStore";
import { useTipsStore } from "../stores/TipsStore";
import { useStoragesStore } from "../stores/StoragesStore";
import { storeToRefs } from "pinia";
import { ref, onMounted } from "vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

let string_rules = yup.string().required();

let route = useRoute();
let router = useRouter();
let store = useShelfLivesStore();
let store_products = useProductsStore();
let store_storages = useStoragesStore();
let store_tips = useTipsStore();

let { isAdmin } = storeToRefs(useUserStore());

let shelf_life = ref({});
let product = ref({});
let tips = ref([]);
let storage = ref({})
let storage_type = ref({})
let storage_tips = ref([])

onMounted(async () => {
  shelf_life.value = await store.getShelfLifeById(route.params.id);

  product.value = shelf_life.value.product;
  storage.value = shelf_life.value.storage;
  storage_type.value = storage.type
  storage_tips.value = await store_storages.getTips(storage.value.id)
  tips.value = await store_products.getProductTips(shelf_life.value.product.id);
});
</script>

<style scoped></style>
