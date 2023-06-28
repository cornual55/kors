<template>
  <div class="container bg-gray-100 p-10 rounded-xl">
    <h1 class="text-2xl">{{ product.name }}</h1>
    <p>{{ product.description }}</p>
    <h2 class="text-lg mt-1 mb-3">Советы:</h2>
    <ul class="spisok space-y-5 tips">
      <Form v-if="isAdmin" @submit="addTip">
        <div class="relative">
          <button class="absolute w-9 mt-1 right-2">
            <svg
              class="cursor-pointer hover:bg-gray-400/40 inline"
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
          </button>
          <Field
            class="p-[0.7rem] w-full bg-inherit focus-visible:outline-none"
            name="description"
            placeholder="Добавить совет"
            type="text"
          />
        </div>
        <ErrorMessage name="description" class="error p-3" />
      </Form>
      <li v-for="tip in tips" :key="tip.id">
        {{ tip.description }}
        <font-awesome-icon
          v-if="isAdmin"
          @click="
            store.deleteTip(route.params.id, tip.id).then((res) => {
              router.go();
            })
          "
          :icon="['far', 'trash-can']"
          class="float-right transition-all -mt-[0.1rem] mr-[0.3rem]  text-2xl cursor-pointer hover:text-gray-700"
        />
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useProductsStore } from "../stores/ProductsStore";
import { useUserStore } from "../stores/UserStore";
import { useTipsStore } from "../stores/TipsStore";
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";
import { Form, Field, ErrorMessage } from "vee-validate";
const product = ref("");

const router = useRouter();
const { isAdmin } = storeToRefs(useUserStore());
const store = useProductsStore();
const store_tips = useTipsStore();
const route = useRoute();
const tips = ref([]);
onMounted(async () => {
  let id = route.params.id;
  product.value = await store.getProductById(id);
  tips.value = await store.getProductTips(id);
});

const addTip = async (tip, actions) => {
  let tip_n = await store_tips.createTip(tip);
  if (tip_n) {
    store.addTip(route.params.id, tip_n.id);
    tips.value.push(tip_n);
  } else {
    actions.setFieldError("description", "не удалось создать совет");
  }
};
/* console.log(GetProductById(1)) */
</script>

<style lang="postcss" scoped>
.tips > li {
  padding: 0.7rem;
}

.spisok > * {
  @apply bg-gray-200/90 hover:bg-gray-300/60;
}
</style>
