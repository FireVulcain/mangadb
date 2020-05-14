<template>
    <div>
        <h3 class="title">Top 10 Manga</h3>
        <SkeletonColumn v-if="!topTen" :data="topTen" />
        <div v-else class="results table">
            <div class="media-card has-rank" :key="data.id" v-for="(data, index) in topTen">
                <div class="rank circle">
                    <span class="hash">#</span>
                    {{ index + 1 }}
                </div>
                <router-link :to="{ name: 'Manga', params: { id: data.id, name: data.title.userPreferred.replace(/ /g, '-') } }" class="cover">
                    <img v-lazy="data.coverImage.large" class="image" alt />
                </router-link>
                <div class="content">
                    <div class="row title">
                        <div class="title-wrap">
                            <router-link :to="{ name: 'Manga', params: { id: data.id, name: data.title.userPreferred.replace(/ /g, '-') } }">
                                {{ data.title.userPreferred }}
                            </router-link>
                        </div>
                        <div class="genres">
                            <a :key="index" v-for="(genre, index) in data.genres" :href="`/manga/${genre}`">{{ genre }}</a>
                        </div>
                    </div>
                    <div class="row score">
                        <custom-icon v-if="data.averageScore >= 75" name="smile" color="rgb(var(--color-green))" />
                        <custom-icon v-else-if="data.averageScore < 75 && data.averageScore >= 55" name="meh" color="rgb(var(--color-orange))" />
                        <custom-icon v-else name="frown" color="rgb(var(--color-red))" />
                        <div class="percentage">
                            {{ data.averageScore }}%
                            <div class="sub-row popularity">{{ data.popularity }} users</div>
                        </div>
                    </div>
                    <div class="row format">
                        {{ data.type | capitalize }}
                        <div class="sub-row length" v-if="data.chapters">{{ data.chapters }} chapters</div>
                    </div>
                    <div class="row date">
                        <div v-if="data.endDate.year">
                            {{ data.startDate.year }} - {{ data.endDate.year }}
                            <div class="sub-row status">{{ data.status | capitalize }}</div>
                        </div>
                        <div v-else>
                            <span class="since">Publishing since</span> {{ data.startDate.year }}
                            <div class="sub-row status">{{ data.status | capitalize }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import SkeletonColumn from "./../Skeleton/SkeletonColumn";
import customIcon from "vue-icon/lib/vue-feather.esm";
export default {
    name: "TopTen",
    props: ["topTen"],
    components: {
        SkeletonColumn,
        customIcon,
    },
};
</script>

<style scoped src="./../../assets/css/mediaCard/mediaCardColumn.css"></style>
