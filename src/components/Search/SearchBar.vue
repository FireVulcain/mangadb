<template>
  <div class="filter filter-select">
    <div class="name">Search</div>
    <div class="search-wrap">
      <custom-icon name="search" />
      <input
        @input="debounceSearch"
        autocomplete="off"
        class="search"
        type="search"
        :value="search"
      />
    </div>
  </div>
</template>

<script>
import customIcon from "vue-icon/lib/vue-feather.esm";

export default {
  name: "SearchBar",
  props: ["searchParam"],
  data() {
    return {
      search: this.searchParam ? this.searchParam.search : "",
      debounce: null
    };
  },
  components: {
    customIcon
  },
  watch: {
    search() {
      this.$emit("search", this.search);
    }
  },
  methods: {
    debounceSearch(event) {
      clearTimeout(this.debounce);
      this.debounce = setTimeout(() => {
        this.search = event.target.value;
      }, 600);
    }
  }
};
</script>

<style scoped src="./../../assets/css/search.css"></style>