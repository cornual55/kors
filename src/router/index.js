import { createRouter, createWebHistory } from "vue-router";
import Home from '../views/Home.vue'
import Recipes from '../views/Recipes.vue'

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/recipes",
    name: "Recipes",
    component: Recipes
  }
];

const router = createRouter({
  history: createWebHistory('/kors/'),
  routes,
});

export default router;
