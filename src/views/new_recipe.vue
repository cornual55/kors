<template>
  <div>
    <div class="container mt-2">
      <div class="flex align-items-center justify-items-center gap-2">
        <font-awesome-icon
          style="font-size: 1.6rem"
          class="mb-4 cursor-pointer"
          @click="router.push(router.options.history.state.back)"
          :icon="['fas', 'arrow-left']"
        />
      </div>
      <h2 class="text-2xl font-semibold">Добавление рецепта</h2>
      <Form
        class="flex flex-col gap-6 [&>div>input]:p-4 mt-5 justify-center"
        @submit="createRecipe"
      >
        <div>
          <div>Название</div>
          <Field
            class="bg-gray-200/70 w-full"
            name="name"
            type="text"
            :rules="string_rules"
            placeholder="Название"
          />
          <ErrorMessage class="error" name="name" />
        </div>
        <div>
          <div>Описание</div>
          <Field
            class="p-4 bg-gray-200/70 w-full"
            name="description"
            as="textarea"
            type="text"
            :rules="string_rules"
            placeholder="Описание"
          />
          <ErrorMessage class="error" name="description" />
        </div>

        <!--
          <CompleteAuto
          class="md:hidden"
          v-model="selected_steps"
            placeholder="Шаги..."
            :key="1"
            :order="true"
            :items="steps"
          ></CompleteAuto>
          <CompleteAuto
            class="md:hidden"
            :numeric="true"
            :key="2"
            v-model="ingredients"
            placeholder="Продукты..."
            :items="products"
          ></CompleteAuto>

        <Field name="steps" as="select">
            <option disabled value="">Шаги</option>
            <option v-for="step in steps" :key="step.id" :value="step.id">
              {{ step.name }}
            </option>
          </Field> 
-->
        Шаги
        <CompleteAutoWithoutProp
          class="-mt-5"
          v-model="selected_steps"
          :key="3"
          @click="isSteErr = false"
          placeholder="Шаги..."
          :order="true"
          :items="steps"
        ></CompleteAutoWithoutProp>
        <ErrorMessage v-if="isSteErr" class="error" name="steps" />
        Ингредиенты
        <CompleteAutoWithoutProp
          class="-mt-5"
          :key="4"
          :numeric="true"
          @click="isIngErr = false"
          v-model="ingredients"
          placeholder="Ингредиенты..."
          :items="products"
        ></CompleteAutoWithoutProp>
        <ErrorMessage v-if="isIngErr" class="error" name="ingredients" />

        <my-button class="mb-5">Создать</my-button>
        <ErrorMessage v-click-outside="() => isSubErr = false" v-if="isSubErr" class="error" name="submit" />
      </Form>
    </div>
  </div>
</template>

<script setup>
import { Form, Field, ErrorMessage } from "vee-validate";
import { storeToRefs } from "pinia";
import { useRecipesStore } from "../stores/RecipesStore";
import { useProductsStore } from "../stores/ProductsStore";
import { useUserStore } from "../stores/UserStore";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import * as yup from "yup";

import CompleteAutoWithoutProp from "../components/CompleteAutoWithoutProp.vue"

let router = useRouter();

let isIngErr = ref(false);
let isSteErr = ref(false);
let isSubErr = ref(false);

let ingredients = ref([]);
let selected_steps = ref([]);

let store = useRecipesStore();
let store_products = useProductsStore();
let store_user = useUserStore();

let { steps } = storeToRefs(store);
store.fetchSteps();

let { user } = storeToRefs(store_user);

let { products } = storeToRefs(store_products);

onMounted(async () => {
  await store_products.fetchProducts();
  products.value.forEach((product) => {
    product.id_product = product.id;
    delete product.id;
  });
});

const string_rules = yup.string().required().min(4);

async function createRecipe(values, actions) {
  if (ingredients.value.length === 0) {
    isIngErr = true;
    actions.setFieldError(
      "ingredients",
      "Нужно выбрать хотя бы один ингредиент"
    );
    return;
  }

  if (selected_steps.value.length === 0) {
    isSteErr = true;
    actions.setFieldError("steps", "Нужно выбрать хотя бы один шаг");
    return;
  }

  ingredients.value.forEach((ingr) => {
    //delete ingr.name;
  });
  for (var i = 0; i < selected_steps.value.length; i++) {
    selected_steps.value[i].place = i + 1;
  }
  let res = await store.createRecipe({
    ...values,
    steps: selected_steps.value,
    ingredients: ingredients.value,
    id_user: user.value.id,
  });
  if (res == true) {
    actions.resetForm();
    ingredients = ref([]);
    selected_steps = ref([]);
    router.push("/recipes")
  } else {
    isSubErr = true;
    actions.setFieldError("submit", "Не удалось создать рецепт")
  }
}
</script>

<style scoped></style>
