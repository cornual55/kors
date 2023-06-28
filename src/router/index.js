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
import Steps from "../views/Steps.vue";
import RecipeNew from "../views/new_recipe.vue"
import RecipeEdit from "../views/edit_recipe.vue"
import ShelfDetail from "../views/ShelfDetail.vue"
import Categories from "../views/Categories.vue"
import StoragesDetail from "../views/StorageDetail.vue"

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
    path: "/recipes/new",
    name: "RecipeNew",
    component: RecipeNew,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/recipes/:id/edit",
    name: "RecipeEdit",
    component: RecipeEdit,
    meta: {
      requiresAuth: true,
    },
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
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/shelf_lives/:id",
    name: "ShelfDetail",
    component: ShelfDetail,
    meta: {
      requiresAuth: true,
    },
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
    path: "/storages/:id",
    name: "StoragesDetail",
    component: StoragesDetail,
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
   meta: {
      requiresAuth: true,
    },
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
    path: "/categories",
    component: Categories,
    name: "Categories",
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
  {
    path: "/steps",
    component: Steps,
    name: "Steps",
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
