<template>
  <div class="container px-11">
    <h1 class="capitalize text-2xl font-bold">{{ recipe.name }}</h1>
    <h3 class="text-lg mt-2">Описание</h3>
    <p class="bg-gray-200/70 p-5 rounded-xl">{{ recipe.description }}</p>
    <my-dialog v-model:show="isAddingTip">
      <Form @submit="addTip" class="flex [&>*]:p-4 flex-col gap-4">
        Совет
        <Field
          name="description"
          class="-mt-3"
          as="textarea"
          :rules="string_rules"
          type="text"
          placeholder="Совет"
        />
        <ErrorMessage class="error -mt-6" name="description"></ErrorMessage>
        <my-button>Создать</my-button>
        <ErrorMessage class="error -mt-6" name="submit"></ErrorMessage>
      </Form>
    </my-dialog>
    <div class="mt-4 grid md:grid-cols-2 gap-5">
      <div class="w-full">
        <h3 class="text-lg">Ингредиенты</h3>
        <div class="bg-gray-200/70 rounded-xl h-[82%]">
          <table
            class="flex-1 w-full p-[1.1rem] overflow-hidden border-separate"
          >
            <tr
              v-for="ingredient in recipe.ingredients"
              :key="ingredient.measure.id + '' + ingredient.product.id"
            >
              <td>{{ ingredient.product.name }}</td>
              <td>{{ ingredient.quantity }} {{ ingredient.measure.name }}</td>
            </tr>
          </table>
        </div>
      </div>
      <div>
        <h3 class="text-lg">Шаги</h3>
        <div class="bg-gray-200/70 p-5 rounded-xl h-[82%]">
          <ol class="list-decimal ml-5">
            <li v-for="step in recipe.steps" :key="step.id">{{ step.name }}</li>
          </ol>
        </div>
      </div>
    </div>
    <h2 class="mt-5 text-xl font-semibold">Советы для продуктов</h2>
    <div class="grid md:grid-cols-2 gap-5">
      <div class="mt-2" v-for="ingredient in ingredients" :key="ingredient.id">
        <h3 class="text-lg">Советы {{ ingredient.name }}</h3>
        <div class="bg-gray-200/70 rounded-xl p-5">
          <ol class="list-decimal ml-5">
            <div v-if="ingredient.tips.length === 0">
              <p class="text-sm">По этому продукту еще нету советов</p>
            </div>
            <li v-else v-for="tip in ingredient.tips" :key="tip.id">
              {{ tip.description }}
              <font-awesome-icon
                v-if="isAdmin"
                @click="store_products.deleteTip(ingredient.id, tip.id).then(res => { router.go() })"
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
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { useRecipesStore } from "../stores/RecipesStore";
import { useProductsStore } from "../stores/ProductsStore";
import { useUserStore } from "../stores/UserStore";
import { useTipsStore } from "../stores/TipsStore";
import { storeToRefs } from "pinia";
import { ref, onMounted } from "vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from 'yup'
let string_rules = yup.string().required().min(5);

let route = useRoute();
let router = useRouter();
let store = useRecipesStore();
let store_products = useProductsStore();
let store_tips = useTipsStore();

let recipe = ref("");
let ingredients = ref([]);

let current_ingredient = ref({});
let isAddingTip = ref(false);

let { isAdmin } = storeToRefs(useUserStore());

const addTip = async (values, actions) => {
  let tip = await store_tips.createTip(values);
  if (!tip) {
    actions.setFieldError("submit", "не удалось добавить совет");
  }
  let res = await store_products.addTip(current_ingredient.value.id, tip.id);
  if (!res) {
    actions.setFieldError("submit", "не удалось добавить совет");
    return;
  }
  current_ingredient.value.tips.push(tip);
  actions.resetForm();
  isAddingTip.value = false;
};

onMounted(async () => {
  recipe.value = await store.getRecipeById(route.params.id);
  recipe.value.ingredients = await store.getRecipeIngredients(route.params.id);

  recipe.value.ingredients.forEach(async (ingredient) => {
    let id = ingredient.product.id;
    let name = ingredient.product.name;
    let tips = await store_products.getProductTips(id);
    ingredients.value.push({ name, id, tips });
  });
});
</script>

<style scoped></style>
