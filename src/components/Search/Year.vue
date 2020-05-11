<template>
  <div class="filter filter-select">
    <div class="name">Year</div>
    <div class="select-wrap">
      <div class="select" @click="openFilter = !openFilter" v-on-clickaway="clickAway">
        <div class="value-wrap">
          <div v-if="selectedYear === ''" class="placeholder">Any</div>
          <div class="value" v-else>{{selectedYear}}</div>
          <div class="filter"></div>
        </div>
        <custom-icon name="chevron-down" />
      </div>
      <div class="options" v-if="openFilter">
        <section class="ps-container scroll-wrap ps">
          <div class="option-group">
            <div
              class="option"
              :key="year"
              v-for="year in yearOptions"
              @click="addYear(year); open = false; "
            >
              <div class="label">
                <div class="name">{{ year }}</div>
                <div class="selected-icon circle" v-if="selectedYear === year">
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
  name: "Year",
  props: ["searchParam"],
  mixins: [clickaway],
  components: {
    customIcon
  },
  data() {
    return {
      selectedYear: this.searchParam ? this.searchParam.year : "",
      openFilter: false,
      yearOptions: []
    };
  },
  methods: {
    clickAway() {
      this.openFilter = false;
    },
    generateYear() {
      let max = new Date().getFullYear() + 1;
      let min = max - 80;

      for (let i = max; i >= min; i--) {
        this.yearOptions.push(i);
      }
    },
    addYear(year) {
      return (this.selectedYear = year);
    }
  },
  created() {
    this.generateYear();
  },
  watch: {
    selectedYear() {
      this.$emit("selectedYear", this.selectedYear);
    }
  }
};
</script>

<style scoped src="./../../assets/css/search.css"></style>
