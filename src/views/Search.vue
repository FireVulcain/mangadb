<template>
  <div class="container">
    <vue-headful :title="'Search Manga • MangaDB'" />
    <Search @globalQuery="globalQuery" :searchParam="globalSearch" />
    <div class="results">
      <div class="media-card" :key="data.id" v-for="(data) in searchData">
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
  </div>
</template>

<script>
import axios from "axios";
import { QUERY_SEARCH } from "./../query/query";

/** Components */
import Search from "./../components/Search/Search";
import HoverManga from "./../components/Home/HoverManga";

export default {
  name: "SearchPage",
  data() {
    return {
      globalSearch: {
        search: "",
        genres: [],
        tags: [],
        format: [],
        status: "",
        countryOfOrigin: "",
        year: ""
      },
      searchData: []
    };
  },
  components: {
    Search,
    HoverManga
  },
  created() {
    this.globalSearch = this.$route.query;
    this.fetchData();
  },
  methods: {
    fetchData() {
      let variables = {
        page: 1,
        type: "MANGA"
      };
      if (this.globalSearch.countryOfOrigin) {
        variables.countryOfOrigin = this.globalSearch.countryOfOrigin;
      }
      if (this.globalSearch.genres.length) {
        variables.genres = this.globalSearch.genres;
      }
      if (this.globalSearch.tags.length) {
        variables.tags = this.globalSearch.tags;
      }
      if (this.globalSearch.format.length) {
        variables.format = this.globalSearch.format;
      }
      if (this.globalSearch.status) {
        variables.status = this.globalSearch.status;
      }
      if (this.globalSearch.year) {
        variables.year = this.globalSearch.year;
      }
      if (this.globalSearch.search) {
        variables.search = this.globalSearch.search;
        variables.sort = "SEARCH_MATCH";
      }

      axios({
        url: "https://graphql.anilist.co",
        method: "POST",

        data: {
          query: QUERY_SEARCH,
          variables
        }
      })
        .then(result => {
          this.searchData = result.data.data.Page.media;
          return result;
        })
        .catch(err => console.log(err));
    },
    globalQuery(query) {
      this.globalSearch = query;
      this.fetchData();
    }
  }
};
</script>

<style scoped src="./../assets/css/mediaCard/mediaCardRow.css"></style>
