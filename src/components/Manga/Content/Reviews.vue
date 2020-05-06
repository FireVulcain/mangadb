<template>
    <div class="media-reviews">
        <div v-if="data" class="review-wrap">
            <div class="review-card" :key="index" v-for="(review, index) in data">
                <div class="user" v-lazy:background-image="review.user.avatar.large"></div>
                <div class="content">
                    <div class="summary">{{ review.summary }}</div>
                    <div class="votes" v-tooltip.top-center="`${review.rating} out of ${review.ratingAmount} liked this review`">
                        <custom-icon name="thumbs-up"></custom-icon>
                        {{ review.rating }}
                    </div>
                </div>
            </div>
        </div>
        <scroll-loader :loader-method="fetchReview" :loader-disable="disable"> </scroll-loader>
    </div>
</template>

<script>
import axios from "axios";
import { QUERY_REVIEW } from "./../../../query/query";
import customIcon from "vue-icon/lib/vue-feather.esm";

export default {
    name: "Reviews",
    data() {
        return {
            disable: false,
            data: [],
            page: 1,
        };
    },
    components: {
        customIcon,
    },
    methods: {
        fetchReview() {
            axios({
                url: "https://graphql.anilist.co",
                method: "POST",

                data: {
                    query: QUERY_REVIEW,
                    variables: {
                        id: this.$route.params.id,
                        page: this.page,
                        type: "MANGA",
                    },
                },
            })
                .then((result) => {
                    this.data = [...this.data, ...result.data.data.Media.reviews.nodes];
                    this.disable = this.page == result.data.data.Media.reviews.pageInfo.lastPage;
                    return this.page++;
                })
                .catch((err) => console.log(err));
        },
    },
};
</script>

<style scoped src="./../../../assets/css/manga/content.css"></style>
