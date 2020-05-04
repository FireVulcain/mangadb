<template>
    <div>
        <h3 class="title">
            <a href="/popular" class="link">
                All Time Popular
                <div class="expand">View All</div>
            </a>
        </h3>
        <SkeletonCards v-if="!allTimePopular" :data="allTimePopular" />
        <div v-else class="results">
            <div class="media-card" :key="data.id" v-for="data in allTimePopular">
                <a :href="`/manga/${data.id}`" class="cover">
                    <img v-lazy="`${data.coverImage.extraLarge}`" class="image" alt="" />
                </a>
                <a :href="`/manga/${data.id}`" class="title">
                    {{ data.title.userPreferred }}
                </a>
                <HoverManga :data="data" />
            </div>
        </div>
    </div>
</template>

<script>
import HoverManga from "./HoverManga";
import SkeletonCards from "./../Skeleton/SkeletonCards";
export default {
    name: "AllTimePopular",
    props: ["allTimePopular"],
    components: {
        HoverManga,
        SkeletonCards,
    },
};
</script>
<style scoped src="./../../assets/css/mediaCard/mediaCardRow.css"></style>
