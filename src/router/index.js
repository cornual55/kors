import { createRouter, createWebHistory } from "vue-router";
import Home from '../views/Home.vue'

const routes = [
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
];

const router = createRouter({
  history: createWebHistory('/kors/'),
  routes,
});

export default router;
