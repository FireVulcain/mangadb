<template>
  <div class="data">
    <div class="data-set">
      <div class="type" v-if="mangaInfo.format">Format</div>
      <div class="value">
        {{mangaInfo.format.toLowerCase() | capitalize}}
        <template v-if="mangaInfo.countryOfOrigin === 'KR'">(South Korea)</template>
      </div>
    </div>
    <div class="data-set" v-if="mangaInfo.volumes">
      <div class="type">Volume</div>
      <div class="value">{{mangaInfo.volumes}}</div>
    </div>
    <div class="data-set" v-if="mangaInfo.chapters">
      <div class="type">Chapters</div>
      <div class="value">{{mangaInfo.chapters}}</div>
    </div>
    <div class="data-set" v-if="mangaInfo.status">
      <div class="type">Status</div>
      <div class="value">{{mangaInfo.status.toLowerCase() | capitalize}}</div>
    </div>
    <div class="data-set" v-if="mangaInfo.startDate.year">
      <div class="type">Start Date</div>
      <div class="value">{{formatDate(mangaInfo.startDate)}}</div>
    </div>
    <div class="data-set" v-if="mangaInfo.endDate.year">
      <div class="type">End Date</div>
      <div class="value">{{formatDate(mangaInfo.endDate)}}</div>
    </div>
    <div class="data-set" v-if="mangaInfo.averageScore">
      <div class="type">Average Score</div>
      <div class="value">{{mangaInfo.averageScore}}%</div>
    </div>
    <div class="data-set" v-if="mangaInfo.meanScore">
      <div class="type">Mean Score</div>
      <div class="value">{{mangaInfo.meanScore}}%</div>
    </div>
    <div class="data-set" v-if="mangaInfo.popularity">
      <div class="type">Popularity</div>
      <div class="value">{{mangaInfo.popularity}}</div>
    </div>
    <div class="data-set" v-if="mangaInfo.favourites">
      <div class="type">Favorites</div>
      <div class="value">{{mangaInfo.favourites}}</div>
    </div>
    <div class="data-set" v-if="mangaInfo.source">
      <div class="type">Source</div>
      <div class="value">{{mangaInfo.source.toLowerCase() | capitalize}}</div>
    </div>
    <div class="data-set" v-if="mangaInfo.genres.length">
      <div class="type">Genres</div>
      <div class="value">
        <span :key="index" v-for="(genre, index) in mangaInfo.genres">
          <a :href="`/genre/${genre}`">
            {{genre}}
            <span v-if="index != mangaInfo.genres.length - 1">,</span>
          </a>
        </span>
      </div>
    </div>
    <div class="data-set" v-if="mangaInfo.title.romaji">
      <div class="type">Romaji</div>
      <div class="value">{{mangaInfo.title.romaji}}</div>
    </div>
    <div class="data-set" v-if="mangaInfo.title.english">
      <div class="type">English</div>
      <div class="value">{{mangaInfo.title.english}}</div>
    </div>
    <div class="data-set" v-if="mangaInfo.title.native">
      <div class="type">Native</div>
      <div class="value">{{mangaInfo.title.native}}</div>
    </div>
    <div class="data-set" v-if="mangaInfo.synonyms.length">
      <div class="type">Synonyms</div>
      <div class="value">
        <span :key="index" v-for="(synonym, index) in mangaInfo.synonyms">
          {{synonym}}
          <br v-if="index != mangaInfo.synonyms.length - 1" />
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "InfoManga",
  props: ["mangaInfo"],
  methods: {
    formatDate(date) {
      var listMonth = [];
      listMonth[1] = "January";
      listMonth[2] = "February";
      listMonth[3] = "March";
      listMonth[4] = "April";
      listMonth[5] = "May";
      listMonth[6] = "June";
      listMonth[7] = "July";
      listMonth[8] = "August";
      listMonth[9] = "September";
      listMonth[10] = "October";
      listMonth[11] = "November";
      listMonth[12] = "December";

      let month = date.month ? listMonth[date.month] : "";
      let day = date.day ? ", " + date.day : "";

      if (!date.year) {
        return `TBD`;
      } else {
        return `${month}${day} ${date.year}`;
      }
    }
  }
};
</script>

<style scoped src="./../../../assets/css/manga/sidebar.css">
</style>