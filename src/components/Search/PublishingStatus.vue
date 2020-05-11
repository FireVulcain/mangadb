<template>
  <div class="filter filter-select">
    <div class="name">Publishing Status</div>
    <div class="select-wrap">
      <div class="select" @click="openFilter = !openFilter" v-on-clickaway="clickAway">
        <div class="value-wrap">
          <div v-if="selectedPublishing === ''" class="placeholder">Any</div>
          <div
            class="value"
            v-else
          >{{publishingOptions.find(x => x.id === selectedPublishing).name}}</div>
          <div class="filter"></div>
        </div>
        <custom-icon name="chevron-down" />
      </div>
      <div class="options" v-if="openFilter">
        <section class="ps-container scroll-wrap ps">
          <div class="option-group">
            <div
              class="option"
              :key="publishing.id"
              v-for="publishing in publishingOptions"
              @click="addPublishing(publishing.id); open = false; "
            >
              <div class="label">
                <div class="name">{{ publishing.name }}</div>
                <div class="selected-icon circle" v-if="selectedPublishing.includes(publishing.id)">
                  <custom-icon name="check" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import { mixin as clickaway } from "vue-clickaway";
import customIcon from "vue-icon/lib/vue-feather.esm";

export default {
  name: "PublishingStatus",
  props: ["searchParam"],
  mixins: [clickaway],
  components: {
    customIcon
  },
  data() {
    return {
      selectedPublishing: this.searchParam ? this.searchParam.status : "",
      openFilter: false,
      publishingOptions: [
        { name: "Releasing", id: "RELEASING" },
        { name: "Finished", id: "FINISHED" },
        { name: "Not Yet Released", id: "NOT_YET_RELEASED" },
        { name: "Cancelled", id: "CANCELLED" }
      ]
    };
  },
  methods: {
    clickAway() {
      this.openFilter = false;
    },
    addPublishing(publishing) {
      return (this.selectedPublishing = publishing);
    }
  },
  watch: {
    selectedPublishing() {
      this.$emit("selectedPublishing", this.selectedPublishing);
    }
  }
};
</script>

<style scoped src="./../../assets/css/search.css"></style>
