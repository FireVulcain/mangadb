<template>
  <div class="tags">
    <h2>Tags</h2>
    <template v-for="(tag, index) in tags">
      <div v-if="!tag.isMediaSpoiler" :key="index" class="tag">
        <a href>{{tag.name}}</a>
        <div class="rank">{{tag.rank}}%</div>
      </div>
      <div v-else-if="!isHidden" :key="index" class="tag spoiler">
        <a href>{{tag.name}}</a>
        <div class="rank">{{tag.rank}}%</div>
      </div>
    </template>
    <div
      v-if="nbSpoiler() > 0"
      @click="isHidden = !isHidden"
      class="spoiler-toggle"
    >Toggle {{nbSpoiler()}} spoiler tags</div>
  </div>
</template>

<script>
export default {
  name: "TagsSidebar",
  data() {
    return {
      isHidden: true
    };
  },
  methods: {
    nbSpoiler: function() {
      let nbSpoiler = this.tags.filter(tag => tag.isMediaSpoiler);
      return nbSpoiler.length;
    }
  },
  props: ["tags"]
};
</script>

<style scoped src="./../../../assets/css/manga/sidebar.css">
</style>