import { defineStore } from "pinia";
import axios from "axios";
import jwtDecode from "jwt-decode";

export const useUserStore = defineStore("user", {
  state: () => {
    return {
      user: "",
      isLoggedIn: false,
    };
  },
  actions: {
    async fetchCurrentUser() {
      const token = `; ${document.cookie}`
        .split("; access_token=")
        .pop()
        .split(";")
        .shift();
      if (token !== "") {
        const decoded = jwtDecode(token);
        this.user = {};
        this.user.name = decoded.sub.name;
        this.user.id = decoded.sub.id;
        axios.defaults.headers.post["Authorization"] = `Bearer ${token}`;
        axios.defaults.headers.put["Authorization"] = `Bearer ${token}`;
        axios.defaults.headers.delete["Authorization"] = `Bearer ${token}`;
        this.isLoggedIn = true;
      }
    },
    async signUp(name, password) {
      return axios
        .post("/auth/sign-up", {
          name: name,
          password: password,
          password_confirm: password,
        })
        .then((res) => {
          if (res.status != 201) throw new Error();

          alert("Вы успешно зарегистрировались");

          return true;
        })
        .catch((e) => {
          return { error: "Регистрация не удалась" };
        });
    },
    async logIn(name, password) {
      return axios
        .post("/auth/login", {
          name: name,
          password: password,
        })
        .then((res) => {
          if (res.status != 200) throw new Error("Не удалось выполнить вход");
          const decoded = jwtDecode(res.data.data.access_token);
          this.user = {};
          this.user.name = decoded.sub.name;
          this.user.id = decoded.sub.id;
          axios.defaults.headers.post["Authorization"] =
            "Bearer " + res.data.data.access_token;
          axios.defaults.headers.delete["Authorization"] =
            "Bearer " + res.data.data.access_token;
          axios.defaults.headers.put["Authorization"] =
            "Bearer " + res.data.data.access_token;
          console.log(res);
          document.cookie = `access_token=${res.data.data.access_token}`;
          document.cookie = `refresh_token=${res.data.data.refresh_token}`;
          this.isLoggedIn = true;
          return true;
        })
        .catch((e) => {
          return { error: "Логин или пароль неверны" };
        });
    },
  },
});
