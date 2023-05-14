import { defineStore } from "pinia";
import axios from "axios";

export const useTipsStore = defineStore("tips", {
  state: () => ({
    tips: [],
  }),
  actions: {
    async createTip(tip) {
      return axios
        .post("/tips", {
          description: tip.description,
        })
        .then((res) => {
          if (res.status == 200) {
            alert("Совет успешно создан");
            return res.data.data.tip;
          } else {
            return false;
          }
        })
        .catch((e) => {
          return false;
        });
    },
  },
});
