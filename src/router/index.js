import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Recipes from "../views/Recipes.vue";
import ShelfLives from "../views/ShelfLives.vue";
import RecipeDetail from "../views/RecipeDetail.vue";
import ProductDetail from "../views/ProductDetail.vue";
import Storages from "../views/Storages.vue";
import SignUp from "../views/SignUp.vue";
import LogIn from "../views/LogIn.vue";
import NotFound from "../views/NotFound.vue";
import { useUserStore } from "../stores/UserStore";
import Tips from "../views/Tips.vue";
import Products from "../views/Products.vue";
import StorageTypes from "../views/StorageTypes.vue";

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
    path: "/shelf-lives",
    name: "ShelfLives",
    component: ShelfLives,
    meta: {
      requiresAuth: true,
    },
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
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/sign-up",
    name: "SignUp",
    component: SignUp,
  },
  {
    path: "/login",
    name: "Login",
    component: LogIn,
  },
  {
    path: "/404",
    component: NotFound,
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/404",
  },
  {
    path: "/tips",
    component: Tips,
    name: "Tips",
  },
  {
    path: "/products",
    component: Products,
    name: "Products",
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/storage-types",
    component: StorageTypes,
    name: "StorageTypes",
    meta: {
      requiresAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory("/kors/"),
  routes,
});

router.beforeEach((to, from, next) => {
  const user_store = useUserStore();
  user_store.fetchCurrentUser();
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (user_store.user == "") {
      next({
        name: "Login",
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
