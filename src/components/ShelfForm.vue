<template>
  <div>
    <h1 class="text-lg font-semibold"><slot></slot></h1>
    <my-dialog v-model:show="isAdding">
      <Form
        @submit="
          (values) => {
            store_products.createProduct(values);
            isAdding = false;
          }
        "
        class="flex [&>*]:p-4 flex-col gap-4"
      >
        <Field name="name" type="text" placeholder="Название продукта" />
        <!-- <Field name="category" as="select">
          <option value="Категория продукта" disabled></option>
        </Field> -->
        <my-button>Создать </my-button>
      </Form>
    </my-dialog>

    <form
      class="space-y-4 flex flex-col [&>*]:p-4 mt-5"
      @submit.prevent="createShelf"
    >
      <div
        class="w-full flex justify-center items-center"
        style="padding: 0 !important"
      >
        <select
          class="p-4 float-left w-full"
          v-model.number="shelf_life.id_product"
        >
          <option value="" disabled selected>Продукт</option>
          <option
            v-for="product in products"
            :key="product.id"
            :value="product.id"
          >
            {{ product.name }}
          </option>
        </select>
        <div
          v-show="isAdmin"
          class="cursor-pointer ml-1 w-12 float-right transition-all"
          @click="isAdding = true"
        >
          <svg
            clip-rule="evenodd"
            fill-rule="evenodd"
            stroke-linejoin="round"
            stroke-miterlimit="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m21 3.998c0-.478-.379-1-1-1h-16c-.62 0-1 .519-1 1v16c0 .621.52 1 1 1h16c.478 0 1-.379 1-1zm-16.5.5h15v15h-15zm6.75 6.752h-3.5c-.414 0-.75.336-.75.75s.336.75.75.75h3.5v3.5c0 .414.336.75.75.75s.75-.336.75-.75v-3.5h3.5c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-3.5v-3.5c0-.414-.336-.75-.75-.75s-.75.336-.75.75z"
              fill-rule="nonzero"
            />
          </svg>
        </div>
      </div>

      <input
        v-model.number="shelf_life.quantity"
        type="text"
        @keypress="isNumber"
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
      <div class="w-full" style="padding: 0 !important">
        <div class="mb-1">Найти дату по фото</div>
        <input
          @change="photoChange"
          name="fileToDetect"
          type="file"
          placeholder="Загрузить фото"
        />
      </div>
      <div class="w-full" style="padding: 0 !important">
        <span> Дата изготовления: </span>
        <VueDatePicker
          style="padding: 0 !important"
          class="p-0 w-full"
          :clearable="false"
          placeholderДата
          изготовлен="Дата изготовления"
          locale="ru"
          format="dd.MM.yyyy"
          :enable-time-picker="false"
          auto-apply
          v-model="purchase_date"
          required
        ></VueDatePicker>
      </div>
      <div class="w-full" style="padding: 0 !important">
        <span>Годен до:</span>
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
      </div>
      <!-- <input
        v-model="product.date_end"
        type="text"
        placeholder="Дата окончания"
      /> -->
      <my-button type="submit">{{ button_caption }}</my-button>
      <!--<div v-if="error" class="error text-sm">{{ error }}</div>-->
    </form>
  </div>
</template>

<script>
import { useMeasureStore } from "../stores/MeasuresStore";
import { useStoragesStore } from "../stores/StoragesStore";
import { useProductsStore } from "../stores/ProductsStore";
import { useShelfLivesStore } from "../stores/ShelfLivesStore.js";
import { useUserStore } from "../stores/UserStore";
import { storeToRefs } from "pinia";
import { Field, Form } from "vee-validate";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

export default {
  props: {
    shelf_life: {
      default: {
        id_product: "",
        quantity: "",
        id_storage: "",
        purchase_date: new Date(),
        end_date: new Date(),
        id_measure: "",
      },
    },

        button_caption: ""
  },
  data() {
    return {
      purchase_date: null,
      end_date: null,
      isAdding: false,
      isShow: false,
      error: "",
    };
  },
  components: {
    VueDatePicker,
    Field,
    Form,
  },
  methods: {
    async photoChange(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      var formData = new FormData();
      formData.append("fileToDetect", files[0]);
      const res = await this.store_shelf.detectShelfDates(formData);
      if (res.error) {
        alert(res.error);
        return;
      }
      this.purchase_date = res.data[0];
      this.end_date = res.data[1];
    },
    createShelf() {
      this.error = ""
      if (new Date() - this.end_date > 0) {
        alert("Продукт уже истек")
        return false;
      }
      if (this.purchase_date > this.end_date) {
        alert("Дата начала не может быть больше даты окончания")
        return false;
      }
      this.shelf_life.purchase_date = this.purchase_date.toISOString();
      this.shelf_life.end_date = this.end_date.toISOString();
      this.$emit("create", { ...this.shelf_life });
      this.shelf_life.name = "";
      this.shelf_life.quantity = "";
      this.shelf_life.storage = "";
      this.shelf_life.date_start = "";
      this.shelf_life.date_end = "";
    },
    isNumber(evt) {
      var charCode = evt.keyCode;
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        evt.preventDefault();
      }
      return true;
    },

  },
  setup() {
    const store_measure = useMeasureStore();
    const store_storages = useStoragesStore();
    const store_products = useProductsStore();
    const store_shelf = useShelfLivesStore();
    const store_user = useUserStore();
    const { isAdmin } = storeToRefs(store_user);
    const { measures } = storeToRefs(store_measure);
    const { storages } = storeToRefs(store_storages);
    const { products } = storeToRefs(store_products);

    store_measure.fetchMeasures();
    store_storages.fetchStorages();
    store_products.fetchProducts();

    const addProduct = (product) => {
      store_products.createProduct();
    };

    return { measures, storages, products, store_products, store_shelf, isAdmin };
  },
  updated() {
    if (this.shelf_life.purchase_date !== undefined) {
      this.purchase_date = new Date(this.shelf_life.purchase_date);
      this.end_date = new Date(this.shelf_life.end_date);
      delete this.shelf_life.purchase_date;
      delete this.shelf_life.end_date;
    }
  },
};
</script>

<style lang="postcss" scoped></style>
