<template>
    <div class="media-stats">
        <div class="rankings-wrap" v-if="rankings.length">
            <h2>Rankings</h2>
            <div class="rankings graph">
                <div class="ranking" :key="index" v-for="(ranking, index) in rankings" :class="ranking.type.toLowerCase()">
                    <custom-icon v-if="ranking.type == 'RATED'" name="star" />
                    <custom-icon v-if="ranking.type == 'POPULAR'" name="heart" />

                    <span class="rank-text">
                        #{{ ranking.rank }} {{ ranking.context }}
                        <template v-if="ranking.year">{{ ranking.year }}</template>
                    </span>
                </div>
            </div>
        </div>
        <div v-if="distributionStatus" class="graph status-distribution">
            <h2>Status Distribution</h2>
            <div class="status-distribution content-wrap">
                <div class="statuses">
                    <div class="status" :key="index" v-for="(distribution, index) in distributionStatus">
                        <div class="name" :style="`background-color: ${colorStats[index]}`">{{ distribution.status | capitalize }}</div>
                        <div class="amount" :style="`color: ${colorStats[index]}`">
                            {{ distribution.amount }}
                            <span class="label">Users</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import customIcon from "vue-icon/lib/vue-feather.esm";
import axios from "axios";
import { QUERY_STATS } from "./../../../query/query";

export default {
    name: "Stats",
    data() {
        return {
            rankings: [],
            distributionStatus: [],
            colorStats: ["rgb(104, 214, 57);", "rgb(2, 169, 255);", "rgb(146, 86, 243);", "rgb(247, 121, 164);", "rgb(232, 93, 117);"],
        };
    },
    components: {
        customIcon,
    },
    created() {
        this.fetchStats();
    },
    methods: {
        fetchStats() {
            axios({
                url: "https://graphql.anilist.co",
                method: "POST",

                data: {
                    query: QUERY_STATS,
                    variables: {
                        id: this.$route.params.id,
                    },
                },
            })
                .then((result) => {
                    this.rankings = result.data.data.Media.rankings;
                    this.distributionStatus = result.data.data.Media.distribution.status.sort((a, b) => b.amount - a.amount);
                })
                .catch((err) => console.log(err));
        },
    },
};
</script>

<style scoped src="./../../../assets/css/manga/content.css"></style>
