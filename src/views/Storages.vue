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
      <form
        class="space-y-4 flex flex-col [&>input]:p-4 mt-5 [&>select]:p-4 mt-5"
        @submit.prevent="createStorage"
      >
        <div>Название</div>
        <input type="text" v-model="new_storage.name" placeholder="Название" />
        <div>Тип</div>
        <select v-model="new_storage.type.id">
          <option hidden disabled value="0">Выберите тип...</option>
          <option
            v-for="storage_type in storage_types"
            :key="storage_type.id"
            :value="storage_type.id"
          >
            {{ storage_type.name }}
          </option>
        </select>
        <div>Температура (°C)</div>
        <input type="text" v-model.number="new_storage.temperature" />
        <div>Влажность (%)</div>
        <input type="text" v-model.number="new_storage.humidity" />
        <my-button>Добавить</my-button>
      </form>
    </my-dialog>

    <my-dialog v-model:show="isChanging">
      <h2 class="text-xl">Изменение места хранения</h2>
      <form
        class="space-y-4 flex flex-col [&>input]:p-4 mt-5 [&>select]:p-4 mt-5"
        @submit.prevent="updateStorage"
      >
        <div>Название</div>
        <input
          type="text"
          v-model="current_storage.name"
          placeholder="Название"
        />
        <div>Тип</div>
        <select v-model="current_storage.type.id">
          <option
            v-for="storage_type in storage_types"
            :key="storage_type.id"
            :value="storage_type.id"
          >
            {{ storage_type.name }}
          </option>
        </select>
        <div>Температура (°C)</div>
        <input type="text" v-model.number="current_storage.temperature" />
        <div>Влажность (%)</div>
        <input type="text" v-model.number="current_storage.humidity" />
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

let new_storage = ref({
  id: 0,
  name: "",
  type: {
    id: 0,
  },
  temperature: 1,
  humidity: 1,
});

const updateStorage = () => {
  current_storage.id_type = current_storage.type.id;
  store.updateStorage(current_storage);

  isChanging.value = false;
};

const createStorage = () => {
  store.createStorage(new_storage.value);

  isAdding.value = false;
};

const changeStorage = async (storage) => {
  current_storage = { ...storage };
  isChanging.value = true;
  let storage_by_id = await store.getStorageById(current_storage.id);
  current_storage.type.id = storage_by_id.type.id;
};

const filter_options = ref([
  { type: "type_storage", name: "Тип места хранения", values: [] },
]);

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
