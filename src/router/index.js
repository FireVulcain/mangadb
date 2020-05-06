import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        redirect: "/manga",
    },
    {
        path: "/manga",
        name: "Home",
        component: () => import("../views/Home"),
    },
    {
        path: "/manga/:id/:name",
        name: "Manga",
        component: () => import("../views/Manga"),
    },
    {
        path: "/manga/:id/:name/:data",
        name: "MangaMore",
        component: () => import("../views/Manga"),
    },
];
const router = new VueRouter({
    mode: "history",
    routes,
});

export default router;
