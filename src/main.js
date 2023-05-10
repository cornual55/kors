import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import components from "./components/UI";
import { createPinia } from "pinia";
/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000/api/v1";
axios.defaults.headers["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers["Content-Type"] = "application/json";

/* import specific icons */
import {
  faPlusSquare,
  faPenToSquare,
  faTrashCan,
} from "@fortawesome/free-regular-svg-icons";

import {
  faChevronUp,
  faBars,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
const pinia = createPinia();
const app = createApp(App);

library.add(
  faBars,
  faPlusSquare,
  faChevronUp,
  faPenToSquare,
  faTrashCan,
  faArrowLeft
);

components.forEach((component) => {
  app.component(component.name, component);
});

app
  .component("font-awesome-icon", FontAwesomeIcon)
  .use(pinia)
  .use(router, axios)
  .mount("#app");
