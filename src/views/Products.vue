<template>
  <div class="container my-10">
    <div class="flex gap-4">
      <my-button>Добавить категорию</my-button>
      <my-button @click="isAdding = !isAdding">Добавить продукт</my-button>
    </div>
    <my-dialog v-model:show="isAdding"
      ><product-form
        :product="{ ...{ storage: '' } }"
        :type="'add'"
        :storage_options="storage_options"
        @create="createProduct"
        >Добавление продукта</product-form
      ></my-dialog>
    <my-dialog v-model:show="isChanging"
      ><product-form :product="{ ...current_product }" @create="changeProduct"
        >Изменение продукта</product-form
      ></my-dialog
    >
    <div class="mt-5 flex gap-3">
      <!-- <sidebar class="flex-1" /> -->
      <table class="flex-1 rounded-xl overflow-hidden">
        <!-- <caption>
          Продукты
        </caption> -->
        <tr>
          <th>Продукт</th>
          <th>Количество</th>
          <th>Место хранения</th>
          <th>Дата начала</th>
          <th>Дата окончания</th>
          <th>Статус продукта</th>
          <th>Изменить</th>
          <th>Удалить</th>
        </tr>
        <tr v-for="product in products" :key="product.id">
          <td>{{ product.name }}</td>
          <td>{{ product.quantity }}</td>
          <td>{{ product.storage.storage }}</td>
          <td>{{ product.date_start }}</td>
          <td>{{ product.date_end }}</td>
          <td>{{ product.state }}</td>
          <td style="text-align: center !important">
            <font-awesome-icon
              @click="
                current_product = product;
                isChanging = true;
              "
              :icon="['far', 'pen-to-square']"
              class="text-gray-700/70 transition-all text-2xl cursor-pointer hover:text-gray-700"
            />
          </td>
          <td style="text-align: center !important">
            <font-awesome-icon
              @click="deleteProduct(product)"
              :icon="['far', 'trash-can']"
              class="text-gray-700/70 transition-all text-2xl cursor-pointer hover:text-gray-700"
            />
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import Sidebar from "../components/Sidebar.vue";
import ProductForm from "../components/ProductForm.vue";
import { useProductsStore } from "../stores/ProductsStore";
import { storeToRefs } from "pinia";
import {ref} from 'vue'
import { useStoragesStore } from "../stores/StoragesStore";

export default {
  data() {
    return {
      isAdding: false,
      isChanging: false,
      current_product: {}
    };
  },
  components: {
    Sidebar,
    ProductForm,
  },
  methods: {
    createProduct(product) {
      this.isAdding = false;
      this.store.createProduct(product);
    },
    changeProduct(product) {
      this.isChanging = false;
      this.store.updateProduct(product);
    },
  },
  setup() {
    const store = useProductsStore();
    const store_storages = useStoragesStore();
    const { products } = storeToRefs(store);
    store.fetchProducts();
    store.fetchStorages();
    const storage_options = ref([]);
    store_storages.fetchStorages();
    store_storages.storages.forEach(st => {
      storage_options.value.push({
        name: st.storage,
        value: st.id
      })
    })

    return { products, store, storage_options };
  },
};
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
