<template>
  <div class="container">
    <div class="flex gap-4">
      <!--<my-button>Добавить категорию</my-button>
      <my-button @click="isAdding = !isAdding"
        >Добавить срок годности</my-button
      >-->
      <router-link class="px-4 py-2" to="/shelf-lives"
        >Сроки годности</router-link
      >
      <router-link class="px-4 py-2 hover:bg-green rounded-lg" to="/products"
        >Продукты</router-link
      >
      <router-link class="px-4 py-2 hover:bg-green rounded-lg" to="/categories">Категории</router-link>
    </div>
    <my-dialog v-model:show="isAdding">
      <shelf-form @create="createShelf" button_caption="Добавить">Добавление срока годности</shelf-form>
      <shelf-form-create />
    </my-dialog>
    <my-dialog v-model:show="isChanging"
      ><shelf-form
        :shelf_life="current_shelf"
        @create="updateShelf"
        :button_caption="'Изменить'"
        
        >Изменение срока годности</shelf-form
      ></my-dialog
    >
    <top-bar class="-ml-4" :not_show="['sort', 'tip', 'filter', 'search']" @click_create="isAdding = !isAdding" />
    <div class="mx-auto w-fit font-bold text-xl flex flex-col items-center gap-3" v-if="shelf_lives.length === 0">
      Вы еще не добавили не одного срока годности
      <my-button @click="isAdding = !isAdding" class="w-36">Добавить</my-button>
    </div>
    <div class="mt-5 flex" v-else>
      <!-- <sidebar class="flex-1" /> -->
      <table class="flex-1 rounded-xl overflow-hidden">
        <!-- <caption>
          Продукты
        </caption> -->
        <tr>
          <th>Продукт</th>
          <th>Кол-во</th>
          <th>Место хранения</th>
          <th>Дата изготовления</th>
          <th>Годен до</th>
          <th>Статус</th>
          <th>Изменить</th>
          <th>Удалить</th>
          <th>Просмотр</th>
        </tr>
        <tr v-for="shelf_life in shelf_lives" :key="shelf_life.id">
          <td class="hover:underline cursor-pointer" @click="this.$router.push('/products/'+shelf_life.product.id)">{{ shelf_life.product.name }}</td>
          <td>{{ shelf_life.quantity }} {{ shelf_life.measure.name }}</td>
          <td>{{ shelf_life.storage.name }}</td>
          <td>
            {{
              new Date(shelf_life.purchase_date).toLocaleString("ru", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            }}
          </td>
          <td>
            {{
              new Date(shelf_life.end_date).toLocaleString("ru", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            }}
          </td>
          <td v-if="shelf_life.purchase_date >= shelf_life.end_date">Подошел к концу</td>
          <td v-else-if="Math.floor((shelf_life.purchase_date - shelf_life.end_date) / (1000 * 60 * 60 * 24)) < 3">Подходит к концу</td>
          <td>Годен</td>
          <td style="text-align: center !important">
            <font-awesome-icon
              @click="
                current_shelf = { ...shelf_life };
                current_shelf.id_product = shelf_life.product.id;
                current_shelf.id_measure = shelf_life.measure.id;
                current_shelf.id_storage = shelf_life.storage.id;
                isChanging = true;
              "
              :icon="['far', 'pen-to-square']"
              class="text-gray-700/70 transition-all text-2xl cursor-pointer hover:text-gray-700"
            />
          </td>
          <td style="text-align: center !important">
            <font-awesome-icon
              @click="store.deleteShelf(shelf_life.id)"
              :icon="['far', 'trash-can']"
              class="text-gray-700/70 transition-all text-2xl cursor-pointer hover:text-gray-700"
            />
          </td>
          <td style="text-align: center !important">
            <font-awesome-icon
              @click="this.$router.push('/shelf_lives/'+shelf_life.id)"
              :icon="['far', 'eye']"
              class="text-gray-700/70 transition-all text-2xl cursor-pointer hover:text-gray-700"
            />
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import Sidebar from "../components/Sidebar.vue";
import ShelfForm from "../components/ShelfForm.vue";
import { useShelfLivesStore } from "../stores/ShelfLivesStore";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { useStoragesStore } from "../stores/StoragesStore";
import { useUserStore } from "../stores/UserStore";;
import TopBar from "../components/TopBar.vue";

export default {
  data() {
    return {
      isAdding: false,
      isChanging: false,
      current_shelf: {},
    };
  },
  components: {
    Sidebar,
    ShelfForm,
    TopBar,
  },
  methods: {
    createProduct(product) {
      this.isAdding = false;
      this.store.createProduct(product);
    },
    changeProduct(product) {
      this.isChanging = false;
      this.store.updateProduct(product);
    },
    createShelf(shelf) {
      this.store.createShelf(shelf);
      this.isAdding = false;
    },
    updateShelf(shelf) {
      this.store.updateShelf(shelf);
      this.isChanging = false;
    },
  },
  setup() {
    const store = useShelfLivesStore();
    const store_storages = useStoragesStore();
    const store_user = useUserStore();
    const { isAdmin } = storeToRefs(store_user);
    const { shelf_lives } = storeToRefs(store);
    store.fetchShelfs();
    /* store.fetchStorages(); */
    /* const storage_options = ref([]); */
    /* store_storages.fetchStorages(); */
    /* store_storages.storages.forEach((st) => { */
    /*   storage_options.value.push({ */
    /*     name: st.name, */
    /*     value: st.id, */
    /*   }); */
    /* }); */

    return { shelf_lives, store, isAdmin };
  },
};
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
