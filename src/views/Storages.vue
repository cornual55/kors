<template>
  <div
    class="container mt-10 grid max-sm:justify-center max-sm:gap-y-5 sm:grid-cols-2 lg:grid-cols-3 sm:gap-3"
  >
    <!-- Заметка: здесь можно использовать @submit -->
    <add-card-storage type="storage" @create="store.addStorage" v-if="user" />
    <card
      v-for="storage in storages"
      :key="storage.id"
      :title="storage.storage"
    >
      Температура - {{ storage.temp }}°C <br />Влажность - {{ storage.hum }}%
    </card>
  </div>
</template>

<script setup>
import { useStoragesStore } from "../stores/StoragesStore";
import { useUserStore } from "../stores/UserStore";
import Card from "../components/Card.vue";
import AddCardStorage from "../components/AddCardStorage.vue";
import { storeToRefs } from "pinia";
import { ref } from "vue";
const { user } = storeToRefs(useUserStore());
const store = useStoragesStore();
store.fetchStorages();

const { storages } = storeToRefs(store);
</script>

<style scoped></style>
