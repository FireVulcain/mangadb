<template>
  <div class="navbar" id="nav">
    <router-link :to="{name: 'Home'}">
      <img src="./../../assets/images/logo.png" alt="Logo" />
    </router-link>
  </div>
</template>

<script>
export default {
  name: "Navbar"
};
</script>

<style scoped>
.navbar {
  background: #2b2d42;
  color: #bcbedc;
}

.navbar {
  display: flex;
  height: 75px;
  justify-content: center;
  align-items: center;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  width: 100%;
  z-index: 999;
}

.navbar img {
  transition: 1s;
  width: 50px;
}
.navbar img:hover {
  -webkit-transform: rotate(1turn);
  transform: rotate(1turn);
}

@media (max-height: 920px) {
  .navbar {
    height: 68px;
  }
}
</style>