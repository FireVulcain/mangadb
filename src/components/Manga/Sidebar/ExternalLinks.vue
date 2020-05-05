<template>
  <div class="external-links">
    <h2>External & Streaming links</h2>
    <a
      class="external-link"
      :href="externalLink.url"
      target="_blank"
      :key="index"
      v-for="(externalLink, index) in externalLinks"
      :class="externalLink.site"
    >{{externalLink.site}}</a>
  </div>
</template>

<script>
export default {
  name: "ExternalLinks",
  props: ["externalLinks"]
};
</script>

<style scoped src="./../../../assets/css/manga/sidebar.css">
</style>