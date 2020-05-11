<template>
  <div class="filter filter-select">
    <div class="name">Country Of Origin</div>
    <div class="select-wrap">
      <div class="select" @click="openFilter = !openFilter" v-on-clickaway="clickAway">
        <div class="value-wrap">
          <div v-if="selectedCountry === ''" class="placeholder">Any</div>
          <div class="value" v-else>{{countryOptions.find(x => x.id === selectedCountry).name}}</div>
          <div class="filter"></div>
        </div>
        <custom-icon name="chevron-down" />
      </div>
      <div class="options" v-if="openFilter">
        <section class="ps-container scroll-wrap ps">
          <div class="option-group">
            <div
              class="option"
              :key="country.id"
              v-for="country in countryOptions"
              @click="addCountry(country.id); open = false; "
            >
              <div class="label">
                <div class="name">{{ country.name }}</div>
                <div class="selected-icon circle" v-if="selectedCountry.includes(country.id)">
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
  name: "CountryOrigin",
  props: ["searchParam"],
  mixins: [clickaway],
  components: {
    customIcon
  },
  data() {
    return {
      selectedCountry: this.searchParam ? this.searchParam.countryOfOrigin : "",
      openFilter: false,
      countryOptions: [
        { name: "Japan", id: "JP" },
        { name: "South Korea", id: "KR" },
        { name: "China", id: "CN" },
        { name: "Taiwan", id: "TW" }
      ]
    };
  },
  methods: {
    clickAway() {
      this.openFilter = false;
    },
    addCountry(country) {
      return (this.selectedCountry = country);
    }
  },
  watch: {
    selectedCountry() {
      this.$emit("selectedCountry", this.selectedCountry);
    }
  }
};
</script>

<style scoped src="./../../assets/css/search.css"></style>
