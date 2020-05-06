<template>
    <div class="content container">
        <SidebarManga :mangaInfo="mangaInfo" />
        <Overview v-if="dataParm == 'overview'" :mangaInfo="mangaInfo" />
        <Characters v-if="dataParm == 'characters'" />
        <Staff v-if="dataParm == 'staff'" />
        <Reviews v-if="dataParm == 'reviews'" />
    </div>
</template>

<script>
import SidebarManga from "./Sidebar/SidebarManga";
import Overview from "./Overview";
import Characters from "./Characters";
import Staff from "./Staff";
import Reviews from "./Reviews";

export default {
    name: "ContentManga",
    props: ["mangaInfo"],
    data() {
        return {
            dataParm: "",
            data: [],
        };
    },
    components: {
        SidebarManga,
        Overview,
        Characters,
        Staff,
        Reviews,
    },
    created() {
        let params = this.$route.params.data;
        if (params) {
            return this.switchOnParam(params);
        } else {
            return (this.dataParm = "overview");
        }
    },
    watch: {
        $route(to) {
            let params = to.params.data;
            if (params) {
                return this.switchOnParam(params);
            }
            return (this.dataParm = "overview");
        },
    },
    methods: {
        switchOnParam(params) {
            switch (params) {
                case "characters":
                    this.dataParm = "characters";
                    break;
                case "staff":
                    this.dataParm = "staff";
                    break;
                case "reviews":
                    this.dataParm = "reviews";
                    break;
                default:
                    this.dataParm = "overview";
                    break;
            }
        },
    },
};
</script>

<style scoped>
.content {
    display: grid;
    grid-column-gap: 40px;
    grid-template-columns: 208px auto;
    margin-top: 30px;
    position: relative;
}
</style>
