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
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/TaskOne.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  linkActiveClass: "active",
  routes
});

export default router;
