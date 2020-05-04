<template>
    <div>
        <h3 class="title">Top 10</h3>
        <SkeletonColumn v-if="!topTen" :data="topTen" />
        <div v-else class="results table">
            <div class="media-card has-rank" :key="data.id" v-for="(data, index) in topTen">
                <div class="rank circle"><span class="hash">#</span>{{ index + 1 }}</div>
                <a :href="`/manga/${data.id}`" class="cover">
                    <img v-lazy="`${data.coverImage.large}`" class="image" alt="" />
                </a>
                <div class="content">
                    <div class="row title">
                        <div class="title-wrap">
                            <a :href="`/manga/${data.id}`">{{ data.title.userPreferred }}</a>
                        </div>
                        <div class="genres">
                            <a :key="index" v-for="(genre, index) in data.genres" :href="`/manga/${genre}`">{{ genre }}</a>
                        </div>
                    </div>
                    <div class="row score">
                        <svg
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="far"
                            data-icon="smile"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 496 512"
                            color="rgb(var(--color-green))"
                            class="icon svg-inline--fa fa-smile fa-w-16 fa-fw"
                        >
                            <path
                                fill="currentColor"
                                d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 448c-110.3 0-200-89.7-200-200S137.7 56 248 56s200 89.7 200 200-89.7 200-200 200zm-80-216c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.3 32 32 32zm160 0c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.3 32 32 32zm4 72.6c-20.8 25-51.5 39.4-84 39.4s-63.2-14.3-84-39.4c-8.5-10.2-23.7-11.5-33.8-3.1-10.2 8.5-11.5 23.6-3.1 33.8 30 36 74.1 56.6 120.9 56.6s90.9-20.6 120.9-56.6c8.5-10.2 7.1-25.3-3.1-33.8-10.1-8.4-25.3-7.1-33.8 3.1z"
                                class=""
                            ></path>
                        </svg>
                        <div class="percentage">
                            {{ data.averageScore }}%
                            <div class="sub-row popularity">{{ data.popularity }} users</div>
                        </div>
                    </div>
                    <div class="row format">
                        {{ data.type.toLowerCase() | capitalize }}
                        <div class="sub-row length" v-if="data.chapters">{{ data.chapters }} chapters</div>
                    </div>
                    <div class="row date">
                        <div v-if="data.endDate.year">
                            {{ data.startDate.year }} - {{ data.endDate.year }}
                            <div class="sub-row status">
                                {{ data.status.toLowerCase() | capitalize }}
                            </div>
                        </div>
                        <div v-else>
                            Publishing since {{ data.startDate.year }}
                            <div class="sub-row status">
                                {{ data.status.toLowerCase() | capitalize }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import SkeletonColumn from "./../Skeleton/SkeletonColumn";
export default {
    name: "TopTen",
    props: ["topTen"],
    components: {
        SkeletonColumn,
    },
};
</script>

<style scoped src="./../../assets/css/mediaCard/mediaCardColumn.css"></style>
