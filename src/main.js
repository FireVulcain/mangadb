import Vue from "vue";
import App from "./App.vue";
import VueLazyload from "vue-lazyload";
import VueYouTubeEmbed from "vue-youtube-embed";
import vueHeadful from "vue-headful";
import ScrollLoader from "vue-scroll-loader";
import VTooltip from "v-tooltip";

import router from "./router/";

Vue.use(VueLazyload);
Vue.use(VueYouTubeEmbed);
Vue.use(ScrollLoader);
Vue.use(VTooltip);

Vue.component("vue-headful", vueHeadful);

Vue.config.productionTip = false;

Vue.filter("capitalize", function(value) {
    if (!value) return "";
    value = value.toString();
    return value.charAt(0).toUpperCase() + value.slice(1);
});

new Vue({
    router,
    render: (h) => h(App),
}).$mount("#app");
