import { defineStore } from "pinia";
import axios from "axios";

export const useUserStore = defineStore("user", {
  state: () => {
    return {
      user: "",
    };
  },
  actions: {
    async fetchUser() {
      return this.user;
    },
    async signUp(name, password) {
      this.user = {};
      this.user.name = "Анатолий";
      // axios
      //   .post("/auth/sign-up", {
      //     name: "cornual",
      //     password: "123456789",
      //     password_confirm: "123456789",
      //   })
      //   .then((res) => {
      //     this.user.name = res.data.name;
      //     this.user.token = res.data.token;
      //     axios.defaults.headers.authorization = "Bearer " + res.data.token;
      //   })
      //   .catch((e) => alert("Ошибка: " + e.response.data));
    },
    async signIn(name, password) {
      this.user = {};
      this.user.name = "Анатолий";
    },
  },
});
