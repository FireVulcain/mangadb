<template>
    <div class="results table">
        <div class="media-card has-rank" :key="index" v-for="index in 10">
            <div class="cover"></div>
            <div class="content">
                <div class="row title"></div>
                <div class="row score"></div>
                <div class="row format"></div>
                <div class="row date"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "SkeletonColumn",
    props: ["data"],
};
</script>

<style scoped src="./../../assets/css/skeleton/skeletonColumn.css"></style>
