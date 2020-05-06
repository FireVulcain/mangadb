<template>
    <div class="rankings">
        <div class="ranking" :key="index" v-for="(ranking, index) in rankings" :class="ranking.type.toLowerCase()">
            <custom-icon v-if="ranking.type == 'RATED'" name="star" />
            <custom-icon v-if="ranking.type == 'POPULAR'" name="heart" />

            <span class="rank-text">
                #{{ ranking.rank }} {{ ranking.context }}
                <template v-if="ranking.year">{{ ranking.year }}</template>
            </span>
        </div>
    </div>
</template>

<script>
import customIcon from "vue-icon/lib/vue-feather.esm";
export default {
    name: "RankingsSidebar",
    props: ["rankings"],
    components: {
        customIcon,
    },
};
</script>

<style scoped src="./../../../assets/css/manga/sidebar.css"></style>
