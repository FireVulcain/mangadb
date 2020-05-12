<template>
  <div class="container">
    <vue-headful :title="'Search Manga • MangaDB'" />
    <Search @globalQuery="globalQuery" :searchParam="globalSearch" />
    <div class="no-results" v-if="error">{{error}}</div>
    <div class="results" v-else>
      <div class="media-card" :key="index" v-for="(data, index) in searchData">
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
    <scroll-loader :loader-method="fetchData" :loader-disable="disable"></scroll-loader>
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
      searchData: [],
      page: 1,
      disable: false,
      error: ""
    };
  },
  components: {
    Search,
    HoverManga
  },
  created() {
    if (this.$route.query.genres) {
      if (Array.isArray(this.$route.query.genres)) {
        this.globalSearch.genres = this.$route.query.genres;
      } else {
        this.globalSearch.genres.push(this.$route.query.genres);
      }
    }
    if (this.$route.query.format) {
      if (Array.isArray(this.$route.query.format)) {
        this.globalSearch.format = this.$route.query.format;
      } else {
        this.globalSearch.format.push(this.$route.query.format);
      }
    }
    if (this.$route.query.tags) {
      if (Array.isArray(this.$route.query.tags)) {
        this.globalSearch.tags = this.$route.query.tags;
      } else {
        this.globalSearch.tags.push(this.$route.query.tags);
      }
    }
    if (this.$route.query.search) {
      this.globalSearch.search = this.$route.query.search;
    }
    if (this.$route.query.status) {
      this.globalSearch.status = this.$route.query.status;
    }
    if (this.$route.query.year) {
      this.globalSearch.year = this.$route.query.year;
    }
    if (this.$route.query.countryOfOrigin) {
      this.globalSearch.countryOfOrigin = this.$route.query.countryOfOrigin;
    }
  },
  methods: {
    fetchData() {
      let variables = {
        page: this.page,
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
          if (result.data.data.Page.media.length <= 0) {
            this.disable = true;
            return (this.error = "No results");
          }
          this.searchData = [
            ...this.searchData,
            ...result.data.data.Page.media
          ];
          this.disable = this.page == result.data.data.Page.pageInfo.lastPage;
          return this.page++;
        })
        .catch(err => console.log(err));
    },
    globalQuery(query) {
      this.globalSearch = query;
      this.searchData = [];
      this.disable = false;
      this.page = 1;
    }
  }
};
</script>

<style scoped src="./../assets/css/mediaCard/mediaCardRow.css"></style>
