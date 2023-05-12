import { defineStore } from "pinia";
import axios from "axios";

export const useUserStore = defineStore("user", {
  state: () => {
    return {
      user: {},
      token: localStorage.getItem("token"),
    };
  },
  actions: {
    async signUp(name, password, password_confirm) {
      this.user = {};
      this.user.name = "Анатолий";

      axios
        .post("/auth/sign-up", {
          name: name,
          password: password,
          password_confirm: password_confirm,
        })
        .then((res) => {
          if (!res.data.success) throw new Error("Регистрация не удалась");
          this.signIn(name, password);
          alert("Вы успешно зарегистрировались");
        })
        .catch((e) => console.log(e));
    },
    async signIn(name, password) {
      axios
        .post("/auth/login", {
          name: name,
          password: password,
        })
        .then((res) => {
          if (!res.data.success) throw new Error("Не удалось выполнить вход");
          this.user = name;
          this.token = res.data.data.access_token;
          localStorage.setItem("token", res.data.data.access_token);
        })
        .catch((e) => {
          alert("Ошибка: " + e.response.data);
        });
    },
  },
});
