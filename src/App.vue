<template>
  <div id="app">
    <Navbar />
    <div class="page-content">
      <transition name="router-anim" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import Navbar from "./components/Navbar/Navbar";
export default {
  name: "App",
  components: {
    Navbar
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Overpass:wght@400;600;700;800&display=swap");
@import "./assets/css/variables.css";
@import "./assets/css/app.css";
</style>
