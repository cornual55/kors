<template>
  <div class="container">
    <div v-show="isAdmin" class="flex gap-4">
      <router-link class="px-4 py-2" to="/storages">Места хранения</router-link>
      <router-link
        class="px-4 py-2 hover:bg-green rounded-lg"
        to="/storage-types"
        >Типы</router-link
      >
    </div>
    <top-bar
      v-model:search="store.search"
      :not_show="['tip']"
      @click_sort="store.sorted = !store.sorted"
      @click_filter="sidebarIsHidden = !sidebarIsHidden"
      @click_create="isAdding = true"
    />
    <my-dialog v-model:show="isAdding">
      <h2 class="text-xl">Добавление места хранения</h2>
      <Form
        class="space-y-4 flex flex-col [&>input]:p-4 mt-5 [&>select]:p-4 mt-5"
        @submit="createStorage"
      >
        <div>Название</div>
        <Field
          :rules="string_rules"
          type="text"
          name="name"
          placeholder="Название"
        />
        <ErrorMessage class="error" name="name" />
        <div>Тип</div>
        <Field as="select" name="id_type">
          <option hidden disabled value="">Выберите тип...</option>
          <option
            v-for="storage_type in storage_types"
            :key="storage_type.id"
            :value="storage_type.id"
          >
            {{ storage_type.name }}
          </option>
        </Field>
        <ErrorMessage class="error" name="id_type" />
        <div>Температура (°C)</div>
        <Field
          :rules="number_rules"
          @keypress="isNumber"
          type="text"
          name="temperature"
        />
        <ErrorMessage class="error" name="temperature" />
        <div>Влажность (%)</div>
        <Field
          :rules="number_rules"
          @keypress="isNumber"
          type="text"
          name="humidity"
        />
        <ErrorMessage class="error" name="humidity" />
        <my-button>Добавить</my-button>
      </Form>
    </my-dialog>

    <my-dialog v-model:show="isChanging">
      <h2 class="text-xl">Изменение места хранения</h2>
      <Form
        ref="edit_form"
        class="space-y-4 flex flex-col [&>input]:p-4 mt-5 [&>select]:p-4 mt-5"
        @submit="updateStorage"
      >
        <div>Название</div>
        <Field
          name="name"
          type="text"
          :rules="string_rules"
          placeholder="Название"
        />
        <ErrorMessage class="error" name="name" />
        <div>Тип</div>
        <Field as="select" name="id_type">
          <option
            v-for="storage_type in storage_types"
            :key="storage_type.id"
            :value="storage_type.id"
          >
            {{ storage_type.name }}
          </option>
        </Field>
        <ErrorMessage class="error" name="id_type" />
        <div>Температура (°C)</div>
        <Field
          type="text"
          @keypress="isNumber"
          :rules="number_rules"
          name="temperature"
        />
        <ErrorMessage class="error" name="temperature" />
        <div>Влажность (%)</div>
        <Field
          type="text"
          name="humidity"
          :rules="number_rules"
          @keypress="isNumber"
        />
        <ErrorMessage class="error" name="humidity" />
        <my-button>Изменить</my-button>
      </form>
    </my-dialog>

    <div
      class="mx-auto w-fit font-bold text-xl flex flex-col items-center gap-3"
      v-if="storages.length === 0"
    >
      Вы еще не добавили не одного места хранения
      <my-button @click="isAdding = true" class="w-36">Добавить</my-button>
    </div>
    <div class="flex" v-else>
      <sidebar :is_hidden="sidebarIsHidden">
        <Filters
          @change="
            (filter, isForAdding) =>
              isForAdding ? store.addFilter(filter) : store.removeFilter(filter)
          "
          :options="filter_options"
        />
      </sidebar>
      <!-- Заметка: здесь можно использовать @submit -->
      <div
        :class="{ 'grid-cols-2': !sidebarIsHidden }"
        class="flex-1 grid max-sm:justify-center max-sm:gap-y-5 sm:grid-cols-2 lg:grid-cols-3 sm:gap-3"
      >
        <!--<add-card-storage @create="store.createStorage" v-if="isLoggedIn" /> -->
        <card
          v-for="storage in store.SearchedFilteredAndSortedStorages"
          :key="storage.id"
          :title="storage.name"
          :show_detail="true"
          :show_bar="isLoggedIn"
          @delete="store.deleteStorage(storage.id)"
          @edit="changeStorage(storage)"
          @detail="router.push(`/storages/${storage.id}`)"
        >
          Температура - {{ storage.temperature }}°C <br />Влажность -
          {{ storage.humidity }}%<br />
          Тип места: {{ storage.type.name }}
        </card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useStoragesStore } from "../stores/StoragesStore";
import { useUserStore } from "../stores/UserStore";
import Card from "../components/Card.vue";
import AddCardStorage from "../components/AddCardStorage.vue";
import TopBar from "../components/TopBar.vue";
import Sidebar from "../components/Sidebar.vue";
import Filters from "../components/Filters.vue";
import { storeToRefs } from "pinia";
import { ref, onMounted } from "vue";
const { user, isAdmin, isLoggedIn } = storeToRefs(useUserStore());
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

let string_rules = yup.string().required().min(3);
let number_rules = yup.number().required().positive();

const edit_form = ref(null);

const store = useStoragesStore();
let current_storage = ref({
  type: {
    id: 0,
  },
});

let router = useRouter();

let isChanging = ref(false);
let isAdding = ref(false);
let sidebarIsHidden = ref(true);
let { storages, storage_types, filteredStorages } = storeToRefs(store);

const updateStorage = (values) => {
  if (values.id_type == undefined) {
    actions.setFieldError("id_type", "Данное поле обязательно")
    return;
  }

  current_storage.id_type = current_storage.type.id;
  let id = current_storage.id
  store.updateStorage({name: values.name,  id_type: values.id_type, humidity: Number(values.humidity), temperature: Number(values.temperature), id});

  isChanging.value = false;
};

const createStorage = (values, actions) => {
  if (values.id_type == undefined) {
    actions.setFieldError("id_type", "Данное поле обязательно")
    return;
  }

  let new_storage = {
    name: values.name,
    type: {
      id: values.id_type,
    },
    temperature: Number(values.temperature),
    humidity: Number(values.humidity),
  };
  store.createStorage(new_storage);

  isAdding.value = false;
  actions.resetForm();
};

const changeStorage = async (storage) => {
  current_storage = { ...storage };
  isChanging.value = true;
  let storage_by_id = await store.getStorageById(current_storage.id);
  current_storage.type.id = storage_by_id.type.id;
  edit_form.value.setValues({
    name: current_storage.name,
    id_type: current_storage.type.id,
    temperature: current_storage.temperature,
    humidity: current_storage.humidity
  })
};

const filter_options = ref([
  { type: "type_storage", name: "Тип места хранения", values: [] },
]);

function isNumber(evt) {
  var charcode = evt.keycode;
  if (charcode > 31 && (charcode < 48 || charcode > 57) && charcode !== 46) {
    evt.preventdefault();
  }
  return true;
}

onMounted(async () => {
  store.fetchStorages();
  await store.fetchStorageTypes();

  storage_types.value.forEach((storage_type) => {
    /* console.log(storage_type); */
    filter_options.value[0].values.push({
      id: storage_type.id,
      name: storage_type.name,
      value: storage_type.name,
    });
  });
});
</script>

<style scoped></style>
