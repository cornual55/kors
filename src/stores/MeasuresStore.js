import { defineStore } from "pinia";
import axios from "axios";

export const useMeasureStore = defineStore("measures", {
  state: () => ({
    measures: []
  }),
  actions: {
    async fetchMeasures() {
      axios
        .get("/measures")
        .then((res) => {
          if (res.status != 200) {
            throw new Error();
          }
          console.log("YES YES YES")
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
