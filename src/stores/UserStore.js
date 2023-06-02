import { defineStore } from "pinia";
import axios from "axios";
import jwtDecode from "jwt-decode";

export const useUserStore = defineStore("user", {
  state: () => {
    return {
      user: "",
      isLoggedIn: false,
      isAdmin: false,
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
        axios.get(`/users/${decoded.user_id}/roles`).then((res) => {
          var arr = Object.entries(res.data.data.roles);
          if (arr.find((x) => x[1].id === 2)) {
            this.isAdmin = true;
          }
        });
        this.user.name = decoded.username;
        this.user.id = decoded.user_id;
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
          this.user.name = decoded.username;
          this.user.id = decoded.user_id;
          axios.defaults.headers.post["Authorization"] =
            "Bearer " + res.data.data.access_token;
          axios.defaults.headers.delete["Authorization"] =
            "Bearer " + res.data.data.access_token;
          axios.defaults.headers.put["Authorization"] =
            "Bearer " + res.data.data.access_token;
          document.cookie = `access_token=${res.data.data.access_token}; max-age=900; path=/;`;
          // document.cookie = `refresh_token=${res.data.data.refresh_token}`;
          axios.get(`/users/${decoded.user_id}/roles`).then((res) => {
            var arr = Object.entries(res.data.data.roles);
            if (arr.find((x) => x[1].id === 2)) {
              this.isAdmin = true;
            }
          });
          this.isLoggedIn = true;
          return true;
        })
        .catch((e) => {
          return { error: "Логин или пароль неверны" };
        });
    },
    async logout() {
      document.cookie = "access_token=; max-age=-1; path=/;";
      this.user = "";
      this.isLoggedIn = false;
      this.isAdmin = false;
    },
  },
});
