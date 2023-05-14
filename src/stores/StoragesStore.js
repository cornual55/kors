import { defineStore } from "pinia";
import axios from "axios";

// {
// 	"name": "опажабаче",
// 	"temperature": 22,
// 	"humidity": 12,
// 	"id_type": 1
// }

export const useStoragesStore = defineStore("storages", {
  state: () => ({
    storages: "",
    storage_types: [],
    filters: [],
    sorted: true,
    search: "",
  }),
  actions: {
    async fetchStorages() {
      // this.storages = [
      //   {
      //     id: 1,
      //     storage: "Холодильник",
      //     temp: 23,
      //     hum: 56,
      //   },
      //   {
      //     id: 2,
      //     storage: "Комод",
      //     temp: 22,
      //     hum: 51,
      //   },
      // ];
      return axios
        .get("/storages")
        .then((res) => (this.storages = res.data.data.storages))
        .catch((e) => alert(e.response.data));
    },
    async fetchStorageTypes() {
      return axios
        .get("/storage-types")
        .then((res) => (this.storage_types = res.data.data.types))
        .catch((e) => alert(e.response.data));
    },
    createStorage({ name, temperature, humidity, id_type, type }) {
      let new_name = name.toLowerCase();
      axios
        .post("/storages", {
          name: new_name,
          temperature: temperature,
          humidity: humidity,
          id_type: id_type,
        })
        .then((res) => {
          if (res.status == 200) {
            this.storages.push({ name, temperature, humidity, id_type, type });
          }
        })
        .catch((e) => console.log(e));
    },
    deleteStorage(id) {
      axios
        .delete(`storages/${id}`)
        .then((res) => {
          if (res.status !== 200) {
            throw new Error();
          }
          this.storages = this.storages.filter((st) => st.id !== id);
        })
        .catch((e) => alert("Не удалось удалить"));
    },
    updateStorage({ id, name, id_type, temperature, humidity }) {
      var isSuccess = false;
      axios
        .put(`storages/${id}`, {
          name: name,
          id_type: id_type,
          temperature: temperature,
          humidity: humidity,
        })
        .then((res) => {
          if (res.status === 200) {
            isSuccess = true;
            // this.storages.forEach((st) => {
            //   if (st.id == id) {
            //     st = { id, name, id_type, temperature, humidity };
            //   }
            // });
            this.fetchStorages();
            alert("Место хранения успешно изменено");
          } else {
            throw new Error("");
          }
        })
        .catch((e) => alert("Не удалось изменить"));
      return isSuccess;
    },
    deleteStorageType(id) {
      axios.delete("/storage-types/" + id).then((res) => {
        if (res.status == 200) {
          alert("успешно удалено");
          this.fetchStorageTypes();
        }
      });
    },
    createStorageType(name) {
      axios
        .post("/storages-types/", {
          name: name,
        })
        .then((res) => {
          if (res.status == 200) {
            alert("Успешно создан");
            this.fetchStorageTypes();
          }
        });
    },
    addFilter(filter) {
      this.filters.push(filter);
    },
    removeFilter(filter) {
      this.filters = this.filters.filter((x) => {
        return x.type !== filter.type && x.value !== filter.value;
      });
    },
  },
  getters: {
    // async getStorageTypeById(id) {
    //   const res = await axios.get(`/storage-types/${id}`);
    //   return res.data.data.storage_type;
    // },
    // async getStorageById(id) {
    //   const res = await axios
    //     .get("/storages/" + id)
    //     .catch((e) => alert(e.response.data));
    //   return res.data.storage;
    // },
    filteredStorages() {
      var storages = [...this.storages];
      this.filters.forEach((filter) => {
        if (filter["type"] == "type_storage") {
          storages = this.storages.filter(
            ({ type }) => type.toLowerCase() === filter.value.toLowerCase()
          );
        }
      });
      return storages;
    },
    SortedAndFilteredStorages() {
      var storages = this.filteredStorages;
      if (this.sorted) {
        storages = storages.sort((r1, r2) =>
          r1["name"]?.localeCompare(r2["name"])
        );
      } else {
        storages = storages.sort(
          (r1, r2) => -r1["name"]?.localeCompare(r2["name"])
        );
      }
      return storages;
    },
    SearchedFilteredAndSortedStorages() {
      return this.SortedAndFilteredStorages.filter((x) =>
        x.name.toLowerCase().includes(this.search.toLocaleLowerCase())
      );
    },
  },
});
