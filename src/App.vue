<template>
  <div id="app">
    <div class="page-content">
      <transition name="router-anim" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Overpass:wght@400;600;700;800&display=swap");
@import "./assets/css/variables.css";
@import "./assets/css/app.css";
</style>
