import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import country from "../views/country";
import city from "../views/city.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Home,
    meta: {
      requireAuth: true,
    },
    children:[
      {
        path:'',
        name:'country-list',
        component:country,
        meta: {
          requireAuth: true,
        },
      },
      {
        path:'/city',
        name:'city-list',
        component:city,
        meta: {
          requireAuth: true,
        },
      }
    ]
  },

  {
    path: "/login",
    name: "login",
    component: () => import("../views/login.vue"),
    meta: {
      requireAuth: false,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if(to.meta.requireAuth) {
    if(localStorage.getItem('token')) next()
    else next({name:'login'})
  } else {
    if(!localStorage.getItem('token')) next()
    else next({name:'country-list'})

  }
})

export default router;
