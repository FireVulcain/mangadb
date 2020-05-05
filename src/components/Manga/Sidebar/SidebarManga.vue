<template>
  <div class="sidebar" :style="!mangaInfo.bannerImage ? `margin-top: ${calculMargin()}px;` : ''">
    <Rankings :rankings="rankings" />
    <InfosManga :mangaInfo="mangaInfo" />
    <Tags v-if="mangaInfo.tags.length" :tags="mangaInfo.tags" />
    <ExternalLinks v-if="mangaInfo.externalLinks.length" :externalLinks="mangaInfo.externalLinks" />
  </div>
</template>

<script>
import Rankings from "./Rankings.vue";
import InfosManga from "./InfosManga.vue";
import Tags from "./Tags.vue";
import ExternalLinks from "./ExternalLinks.vue";
export default {
  name: "SidebarManga",
  props: ["mangaInfo"],
  components: {
    Rankings,
    InfosManga,
    Tags,
    ExternalLinks
  },
  methods: {
    calculMargin() {
      let imgHeight = document.querySelector(".header .cover").offsetHeight;
      let descriptionHeight = document.querySelector(".header .container")
        .offsetHeight;

      if (descriptionHeight < imgHeight) {
        return Math.abs(imgHeight - descriptionHeight + 20);
      }
      return 0;
    }
  },
  computed: {
    rankings: function() {
      let listRanking = this.mangaInfo.rankings;
      if (listRanking.length > 2) {
        listRanking = listRanking.filter(ranking => ranking.allTime);
      }

      return listRanking;
    }
  }
};
</script>

<style scoped >
</style>