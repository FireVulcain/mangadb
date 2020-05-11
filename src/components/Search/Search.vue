<template>
  <div class="filters-wrap primary-filters">
    <div class="filters">
      <SearchBar @search="search" :searchParam="this.searchParam" />
      <Genres @selectedGenres="selectedGenres" :searchParam="this.searchParam" />
      <Format @selectedFormat="selectedFormat" :searchParam="this.searchParam" />
      <PublishingStatus @selectedPublishing="selectedPublishing" :searchParam="this.searchParam" />
      <CountryOrigin @selectedCountry="selectedCountry" :searchParam="this.searchParam" />
      <Year @selectedYear="selectedYear" :searchParam="this.searchParam" />
    </div>
  </div>
</template>

<script>
import SearchBar from "./SearchBar";
import Genres from "./Genres";
import Format from "./Format";
import PublishingStatus from "./PublishingStatus";
import CountryOrigin from "./CountryOrigin";
import Year from "./Year";

export default {
  name: "Search",
  props: ["searchParam"],
  components: {
    SearchBar,
    Genres,
    Format,
    PublishingStatus,
    CountryOrigin,
    Year
  },
  data() {
    return {
      globalSearch: {
        search: this.searchParam ? this.searchParam.search : "",
        genres: this.searchParam ? this.searchParam.genres : [],
        tags: this.searchParam ? this.searchParam.tags : [],
        format: this.searchParam ? this.searchParam.format : [],
        status: this.searchParam ? this.searchParam.status : "",
        countryOfOrigin: this.searchParam
          ? this.searchParam.countryOfOrigin
          : "",
        year: this.searchParam ? this.searchParam.year : ""
      }
    };
  },
  methods: {
    search(search) {
      this.globalSearch.search = search;
    },
    selectedGenres(genresTags) {
      this.globalSearch.genres = [...genresTags.genres];
      this.globalSearch.tags = [...genresTags.tags];
    },
    selectedFormat(format) {
      this.globalSearch.format = [...format];
    },
    selectedPublishing(publishing) {
      this.globalSearch.status = publishing;
    },
    selectedCountry(country) {
      this.globalSearch.countryOfOrigin = country;
    },
    selectedYear(year) {
      this.globalSearch.year = `${year}%`;
    }
  },
  watch: {
    globalSearch: {
      handler() {
        this.$router
          .push({
            name: "SearchPage",
            query: {
              genres: this.globalSearch.genres || [],
              tags: this.globalSearch.tags || [],
              format: this.globalSearch.format || [],
              search: this.globalSearch.search || "",
              status: this.globalSearch.status || "",
              countryOfOrigin: this.globalSearch.countryOfOrigin || "",
              year: this.globalSearch.year || ""
            }
          })
          .catch(() => {});

        this.$emit("globalQuery", this.globalSearch);
      },
      deep: true
    }
  }
};
</script>

<style scoped src="./../../assets/css/search.css"></style>
