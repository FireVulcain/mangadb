<template>
  <div class="media media-manga">
    <vue-headful v-if="mangaInfo" :title="`${generateTitle(mangaInfo.title)}`" />
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
    },
    generateTitle(title) {
      let finalTitle;

      if (title.romaji !== title.english) {
        if (title.english) {
          finalTitle = `${title.romaji} (${title.english}) • MangaDB`;
        } else {
          finalTitle = `${title.romaji} • MangaDB`;
        }
      } else {
        finalTitle = `${title.romaji} • MangaDB`;
      }

      return `${finalTitle}`;
    }
  },
  created() {
    this.fetchData();
  },
  watch: {
    $route(to, from) {
      if (to.params.id != from.params.id) {
        window.scroll({
          top: 0,
          behavior: "smooth"
        });
        this.mangaInfo = null;
        return this.fetchData();
      }
      return null;
    }
  }
};
</script>

<style></style>
