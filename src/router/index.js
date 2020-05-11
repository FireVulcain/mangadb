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
        path: "/manga/trending",
        name: "Trending",
        component: () => import("../views/Trending"),
    },
    {
        path: "/manga/popular",
        name: "Popular",
        component: () => import("../views/Popular"),
    },
    {
        path: "/manga/top-manhwa",
        name: "Manhwa",
        component: () => import("../views/Manhwa"),
    },
    {
        path: "/manga/:id(\\d+)/:name",
        name: "Manga",
        component: () => import("../views/Manga"),
    },
    {
        path: "/manga/:id(\\d+)/:name/:data",
        name: "MangaMore",
        component: () => import("../views/Manga"),
    },
    {
        path: "/search/manga",
        name: "SearchPage",
        component: () => import("../views/Search"),
    },
];
const router = new VueRouter({
    mode: "history",
    routes,
    scrollBehavior(to, from) {
        if (to.params.data || from.params.data) return;
        return { x: 0, y: 0 };
    },
});

export default router;
