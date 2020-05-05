<template>
  <div class="media media-manga">
    <HeaderManga v-if="mangaInfo" :mangaInfo="mangaInfo" />
    <ContentManga v-if="mangaInfo" :mangaInfo="mangaInfo" />
  </div>
</template>

<script>
import axios from "axios";
import { QUERY_MANGA } from "./../query/query";

import HeaderManga from "./../components/Manga/HeaderManga";
import ContentManga from "./../components/Manga/ContentManga";
export default {
  name: "Manga",
  data() {
    return {
      mangaInfo: null
    };
  },
  components: {
    HeaderManga,
    ContentManga
  },
  methods: {
    fetchData() {
      axios({
        url: "https://graphql.anilist.co",
        method: "POST",

        data: {
          query: QUERY_MANGA,
          variables: {
            id: this.$route.params.id,
            type: "MANGA"
          }
        }
      })
        .then(result => {
          return (this.mangaInfo = result.data.data.Media);
        })
        .catch(err => console.log(err));
    }
  },
  created() {
    this.fetchData();
  }
};
</script>

<style></style>
