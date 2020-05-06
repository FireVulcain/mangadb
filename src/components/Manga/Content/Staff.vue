<template>
    <div class="media-staff">
        <div v-if="data" class="grid-wrap">
            <div class="role-card view-staff" :key="index" v-for="(staff, index) in data">
                <div class="staff">
                    <div class="cover" v-lazy:background-image="staff.node.image.large"></div>
                    <div class="content">
                        <div class="name">{{ staff.node.name.full }}</div>
                        <div class="role">{{ staff.role.toLowerCase() }}</div>
                    </div>
                </div>
            </div>
        </div>
        <scroll-loader :loader-method="fetchStaff" :loader-disable="disable"> </scroll-loader>
    </div>
</template>

<script>
import axios from "axios";
import { QUERY_STAFF } from "./../../../query/query";

export default {
    name: "Staff",
    data() {
        return {
            disable: false,
            data: [],
            page: 1,
        };
    },
    methods: {
        fetchStaff() {
            axios({
                url: "https://graphql.anilist.co",
                method: "POST",

                data: {
                    query: QUERY_STAFF,
                    variables: {
                        id: this.$route.params.id,
                        page: this.page,
                        type: "MANGA",
                    },
                },
            })
                .then((result) => {
                    this.data = [...this.data, ...result.data.data.Media.staff.edges];
                    this.disable = this.page == result.data.data.Media.staff.pageInfo.lastPage;
                    return this.page++;
                })
                .catch((err) => console.log(err));
        },
    },
};
</script>

<style scoped src="./../../../assets/css/manga/content.css"></style>
