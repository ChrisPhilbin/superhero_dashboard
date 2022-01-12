import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import SuperheroDashboard from "../components/superheros/SuperHeroDashboard.vue";
import SuperHeroDetailsPage from "../components/superheros/SuperHeroDetailsPage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "SuperHeroDashboard",
    component: SuperheroDashboard,
  },
  {
    path: "/superheros/:id",
    name: "SuperHeroDetailsPage",
    component: SuperHeroDetailsPage,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
