<template>
  <div class="container">
    <h1 class="alias-title">Top manhwa</h1>
    <Search />
    <div v-if="popularManhwa" class="results">
      <div class="media-card" :key="data.id" v-for="(data, index) in popularManhwa">
        <div class="rank circle">
          <span class="hash">#</span>
          {{index + 1}}
        </div>
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
    <scroll-loader :loader-method="fetchManhwa" :loader-disable="disable"></scroll-loader>
  </div>
</template>

<script>
import axios from "axios";
import { QUERY_SORT } from "./../query/query";
import HoverManga from "./../components/Home/HoverManga";
import Search from "./../components/Search/Search";
export default {
  name: "Manhwa",
  data() {
    return {
      disable: false,
      popularManhwa: [],
      page: 1
    };
  },
  components: {
    HoverManga,
    Search
  },
  methods: {
    fetchManhwa() {
      axios({
        url: "https://graphql.anilist.co",
        method: "POST",

        data: {
          query: QUERY_SORT,
          variables: {
            countryOfOrigin: "KR",
            page: this.page,
            sort: "SCORE_DESC",
            type: "MANGA"
          }
        }
      })
        .then(result => {
          this.popularManhwa = [
            ...this.popularManhwa,
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