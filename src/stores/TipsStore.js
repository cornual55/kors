import { defineStore } from "pinia";
import axios from "axios";

export const useTipsStore = defineStore("tips", {
  state: () => ({
    tips: [],
    limit: 30,
    filters: [],
    sorted: true,
    search: ""
  }),
  actions: {
    async createTip(tip) {
      return axios
        .post("/tips", {
          description: tip.description,
        })
        .then((res) => {
          if (res.status == 200) {
            return res.data.data.tip;
          } else {
            return false;
          }
        })
        .catch((e) => {
          return false;
        });
    },
    async fetchTips() {
      return axios.get(`/tips?limit=${this.limit}`).then((res) => {
        if (res.status === 200) {
          this.tips = res.data.data.tips;
        }
      });
    },
    async deleteTip(tip_id) {
      return axios.delete(`/tips/${tip_id}`).then((res) => {
        if (res.status === 200) {
          alert("Совет успешно удален");
          this.fetchTips();
          return true;
        }
      })
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
    filteredTips() {
      var tips = [...this.tips];
      // this.filters.forEach((filter) => {
      //   if (filter["type"] == "storage") {
      //     storages = this.storages.filter(
      //       ({ type }) => type.name.toLowerCase() === filter.value.toLowerCase()
      //     );
      //   }
      // });
      return tips;
    },
    SortedAndFilteredTips() {
      var tips = this.filteredTips;
      if (this.sorted) {
        tips = tips.sort((r1, r2) =>
          r1["description"]?.localeCompare(r2["description"])
        );
      } else {
        tips = tips.sort(
          (r1, r2) => -r1["description"]?.localeCompare(r2["description"])
        );
      }
      return tips;
    },
    SearchedFilteredAndSortedTips() {
      return this.SortedAndFilteredTips.filter((x) =>
        x.description.toLowerCase().includes(this.search.toLocaleLowerCase())
      );
    },
  },
});
