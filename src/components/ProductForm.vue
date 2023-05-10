<template>
  <div>
    <h1 class="text-lg font-semibold"><slot></slot></h1>
    <form class="space-y-4 flex flex-col [&>*]:p-4 mt-5" @submit.prevent>
      <input
        v-model="product.name"
        type="text"
        placeholder="Название продукта"
      />
      <input v-model="product.quantity" type="text" placeholder="Количество" />
      <select v-model="product.storage">
        <option value="" disabled selected>Место хранения</option>
        <option v-for="option in storage_options" :value="{value: option.value, storage: option.name}">{{ option.name }}</option>
      </select>
      <select>
        <option disabled selected>Категория</option>
        <option>asfgkogdkfo</option>
      </select>
      <input
        v-model="product.date_start"
        type="text"
        placeholder="Дата начала"
      />
      <input
        v-model="product.date_end"
        type="text"
        placeholder="Дата окончания"
      />
      <my-button @click="createProduct">Создать</my-button>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    product: {
      default: {
        id: Date.now(),
        name: "",
        quantity: "",
        storage: "",
        date_start: "",
        date_end: "",
      },
    },
    storage_options: [],
    type: "change",
  },
  methods: {
    createProduct() {
      this.$emit("create", { ...this.product });
    },
  },
  beforeUnmount() {
    this.product.name = "";
    this.product.quantity = "";
    this.product.storage = "";
    this.product.date_start = "";
    this.product.date_end = "";
  },
};
</script>

<style scoped></style>
