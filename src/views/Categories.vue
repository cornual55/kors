<template>
  <div class="container">
    <div class="flex gap-4">
      <router-link class="px-4 py-2 hover:bg-green rounded-lg" to="/shelf-lives"
        >Сроки годности</router-link
      >
      <router-link class="px-4 py-2 hover:bg-green rounded-lg" to="/products"
        >Продукты</router-link
      >
      <router-link class="px-4 py-2" to="/categories">Категории</router-link>
    </div>
    <top-bar
      v-if="isAdmin"
      class="-ml-4"
      :not_show="['sort', 'filter']"
      v-model:search="store.search"
      @click_create="isAdding = !isAdding"
    />
    <top-bar
      v-else
      class="-ml-4"
      :not_show="['sort', 'filter', 'create']"
      v-model:search="store.search"
      @click_create="isAdding = !isAdding"
    />
    <my-dialog v-model:show="isAdding">
      <Form
        @submit="
          (values) => {
            store.createCategory(values);
            isAdding = false;
          }
        "
        class="flex [&>*]:p-4 flex-col gap-4"
      >
        Название категории
        <Field
          name="name"
          :rules="string_rules"
          class="-mt-3"
          type="text"
          placeholder="Введите..."
        />
        <ErrorMessage class="error -mt-6" name="name"></ErrorMessage>
        <my-button>Создать </my-button>
        <ErrorMessage class="error -mt-6" name="submit"></ErrorMessage>
      </Form>
    </my-dialog>
    <div class="mt-5 flex">
      <div class="flex-1 bg-gray-100 p-8 rounded-xl overflow-hidden">
        <h1 class="text-xl font-bold">Категории</h1>
        <div
          class="mt-3 rounded-lg p-4 bg-gray-200/90 hover:bg-gray-300/70 transition-all flex justify-between"
          v-for="category in SearchedCategories"
        >
          <div>{{ category.name }}</div>
          <font-awesome-icon
            v-show="isAdmin"
            @click="store.deleteCategory(category.id);"
            :icon="['far', 'trash-can']"
            class="text-gray-700/70 transition-all text-2xl cursor-pointer hover:text-gray-700"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import TopBar from "../components/TopBar.vue";
import { useCategoriesStore } from "../stores/CategoriesStore";
import { useUserStore } from "../stores/UserStore";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import { useRouter } from "vue-router";
import * as yup from "yup";

let string_rules = yup.string().min(3).required();

const router = useRouter();
const isAdding = ref(false);
const store = useCategoriesStore();
const { SearchedCategories } = storeToRefs(store);
const { isAdmin } = storeToRefs(useUserStore());
store.fetchCategories();
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
