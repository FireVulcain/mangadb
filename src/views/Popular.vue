<template>
  <div class="container">
    <h1 class="alias-title">Popular manga</h1>
    <Search />
    <div v-if="popular" class="results">
      <div class="media-card" :key="data.id" v-for="data in popular">
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
    <scroll-loader :loader-method="fetchPopular" :loader-disable="disable"></scroll-loader>
  </div>
</template>

<script>
import axios from "axios";
import { QUERY_SORT } from "./../query/query";
import HoverManga from "./../components/Home/HoverManga";
import Search from "./../components/Search/Search";
export default {
  name: "Popular",
  data() {
    return {
      disable: false,
      popular: [],
      page: 1
    };
  },
  components: {
    HoverManga,
    Search
  },
  methods: {
    fetchPopular() {
      axios({
        url: "https://graphql.anilist.co",
        method: "POST",

        data: {
          query: QUERY_SORT,
          variables: {
            page: this.page,
            sort: "POPULARITY_DESC",
            type: "MANGA"
          }
        }
      })
        .then(result => {
          this.popular = [...this.popular, ...result.data.data.Page.media];
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