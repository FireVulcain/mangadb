<template>
    <div class="hover-data right">
        <div class="header">
            <div v-if="data.endDate.year">{{ data.startDate.year }} - {{ data.endDate.year }}</div>
            <div v-else>Publishing since {{ data.startDate.year }}</div>
            <div class="score">
                <svg
                    v-if="data.averageScore > 70"
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="far"
                    data-icon="smile"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 496 512"
                    color="rgb(var(--color-green))"
                    class="icon svg-inline--fa fa-smile fa-w-16 fa-fw"
                >
                    <path
                        fill="currentColor"
                        d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 448c-110.3 0-200-89.7-200-200S137.7 56 248 56s200 89.7 200 200-89.7 200-200 200zm-80-216c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.3 32 32 32zm160 0c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.3 32 32 32zm4 72.6c-20.8 25-51.5 39.4-84 39.4s-63.2-14.3-84-39.4c-8.5-10.2-23.7-11.5-33.8-3.1-10.2 8.5-11.5 23.6-3.1 33.8 30 36 74.1 56.6 120.9 56.6s90.9-20.6 120.9-56.6c8.5-10.2 7.1-25.3-3.1-33.8-10.1-8.4-25.3-7.1-33.8 3.1z"
                        class=""
                    ></path>
                </svg>
                <svg
                    v-else-if="data.averageScore <= 71 && data.averageScore >= 55"
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="far"
                    data-icon="meh"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 496 512"
                    color="rgb(var(--color-orange))"
                    class="icon svg-inline--fa fa-meh fa-w-16 fa-fw"
                >
                    <path
                        fill="currentColor"
                        d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 448c-110.3 0-200-89.7-200-200S137.7 56 248 56s200 89.7 200 200-89.7 200-200 200zm-80-216c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.3 32 32 32zm160-64c-17.7 0-32 14.3-32 32s14.3 32 32 32 32-14.3 32-32-14.3-32-32-32zm8 144H160c-13.2 0-24 10.8-24 24s10.8 24 24 24h176c13.2 0 24-10.8 24-24s-10.8-24-24-24z"
                        class=""
                    ></path>
                </svg>
                <svg
                    v-else
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="far"
                    data-icon="frown"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 496 512"
                    color="rgb(var(--color-red))"
                    class="icon svg-inline--fa fa-frown fa-w-16 fa-fw"
                >
                    <path
                        fill="currentColor"
                        d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 448c-110.3 0-200-89.7-200-200S137.7 56 248 56s200 89.7 200 200-89.7 200-200 200zm-80-216c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.3 32 32 32zm160-64c-17.7 0-32 14.3-32 32s14.3 32 32 32 32-14.3 32-32-14.3-32-32-32zm-80 128c-40.2 0-78 17.7-103.8 48.6-8.5 10.2-7.1 25.3 3.1 33.8 10.2 8.4 25.3 7.1 33.8-3.1 16.6-19.9 41-31.4 66.9-31.4s50.3 11.4 66.9 31.4c8.1 9.7 23.1 11.9 33.8 3.1 10.2-8.5 11.5-23.6 3.1-33.8C326 321.7 288.2 304 248 304z"
                        class=""
                    ></path>
                </svg>

                <span class="percentage">{{ data.averageScore }}%</span>
            </div>
        </div>
        <div class="info">
            <span>{{ data.type.toLowerCase() | capitalize }}</span>
            <span v-if="data.chapters" class="separator">•</span>
            <span v-if="data.chapters">{{ data.chapters }} chapters</span>
        </div>
        <div class="genres">
            <div class="genre" :key="index" v-for="(genre, index) in data.genres">
                {{ genre }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "HoverManga",
    props: ["data"],
};
</script>

<style scoped>
.hover-data {
    background: rgb(var(--color-background-100));
    border-radius: 6px;
    box-shadow: 0 14px 30px rgba(var(--color-shadow-blue), 0.15), 0 4px 4px rgba(var(--color-shadow-blue), 0.05);
    min-width: 290px;
    opacity: 0;
    padding: 24px;
    pointer-events: none;
    position: absolute;
    top: 5px;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
    width: 100%;
    z-index: 10;
}
.hover-data.right {
    margin-left: 18px;
    left: 100%;
}

.media-card:hover .hover-data {
    opacity: 1;
}

.hover-data .header {
    display: grid;
    grid-template-columns: auto 60px;
    font-weight: 600;
    color: rgb(var(--color-gray-800));
    font-size: 1.6rem;
}
.hover-data .score .icon {
    display: inline-block;
    width: 1em;
    height: 1em;
    vertical-align: -0.125em;
    font-size: 1.9rem;
}
.hover-data .score .percentage {
    vertical-align: text-top;
    display: inline-flex;
    padding-left: 3px;
}

.hover-data .info {
    color: rgb(var(--color-gray-700));
    font-size: 1.3rem;
    font-weight: 600;
    margin-top: 6px;
}
.hover-data .info .separator {
    padding: 0 4px;
}
.hover-data .genres {
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    height: 20px;
    overflow: hidden;
    margin-top: 22px;
}
.hover-data .genres .genre {
    background: #3480ea;
    border-radius: 10px;
    color: #fff;
    display: inline-block;
    font-size: 1.2rem;
    font-weight: 700;
    height: 20px;
    line-height: 2rem;
    margin-right: 11px;
    padding: 0 12px;
    text-transform: lowercase;
}
</style>
