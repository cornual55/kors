<template>
  <div class="container my-10">
    <button @click="IsTable = true">Таблица |</button>
    <button @click="IsTable = false">Карточки</button>
    <div class="flex gap-3" :class="{ hidden: !IsTable }">
      <table class="min-w-full bg-white">
        <thead class="bg-gray-800 text-white">
          <tr>
            <th
              class="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm"
            >
              Рецепт
            </th>
            <th
              class="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm"
            >
              Место хранения
            </th>
            <th class="text-left py-3 px-4 uppercase font-semibold text-sm">
              Описание
            </th>
          </tr>
        </thead>
        <tbody class="text-gray-700 [&>*:nth-child(even)]:bg-gray-100">
          <tr v-for="item in current_items" :key="item.id">
            <td class="w-1/3 text-left py-3 px-4">{{ item.title }}</td>
            <td class="w-1/3 text-left py-3 px-4">{{ item.place }}</td>
            <td class="text-left py-3 px-4">
              <a class="hover:text-blue-500">{{ item.content }}</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="flex gap-3" :class="{ hidden: IsTable }">
      <div class="bg-gray-100 p-10 rounded-lg">
        <div class="divide-solid divide-black divide-y-0 flex flex-col gap-2">
          <h2 class="text-lg">Место хранения</h2>
          <div class="mt-2">
            <input
              type="checkbox"
              id="check1"
              value="комод"
              @change="FilterPlace($event)"
            />
            <label for="check1" class="p-3">Комод</label>
          </div>
          <div>
            <input type="checkbox" id="check2" value="Холодильник" />
            <label for="check2" class="p-3">Холодильник</label>
          </div>
        </div>
      </div>
      <div class="flex-1">
        <div
          class="grid max-sm:justify-center max-sm:gap-y-5 sm:grid-cols-2 lg:grid-cols-3 sm:gap-3"
        >
          <div
            class="h-full relative transition-all"
            :class="{ 'cursor-pointer': !IsAdding }"
          >
            <font-awesome-icon
              :icon="['fas', 'plus']"
              class="absolute box-border z-50 h-full w-full p-10 lg:p-20 transition-all hover:scale-150"
              @click="IsAdding = !IsAdding"
              :class="{ hidden: IsAdding }"
            />
            <div
              class="bg-green hover:scale-100 hover:drop-shadow-2xl transition-all rounded-lg h-full overflow-hidden"
              :class="{ 'blur-sm': !IsAdding }"
            >
              <input
                type="text"
                class="bg-inherit placeholder:text-gray-800 p-3 text-lg focus-visible:outline-none rounded-lg"
                v-model="title"
                placeholder="Название"
              />
              <div
                class="bg-gray-100 rounded-b-lg h-full flex flex-col justify-between"
              >
                <div class="p-5">
                  <input
                    type="text"
                    class="bg-inherit placeholder:text-gray-800 pb-3 text-xl focus-visible:outline-none"
                    v-model="place"
                    placeholder="Место хранения"
                  />
                  <input
                    type="text"
                    class="bg-inherit placeholder:text-gray-800 focus-visible:outline-none"
                    v-model="content"
                    placeholder="Описание"
                  />
                </div>
                <div class="flex justify-between">
                  <button
                    class="bg-green py-2 px-4 rounded-bl-lg hover:bg-lime-400"
                    @click="IsAdding = !IsAdding"
                  >
                    Отмена
                  </button>
                  <button
                    class="bg-green py-2 px-4 rounded-br-lg hover:bg-lime-400"
                    @click="addRecipe"
                  >
                    Добавить
                  </button>
                </div>
              </div>
            </div>
          </div>
          <card
            v-for="item in current_items"
            :title="item.title"
            :place="item.place"
            :content="item.content"
            :key="item.id"
          />
        </div>
      </div>
    </div>
    <div class="my-16 flex justify-between gap-16">
      <ul class="flex justify-center text-gray-700">
        <li
          class="transition-all hover:bg-green bg-white py-3 px-5 cursor-pointer"
        >
          &lt;&lt;
        </li>
        <router-link
          :to="`recipes?page=${num}`"
          class="transition-all hover:bg-green bg-white py-3 px-5 cursor-pointer"
          v-for="num in pages"
          :key="num"
          >{{ num }}</router-link
        >
        <li
          class="transition-all hover:bg-green bg-white py-3 px-5 cursor-pointer"
        >
          >>
        </li>
      </ul>
      <select @change="loadPage()" v-model="len" class="w-24 px-3">
        <option value="2">test 2</option>
        <option value="3">test 3</option>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>
      </select>
    </div>
  </div>
</template>

<script>
import Card from "../components/Card.vue";
import Sidebar from "../components/Sidebar.vue";

export default {
  data() {
    return {
      name: "Recipes",
      items: [
        {
          id: 50,
          title: "Бобер",
          place: "холодильник",
          content: "lorem",
        },
      ],
      len: 5,
      pages: [],
      current_items: [],
      IsAdding: false,
      title: "",
      place: "",
      content: "",
      filter_place: "",
      IsTable: false,
    };
  },
  watch: {
    len() {
      localStorage.setItem("length", this.len);
    },
    filter_place() {
      if (this.filter_place == "") {
      }
      console.log(this.items.filter((x) => x.place == this.filter_place));
      this.current_items = this.items.filter(
        (x) => x.place == this.filter_place
      );
    },
  },
  components: {
    Card,
    Sidebar,
  },
  mounted() {
    this.getLength();
    this.getItems();
  },
  created() {
    this.$watch(
      () => this.$route.query,
      (query) => {
        this.loadPage(query.page);
      }
    );
  },
  methods: {
    getItems() {
      for (var i = 1; i < 6; i++) {
        this.items.push({
          id: i,
          title: "Обычный помидор",
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lectus orci, iaculis vel blandit sed, euismod sed augue. Proin posuere turpis nisi, ac varius ipsum elementum in.",
          place: "комод",
        });
      }

      this.loadPage();
    },
    getLength() {
      if (localStorage.getItem("length")) {
        this.len = localStorage.getItem("length");
      } else {
        localStorage.setItem("length", this.len);
      }
    },
    loadPage() {
      // temp = (len*page_number)-(len*page_number-1)
      // this.items = t_items.slice((len*page_number-1), (len*page_number))
      //var totalPages = (this.items.length / this.len).toFixed();

      //for (var i = 1; i <= totalPages; i++) {
      //  this.pages.push(i);
      //}

      let page_number = 1;
      if (this.$route.query.page) {
        page_number = this.$route.query.page;
      }

      this.current_items = [];

      var slice_items = [];
      for (var i = 0; i < this.items.length; i += this.len) {
        var chunk = this.items.slice(i, i + this.len);
        slice_items.push(chunk);
      }

      this.pages = [...Array(slice_items.length).keys()].map((x) => x + 1);
      this.current_items = slice_items[page_number - 1];
    },
    addRecipe() {
      const recipe = {
        id: Date.now(),
        title: this.title,
        place: this.place,
        content: this.content,
      };

      console.log(recipe);
      this.items.push(recipe);
    },
    FilterPlace(event) {
      console.log(!event.target.checked);
      if (!event.target.checked) {
        this.filter_place = "asfaslfsa";
      }
      this.filter_place = event.target.value;
    },
  },
  computed: {},
};
</script>
