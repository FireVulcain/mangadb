<template>
  <div class="content container">
    <SidebarManga :mangaInfo="mangaInfo" />
  </div>
</template>

<script>
import SidebarManga from "./Sidebar/SidebarManga";
export default {
  name: "ContentManga",
  props: ["mangaInfo"],
  components: {
    SidebarManga
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
</style>