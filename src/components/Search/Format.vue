<template>
    <div class="filter filter-select">
        <div class="name">Format</div>
        <div class="select-wrap">
            <div class="select" @click="openFilter = !openFilter" v-on-clickaway="clickAway">
                <div class="value-wrap">
                    <div class="placeholder" v-if="!selectedFormat.length">Any</div>
                    <div class="tags" v-if="selectedFormat.length <= 1">
                        <div class="tag" :key="index" v-for="(filter, index) in selectedFormat">{{ filter | clean }}</div>
                    </div>
                    <div class="tags" v-else-if="selectedFormat.length > 1">
                        <div class="tag">{{ selectedFormat[0] | clean }}</div>
                        <div class="tag">+{{ selectedFormat.length - 1 }}</div>
                    </div>
                    <div class="filter"></div>
                </div>
                <custom-icon name="chevron-down" />
            </div>
            <div class="options" v-if="openFilter">
                <section class="ps-container scroll-wrap ps">
                    <div class="option-group">
                        <div
                            class="option"
                            :key="format.id"
                            v-for="format in formatOptions"
                            @click="
                                toggleFilter(format.id);
                                open = false;
                            "
                        >
                            <div class="label">
                                <div class="name">{{ format.name }}</div>
                                <div class="selected-icon circle" v-if="selectedFormat.includes(format.id)">
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
    name: "Format",
    props: ["searchParam"],
    mixins: [clickaway],
    components: {
        customIcon,
    },
    data() {
        return {
            selectedFormat: this.searchParam ? this.searchParam.format : [],
            openFilter: false,
            formatOptions: [
                { name: "Manga", id: "MANGA" },
                { name: "Light Novel", id: "NOVEL" },
                { name: "One Shot", id: "ONE_SHOT" },
            ],
        };
    },
    methods: {
        clickAway() {
            this.openFilter = false;
        },
        toggleFilter(filter) {
            if (this.selectedFormat.includes(filter)) {
                return (this.selectedFormat = this.selectedFormat.filter((filters) => filters !== filter));
            }

            return this.selectedFormat.push(filter);
        },
    },
    watch: {
        selectedFormat() {
            this.$emit("selectedFormat", this.selectedFormat);
        },
    },
};
</script>

<style scoped src="./../../assets/css/search.css"></style>
