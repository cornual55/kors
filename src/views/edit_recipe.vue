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
      <h2 class="text-2xl font-semibold">Изменение рецепта</h2>
      <Form
        class="flex flex-col gap-6 [&>div>input]:p-4 mt-5 justify-center"
        @submit="changeRecipe"
      >
        <div>
          <div>Название</div>
          <Field
            class="bg-gray-200/70 w-full"
            name="name"
            type="text"
            :rules="string_rules"
            v-model="name"
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
            v-model="description"
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
        <CompleteAutoOld
          class="-mt-5"
          v-model="selected_steps"
          :key="3"
          @click="isSteErr = false"
          placeholder="Шаги..."
          :selected="selected_steps"
          :order="true"
          :items="steps"
        ></CompleteAutoOld>
        <ErrorMessage v-if="isSteErr" class="error" name="steps" />
        Ингредиенты
        <CompleteAutoOld
          class="-mt-5"
          :key="4"
          :numeric="true"
          @click="isIngErr = false"
          v-model="ingredients"
          :selected="ingredients"
          placeholder="Ингредиенты..."
          :items="products"
        ></CompleteAutoOld>
        <ErrorMessage v-if="isIngErr" class="error" name="ingredients" />

        <my-button class="mb-5">Изменить</my-button>
        <ErrorMessage
          v-click-outside="() => (isSubErr = false)"
          v-if="isSubErr"
          class="error"
          name="submit"
        />
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
import { useRoute, useRouter } from "vue-router";
import * as yup from "yup";

import CompleteAutoOld from "../components/CompleteAutoOld.vue";

let router = useRouter();
let route = useRoute();

let current_id = route.params.id;
let name = ref("");
let description = ref("");
let ingredients = ref([]);
let l_ingredients = ref([])
let selected_steps = ref([]);

let store = useRecipesStore();

store.getRecipeById(current_id).then((res) => {
  name = res.name;
  description = res.description;
  selected_steps = res.steps;
});

store.getRecipeIngredients(current_id).then((res) => {
  ingredients = res;
  l_ingredients = [...ingredients]
  ingredients.forEach((ingr) => {
    ingr.id_product = ingr.product.id;
    ingr.id_measure = ingr.measure.id;
    ingr.name = ingr.product.name;
    delete ingr.product;
    delete ingr.measure;
  });
});

let isIngErr = ref(false);
let isSteErr = ref(false);
let isSubErr = ref(false);

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

async function changeRecipe(values, actions) {
  if (ingredients.length === 0) {
    isIngErr = true;
    actions.setFieldError(
      "ingredients",
      "Нужно выбрать хотя бы один ингредиент"
    );
    return;
  }

  if (selected_steps.length === 0) {
    isSteErr = true;
    actions.setFieldError("steps", "Нужно выбрать хотя бы один шаг");
    return;
  }

  ingredients.forEach((ingr) => {
    delete ingr.name;
  });
  for (var i = 0; i < selected_steps.length; i++) {
    selected_steps[i].place = i + 1;
  }
  var res1 = store.updateRecipe(current_id, { description, name });
  if (!res1) {
    actions.setFieldError("submit", "Не удалось изменить рецепт");
    return;
  }
  for (var ingr of l_ingredients) {
    var t_res1 = await store.deleteRecipeIngredient(current_id, ingr.id_product)
    if (!t_res1) {
      actions.setFieldError("submit", "Не удалось изменить рецепт");
      return;
    }
  }
  for (var ingr of ingredients) {
    var t_res2 = await store.addRecipeIngredient(current_id, ingr);
    if (!t_res2) {
      actions.setFieldError("submit", "Не удалось изменить рецепт");
      return;
    }
  }
  for (var step of selected_steps) {
    var t_res = await store.deleteRecipeStep(current_id, step.id, step.place);
    var t_res2 = await store.addRecipeStep(current_id, step);
    if (!t_res && !t_res2) {
      actions.setFieldError("submit", "Не удалось изменить рецепт");
      return;
    }
  }
  actions.resetForm();
  ingredients = ref([]);
  selected_steps = ref([]);
  router.push("/recipes");
}
</script>

<style scoped></style>
