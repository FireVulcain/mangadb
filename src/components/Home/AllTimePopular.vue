<template>
    <div>
        <h3 class="title">
            <a href="/popular" class="link">
                All Time Popular
                <div class="expand">View All</div>
            </a>
        </h3>

        <div class="results">
            <div class="media-card" :key="data.id" v-for="data in allTimePopular">
                <a :href="`/manga/${data.id}`" class="cover">
                    <img :src="`${data.coverImage.extraLarge}`" class="image" alt="" />
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
export default {
    name: "AllTimePopular",
    props: ["allTimePopular"],
    components: {
        HoverManga,
    },
};
</script>
<style scoped src="./../../assets/css/mediaCardRow.css"></style>
