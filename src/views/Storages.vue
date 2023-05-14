<template>
  <div class="container">
    <div class="flex gap-4">
      <router-link class="px-4 py-2 " to="/storages"
        >Места хранения</router-link
      >
      <router-link class="px-4 py-2 hover:bg-green rounded-lg" to="/storage-types">Типы</router-link>
    </div>
    <top-bar v-model:search="store.search" :not_show="['create', 'tip']" @click_sort="store.sorted = !store.sorted" @click_filter="sidebarIsHidden = !sidebarIsHidden" />
    <div class="mx-auto w-fit font-bold text-xl" v-if="storages === ''">
      Данные загружаются...
    </div>
    <div class="flex" v-else>
      <sidebar :is_hidden="sidebarIsHidden">
        <Filters
          @change="
            (filter, isForAdding) =>
              isForAdding
                ? store.addFilter(filter)
                : store.removeFilter(filter)
          "
          :options="filter_options"
        />
      </sidebar>
      <!-- Заметка: здесь можно использовать @submit -->
      <div
        :class="{'rgid-cols-2': !sidebarIsHidden}"
        class="flex-1 grid max-sm:justify-center max-sm:gap-y-5 sm:grid-cols-2 lg:grid-cols-3 sm:gap-3"
      >
        <add-card-storage @create="store.createStorage" v-if="user" />
        <card
          v-for="storage in store.SearchedFilteredAndSortedStorages"
          :key="storage.id"
          :title="storage.name"
          @delete="store.deleteStorage(storage.id)"
          @edit="
            current_storage = { ...storage };
            isChanging = true;
          "
        >
          Температура - {{ storage.temperature }}°C <br />Влажность -
          {{ storage.humidity }}%<br />
          Тип места: {{ storage.type }}
        </card>
        <my-dialog v-model:show="isChanging">
          <form
            class="space-y-4 flex flex-col [&>input]:p-4 mt-5 [&>select]:p-4 mt-5"
            @submit.prevent='updateStorage'
          >
            <div>Название</div>
            <input
              type="text"
              v-model="current_storage.name"
              placeholder="Название"
            />
            <div>Тип</div>
            <select v-model="current_storage.id_type">
              <option value="current_storage." disabled>{{ current_storage.type }}</option>
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
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStoragesStore } from "../stores/StoragesStore";
import { useUserStore } from "../stores/UserStore";
import Card from "../components/Card.vue";
import AddCardStorage from "../components/AddCardStorage.vue";
import TopBar from "../components/TopBar.vue";
import Sidebar from "../components/Sidebar.vue";
import Filters from "../components/Filters.vue";
import { storeToRefs } from "pinia";
import { ref, onMounted } from "vue";
const { user } = storeToRefs(useUserStore());

const store = useStoragesStore();
const current_storage = ref({});
const isChanging = ref(false);
const sidebarIsHidden = ref(true);
const { storages, storage_types, filteredStorages } = storeToRefs(store);

const updateStorage = () => {
  store.updateStorage(current_storage.value)

    isChanging.value = false;

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
