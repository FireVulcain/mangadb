<template>
  <div>
    <h3 class="title">
      <router-link :to="{name: 'Popular'}" class="link">
        All Time Popular
        <div class="expand">View All</div>
      </router-link>
    </h3>
    <SkeletonCards v-if="!allTimePopular" />
    <div v-else class="results">
      <div class="media-card" :key="data.id" v-for="data in allTimePopular">
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
import HoverManga from "./HoverManga";
import SkeletonCards from "./../Skeleton/SkeletonCards";
export default {
  name: "AllTimePopular",
  props: ["allTimePopular"],
  components: {
    HoverManga,
    SkeletonCards
  }
};
</script>
<style scoped src="./../../assets/css/mediaCard/mediaCardRow.css"></style>
