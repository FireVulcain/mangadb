<template>
    <div class="media-characters">
        <div v-if="data" class="grid-wrap grid-wrap-half">
            <div class="role-card view-character" :key="index" v-for="(character, index) in data">
                <div class="character">
                    <div class="cover" v-lazy:background-image="character.node.image.large"></div>
                    <div class="content">
                        <div class="name">{{ character.node.name.full }}</div>
                        <div class="role">{{ character.role.toLowerCase() }}</div>
                    </div>
                </div>
            </div>
        </div>
        <scroll-loader :loader-method="fetchCharacters" :loader-disable="disable"> </scroll-loader>
    </div>
</template>

<script>
import axios from "axios";
import { QUERY_CHARACTERS } from "./../../../query/query";

export default {
    name: "Characters",
    data() {
        return {
            disable: false,
            data: [],
            page: 1,
        };
    },
    methods: {
        fetchCharacters() {
            axios({
                url: "https://graphql.anilist.co",
                method: "POST",

                data: {
                    query: QUERY_CHARACTERS,
                    variables: {
                        id: this.$route.params.id,
                        page: this.page,
                        type: "MANGA",
                    },
                },
            })
                .then((result) => {
                    this.data = [...this.data, ...result.data.data.Media.characters.edges];
                    this.disable = this.page == result.data.data.Media.characters.pageInfo.lastPage;
                    return this.page++;
                })
                .catch((err) => console.log(err));
        },
    },
};
</script>

<style scoped src="./../../../assets/css/manga/content.css"></style>
