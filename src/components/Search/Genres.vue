<template>
    <div class="filter filter-select">
        <div class="name">Genres</div>
        <div class="select-wrap">
            <div class="select" @click="openFilter = !openFilter" v-on-clickaway="clickAway">
                <div class="value-wrap">
                    <div class="placeholder" v-if="!selectedGenres.genres.length && !selectedGenres.tags.length">Any</div>
                    <div class="tags" v-if="selectedGenres.genres.length + selectedGenres.tags.length <= 1">
                        <div class="tag" :key="index" v-for="(genre, index) in selectedGenres.genres">{{ genre }}</div>
                    </div>
                    <div class="tags" v-if="selectedGenres.genres.length + selectedGenres.tags.length <= 1">
                        <div class="tag" :key="index" v-for="(tag, index) in selectedGenres.tags">{{ tag }}</div>
                    </div>
                    <div class="tags" v-else>
                        <div class="tag" v-if="selectedGenres.genres.length">{{ selectedGenres.genres[0] | capitalize }}</div>
                        <div class="tag" v-else-if="selectedGenres.tags.length">{{ selectedGenres.tags[0] | capitalize }}</div>
                        <div class="tag">+{{ selectedGenres.genres.length + selectedGenres.tags.length - 1 }}</div>
                    </div>
                    <div class="filter"></div>
                </div>
                <custom-icon name="chevron-down" />
            </div>
            <div class="options" v-if="openFilter">
                <section class="ps-container scroll-wrap ps">
                    <div class="option-group">
                        <div class="group-title">genres</div>
                        <div
                            class="option"
                            :key="index"
                            v-for="(genre, index) in genreOptions.genres"
                            @click="
                                toggleFilter(genre, 'genres');
                                open = false;
                            "
                        >
                            <div class="label">
                                <div class="name">{{ genre }}</div>
                                <div class="selected-icon circle" v-if="selectedGenres.genres.includes(genre)">
                                    <custom-icon name="check" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="option-group">
                        <div class="group-title">tags</div>
                        <div
                            class="option"
                            :key="index"
                            v-for="(tag, index) in genreOptions.tags"
                            @click="
                                toggleFilter(tag.name, 'tags');
                                open = false;
                            "
                        >
                            <div class="label">
                                <div class="name">{{ tag.name }}</div>
                                <div class="selected-icon circle" v-if="selectedGenres.tags.includes(tag.name)">
                                    <custom-icon name="check" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </div>
</template>

<script>
import { mixin as clickaway } from "vue-clickaway";
import customIcon from "vue-icon/lib/vue-feather.esm";
import axios from "axios";
import { QUERY_GENRES } from "./../../query/query";

export default {
    name: "Genres",
    props: ["searchParam"],
    mixins: [clickaway],
    components: {
        customIcon,
    },
    data() {
        return {
            selectedGenres: {
                genres: this.searchParam ? this.searchParam.genres : [],
                tags: this.searchParam ? this.searchParam.tags : [],
            },
            openFilter: false,
            genreOptions: {},
        };
    },
    methods: {
        fetchGenres() {
            axios({
                url: "https://graphql.anilist.co",
                method: "POST",

                data: {
                    query: QUERY_GENRES,
                },
            })
                .then((result) => (this.genreOptions = result.data.data))
                .catch((err) => console.log(err));
        },
        clickAway() {
            this.openFilter = false;
        },
        toggleFilter(filter, type) {
            if (type == null) return;

            if (type === "genres") {
                if (this.selectedGenres.genres.includes(filter)) {
                    return (this.selectedGenres.genres = this.selectedGenres.genres.filter((filters) => filters !== filter));
                }
                return this.selectedGenres.genres.push(filter);
            } else {
                if (this.selectedGenres.tags.includes(filter)) {
                    return (this.selectedGenres.tags = this.selectedGenres.tags.filter((filters) => filters !== filter));
                }
                return this.selectedGenres.tags.push(filter);
            }
        },
    },
    created() {
        this.fetchGenres();
    },
    watch: {
        selectedGenres: {
            handler() {
                this.$emit("selectedGenres", this.selectedGenres);
            },
            deep: true,
        },
    },
};
</script>

<style scoped src="./../../assets/css/search.css"></style>
