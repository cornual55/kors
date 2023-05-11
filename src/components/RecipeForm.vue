<template>
  <div>
    <h1 class="text-lg font-semibold"><slot></slot></h1>
    <form class="space-y-4 flex flex-col [&>*]:p-4 mt-5" @submit.prevent>
      <input
        v-model="recipe.storage"
        type="text"
        placeholder="Название места хранения"
      />       <input
        v-model="product.temp"
        type="text"
        placeholder="Температура"
      />     <input
        v-model="product.hum"
        type="text"
        placeholder="Влажность"
      />
      <input v-model="product.quantity" type="text" placeholder="Количество" />
      <my-button @click="createProduct">Создать</my-button>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    recipe: {
      default: {
        id: Date.now(),
        temp: "",
        hum: "",
        storage: "",
      },
    }
  },
  methods: {
    createRecipe() {
      this.$emit("create", { ...this.product });
    },
  },
  beforeUnmount() {
    this.recipe.temp = "";
    this.recipe.hum = "";
    this.recipe.storage = "";
  },
};
</script>
