<template>
  <div class="hover-data right">
    <div class="header">
      <div v-if="data.endDate.year">{{ data.startDate.year }} - {{ data.endDate.year }}</div>
      <div v-else>Publishing since {{ data.startDate.year }}</div>
      <div class="score" v-if="data.averageScore">
        <custom-icon v-if="data.averageScore >= 75" name="smile" color="rgb(var(--color-green))" />
        <custom-icon
          v-else-if="data.averageScore < 75 && data.averageScore >= 55"
          name="meh"
          color="rgb(var(--color-orange))"
        />
        <custom-icon v-else name="frown" color="rgb(var(--color-red))" />
        <span class="percentage">{{ data.averageScore }}%</span>
      </div>
    </div>
    <div class="info">
      <span>{{ data.type.toLowerCase() | capitalize }}</span>
      <span v-if="data.chapters" class="separator">•</span>
      <span v-if="data.chapters">{{ data.chapters }} chapters</span>
    </div>
    <div class="genres">
      <div class="genre" :key="index" v-for="(genre, index) in data.genres">{{ genre }}</div>
    </div>
  </div>
</template>

<script>
import customIcon from "vue-icon/lib/vue-feather.esm";
export default {
  name: "HoverManga",
  props: ["data"],
  components: {
    customIcon
  }
};
</script>

<style scoped src="./../../assets/css/mediaCard/hoverManga.css"></style>
