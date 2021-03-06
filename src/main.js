import Vue from "vue";
import App from "./App.vue";
import VueLazyload from "vue-lazyload";
import VueYouTubeEmbed from "vue-youtube-embed";
import vueHeadful from "vue-headful";
import ScrollLoader from "vue-scroll-loader";
import VTooltip from "v-tooltip";
import vueTopprogress from "vue-top-progress";

import router from "./router/";

Vue.use(VueLazyload);
Vue.use(VueYouTubeEmbed);
Vue.use(ScrollLoader);
Vue.use(VTooltip);
Vue.use(vueTopprogress);

Vue.component("vue-headful", vueHeadful);

Vue.config.productionTip = false;

Vue.filter("capitalize", function(value) {
    if (!value) return "";
    value = value.toString().toLowerCase();
    return value.charAt(0).toUpperCase() + value.slice(1);
});
Vue.filter("clean", function(value) {
    if (!value) return "";
    return value.toLowerCase().replace(/_/g, " ");
});

new Vue({
    router,
    render: (h) => h(App),
}).$mount("#app");
