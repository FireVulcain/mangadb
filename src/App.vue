<template>
    <div id="app">
        <div class="page-content">
            <div class="container">
                <div class="landing">
                    <TrendingNow class="landing-section trending" :trendingNow="this.trendingNow.media" />
                    <AllTimePopular class="landing-section popular" :allTimePopular="this.allTimePopular.media" />
                    <PopularManhwa class="landing-section manhwa" :popularManhwa="this.popularManhwa.media" />
                    <TopTen class="landing-section top" :topTen="this.topTen.media" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import QUERY from "./query/query";

/** Components */
import TrendingNow from "./components/Home/TrendingNow";
import AllTimePopular from "./components/Home/AllTimePopular";
import PopularManhwa from "./components/Home/PopularManhwa";
import TopTen from "./components/Home/TopTen";

export default {
    name: "App",
    data() {
        return {
            trendingNow: [],
            allTimePopular: [],
            popularManhwa: [],
            topTen: [],
        };
    },
    components: {
        TrendingNow,
        AllTimePopular,
        PopularManhwa,
        TopTen,
    },
    created() {
        this.fetchData();
    },
    methods: {
        fetchData() {
            axios({
                url: "https://graphql.anilist.co",
                method: "POST",

                data: {
                    query: QUERY,
                    variables: {
                        nextSeason: "SUMMER",
                        nextYear: 2020,
                        season: "SPRING",
                        seasonYear: 2020,
                        type: "MANGA",
                    },
                },
            })
                .then((result) => {
                    const { manhwa, popular, top, trending } = result.data.data;
                    this.trendingNow = trending;
                    this.allTimePopular = popular;
                    this.popularManhwa = manhwa;
                    this.topTen = top;
                })
                .catch((err) => console.log(err));
        },
    },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Overpass:wght@400;600;700;800&display=swap");
@import "./assets/css/variables.css";
@import "./assets/css/app.css";
</style>
