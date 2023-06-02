import { defineStore } from "pinia";
import axios from "axios";

export const useMeasureStore = defineStore("measures", {
  state: () => ({
    measures: []
  }),
  actions: {
    async fetchMeasures() {
      axios
        .get("/measures/?limit=30")
        .then((res) => {
          if (res.status != 200) {
            throw new Error();
          }
          this.measures = res.data.data.measures;
        })
        .catch((e) => alert("Ошибка: данные введены неверно"));
    },
    createMeasure(name) {
      axios
        .post("/measures", {
          name: name,
        })
        .catch((e) => alert("Ошибка"));
    },
  },
});
