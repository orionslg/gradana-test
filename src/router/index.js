import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/task1"
  },
  {
    path: "/task1",
    name: "Task1",
    component: () => import("../views/TaskOne.vue")
  },
  {
    path: "/task2",
    name: "Task2",
    component: () => import("../views/TaskTwo.vue")
  },
  {
    path: "/task3",
    name: "Task3",
    component: () => import("../views/TaskThree.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  linkActiveClass: "active",
  routes
});

export default router;
