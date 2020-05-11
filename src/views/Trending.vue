<template>
  <div class="container">
    <h1 class="alias-title">Trending manga</h1>
    <Search />
    <div v-if="trendingNow" class="results">
      <div class="media-card" :key="data.id" v-for="data in trendingNow">
        <router-link
          :to="{ name: 'Manga', params: { id: data.id, name: data.title.userPreferred.replace(/ /g, '-') } }"
          class="cover"
        >
          <img v-lazy="data.coverImage.extraLarge" class="image" alt />
        </router-link>
        <router-link
          :to="{ name: 'Manga', params: { id: data.id, name: data.title.userPreferred.replace(/ /g, '-') } }"
          class="title"
        >{{ data.title.userPreferred }}</router-link>
        <HoverManga :data="data" />
      </div>
    </div>
    <scroll-loader :loader-method="fetchTrending" :loader-disable="disable"></scroll-loader>
  </div>
</template>

<script>
import axios from "axios";
import { QUERY_SORT } from "./../query/query";
import HoverManga from "./../components/Home/HoverManga";
import Search from "./../components/Search/Search";
export default {
  name: "Trending",
  data() {
    return {
      disable: false,
      trendingNow: [],
      page: 1
    };
  },
  components: {
    HoverManga,
    Search
  },
  methods: {
    fetchTrending() {
      axios({
        url: "https://graphql.anilist.co",
        method: "POST",

        data: {
          query: QUERY_SORT,
          variables: {
            page: this.page,
            sort: ["TRENDING_DESC", "POPULARITY_DESC"],
            type: "MANGA"
          }
        }
      })
        .then(result => {
          this.trendingNow = [
            ...this.trendingNow,
            ...result.data.data.Page.media
          ];
          this.disable = this.page == result.data.data.Page.pageInfo.lastPage;
          return this.page++;
        })
        .catch(err => console.log(err));
    }
  }
};
</script>
<style scoped src="./../assets/css/mediaCard/mediaCardRow.css">
</style>