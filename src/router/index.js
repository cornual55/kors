import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Recipes from "../views/Recipes.vue";
import Products from "../views/Products.vue";
import RecipeDetail from "../views/RecipeDetail.vue";
import ProductDetail from "../views/ProductDetail.vue";
import Storages from "../views/Storages.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/recipes",
    name: "Recipes",
    component: Recipes,
  },
  {
    path: "/recipes/:id",
    name: "Recipe",
    component: RecipeDetail,
  },
  {
    path: "/products",
    name: "Products",
    component: Products,
  },
  {
    path: "/products/:id",
    name: "Product",
    component: ProductDetail,
  },
  {
    path: "/storages",
    name: "Storages",
    component: Storages,
  },
];

const router = createRouter({
  history: createWebHistory("/kors/"),
  routes,
});

export default router;
