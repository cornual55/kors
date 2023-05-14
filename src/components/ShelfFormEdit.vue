<template>
  <div>
    <h1 class="text-lg font-semibold"><slot></slot></h1>
    <form
      class="space-y-4 flex flex-col [&>*]:p-4 mt-5"
      @submit.prevent="createShelf"
    >
      <select v-model.number="shelf_life.id_product">
        <option value="" disabled selected>Продукт</option>
        <option
          v-for="product in products"
          :key="product.id"
          :value="product.id"
        >
          {{ product.name }}
        </option>
      </select>

      <input
        v-model.number="shelf_life.quantity"
        type="text"
        placeholder="Количество"
      />
      <select v-model.number="shelf_life.id_measure">
        <option value="" disabled selected>Мера измерения</option>
        <option
          v-for="measure in measures"
          :key="measure.id"
          :value="measure.id"
        >
          {{ measure.name }}
        </option>
      </select>
      <select v-model.number="shelf_life.id_storage">
        <option value="" disabled selected>Место хранения</option>
        <option
          v-for="storage in storages"
          :value="storage.id"
          :key="storage.id"
        >
          {{ storage.name }}
        </option>
      </select>
      <!-- <input
        v-model="product.purchase_date"
        type="text"
        placeholder="Дата начала"
      /> -->
      <VueDatePicker
        style="padding: 0 !important"
        class="p-0"
        :clearable="false"
        placeholder="Дата изготовления"
        locale="ru"
        format="dd.MM.yyyy"
        :enable-time-picker="false"
        auto-apply
        v-model="purchase_date"
                required
      ></VueDatePicker>
      <VueDatePicker
        style="padding: 0 !important"
        :clearable="false"
        placeholder="Годен до"
        locale="ru"
        format="dd.MM.yyyy"
        :enable-time-picker="false"
        auto-apply
        v-model="end_date"
        required
      ></VueDatePicker>
      <!-- <input
        v-model="product.date_end"
        type="text"
        placeholder="Дата окончания"
      /> -->
      <my-button type="submit">Создать</my-button>
    </form>
  </div>
</template>

<script>
import { useMeasureStore } from "../stores/MeasuresStore";
import { useStoragesStore } from "../stores/StoragesStore";
import { useProductsStore } from "../stores/ProductsStore";
import { storeToRefs } from "pinia";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { ref } from "vue";

export default {
  props: {
    shelf_life: {
      default: {
        id_product: "",
        quantity: "",
        id_storage: "",
        purchase_date: null,
        end_date: null,
        id_measure: "",
      },
    },
  },
  data() {
    return {
      purchase_date: null,
      end_date: null,
    };
  },
  components: {
    VueDatePicker,
  },
  methods: {
    createShelf() {
      this.shelf_life.purchase_date = this.purchase_date.toISOString();
      this.shelf_life.end_date = this.end_date.toISOString();
      this.$emit("create", { ...this.shelf_life });
      this.shelf_life.name = "";
      this.shelf_life.quantity = "";
      this.shelf_life.storage = "";
      this.shelf_life.date_start = "";
      this.shelf_life.date_end = "";
    },
  },
  setup() {
    const store_measure = useMeasureStore();
    const store_storages = useStoragesStore();
    const store_products = useProductsStore();
    const { measures } = storeToRefs(store_measure);
    const { storages } = storeToRefs(store_storages);
    const { products } = storeToRefs(store_products);

    store_measure.fetchMeasures();
    store_storages.fetchStorages();
    store_products.fetchProducts();

    return { measures, storages, products };
  },
  updated() {
    if (this.shelf_life.purchase_date !== null) {
      let t_purchase_date = new Date(this.shelf_life.purchase_date);
      let t_end_date = new Date(this.shelf_life.end_date);
            this.purchase_date = t_purchase_date.toISOString()
            this.end_date = t_end_date.toISOString()
    }
  },
};
</script>

<style scoped></style>
