<template>
  <div class="header-wrap">
    <div
      v-if="mangaInfo.bannerImage"
      class="banner"
      v-lazy:background-image="mangaInfo.bannerImage"
    >
      <div class="shadow"></div>
    </div>
    <div class="header">
      <div class="container">
        <div class="cover-wrap" :class="mangaInfo.bannerImage ? 'overlap-banner' : ''">
          <div
            class="cover-wrap-inner"
            :style="mangaInfo.bannerImage ? 'position: static;' : 'position: absolute;'"
          >
            <img :src="mangaInfo.coverImage.extraLarge" class="cover" />
          </div>
        </div>
        <div class="content">
          <h1>{{ mangaInfo.title.romaji }}</h1>
          <p
            v-html="readMore ? mangaInfo.description : trimDescription(mangaInfo.description)"
            class="description"
          ></p>
          <span
            v-if="!readMore"
            @click="readMore = !readMore"
            class="description-length-toggle"
          >Read More</span>
          <div class="nav">
            <router-link :to="{ name: 'Manga', params: { id: mangaInfo.id } }" class="link">Overiew</router-link>
            <a href class="link">Characters</a>
            <a href class="link">Staff</a>
            <a href class="link">Reviews</a>
            <a href class="link">Stats</a>
            <a href class="link">Social</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HeaderManga",
  props: ["mangaInfo"],
  data() {
    return {
      readMore: false
    };
  },
  methods: {
    trimDescription(description) {
      if (description.split(" ").length > 120) {
        description =
          description
            .split(" ")
            .splice(0, 120)
            .join(" ") + "...";
      } else {
        this.readMore = true;
      }

      return description;
    }
  }
};
</script>

<style scoped src="./../../assets/css/manga/header.css"></style>
