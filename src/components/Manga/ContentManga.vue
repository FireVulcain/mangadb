<template>
  <div class="content container">
    <SidebarManga :mangaInfo="mangaInfo" />
    <Overview v-if="dataParm == 'overview'" :mangaInfo="mangaInfo" />
    <Characters v-if="dataParm == 'characters'" />
    <Staff v-if="dataParm == 'staff'" />
    <Reviews v-if="dataParm == 'reviews'" />
    <Stats v-if="dataParm == 'stats'" />
    <Social v-if="dataParm == 'social'" />
  </div>
</template>

<script>
import SidebarManga from "./Sidebar/SidebarManga";
import Overview from "./Content/Overview";
import Characters from "./Content/Characters";
import Staff from "./Content/Staff";
import Reviews from "./Content/Reviews";
import Stats from "./Content/Stats";
import Social from "./Content/Social";

export default {
  name: "ContentManga",
  props: ["mangaInfo"],
  data() {
    return {
      dataParm: "",
      data: []
    };
  },
  components: {
    SidebarManga,
    Overview,
    Characters,
    Staff,
    Reviews,
    Stats,
    Social
  },
  created() {
    let params = this.$route.params.data;
    if (params) {
      return this.switchOnParam(params);
    } else {
      return (this.dataParm = "overview");
    }
  },
  watch: {
    $route(to) {
      let params = to.params.data;
      if (params) {
        return this.switchOnParam(params);
      }
      return (this.dataParm = "overview");
    }
  },
  methods: {
    switchOnParam(params) {
      switch (params) {
        case "characters":
          this.dataParm = "characters";
          break;
        case "staff":
          this.dataParm = "staff";
          break;
        case "reviews":
          this.dataParm = "reviews";
          break;
        case "stats":
          this.dataParm = "stats";
          break;
        case "social":
          this.dataParm = "social";
          break;
        default:
          this.dataParm = "overview";
          break;
      }
    }
  }
};
</script>

<style scoped>
.content {
  display: grid;
  grid-column-gap: 40px;
  grid-template-columns: 208px auto;
  margin-top: 30px;
  position: relative;
}
@media (max-width: 767px) {
  .content {
    display: block;
    padding-bottom: 30px;
  }
}
</style>
