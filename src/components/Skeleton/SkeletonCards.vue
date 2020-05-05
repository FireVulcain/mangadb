<template>
  <div class="results">
    <div class="media-card" v-for="index in 6" :key="index">
      <div class="cover"></div>
      <div class="title"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SkeletonCards"
};
</script>

<style scoped src="./../../assets/css/skeleton/skeletonCards.css"></style>
