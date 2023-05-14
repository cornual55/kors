<template>
  <div class="container">
    <div class="flex gap-4">
      <router-link class="px-4 py-2 hover:bg-green rounded-lg" to="/storages"
        >Места хранения</router-link
      >
      <router-link class="px-4 py-2" to="/storage-types">Типы</router-link>
    </div>
    <top-bar
      class="-ml-4"
      :not_show="['sort', 'search', 'filter']"
      @click_create="isAdding = !isAdding"
    />
    <my-dialog v-model:show="isAdding">
      <Form @submit="func_1" class="flex [&>*]:p-4 flex-col gap-4">
        <Field name="name" type="text" placeholder="Название" />
        <my-button>Создать </my-button>
      </Form>
    </my-dialog>
    <div class="mt-5 flex">
      <!-- <sidebar class="flex-1" /> -->
      <div class="flex-1 bg-gray-100 p-8 rounded-xl overflow-hidden">
        <h1 class="text-xl font-bold">Типы места хранения</h1>
        <div class="mt-3 rounded-lg p-4 bg-gray-200/90 hover:bg-gray-300/70 transition-all flex justify-between" v-for="storage_type in storage_types">
          <div>{{ storage_type.name }}</div>
          <font-awesome-icon
            @click="deleteStorageType(storage_type.id)"
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
import { useStoragesStore } from "../stores/StoragesStore";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";
import { Form, Field } from "vee-validate";

const isAdding = ref(false);
const store = useStoragesStore();
store.fetchStorageTypes();

const { storage_types, createStorageType, deleteStorageType } = storeToRefs(store);
const func_1 = ({name}) => {
    createStorageType(name);
}


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
