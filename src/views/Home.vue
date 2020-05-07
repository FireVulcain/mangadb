<template>
    <div class="container">
        <vue-headful :title="'Search Manga • MangaDB'" />
        <div class="landing">
            <TrendingNow class="landing-section trending" :trendingNow="this.trendingNow.media" />
            <AllTimePopular class="landing-section popular" :allTimePopular="this.allTimePopular.media" />
            <PopularManhwa class="landing-section manhwa" :popularManhwa="this.popularManhwa.media" />
            <TopTen class="landing-section top" :topTen="this.topTen.media" />
        </div>
    </div>
</template>

<script>
import axios from "axios";
import { QUERY_HOME } from "./../query/query";

/** Components */
import TrendingNow from "./../components/Home/TrendingNow";
import AllTimePopular from "./../components/Home/AllTimePopular";
import PopularManhwa from "./../components/Home/PopularManhwa";
import TopTen from "./../components/Home/TopTen";

export default {
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
                    query: QUERY_HOME,
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

<style></style>
