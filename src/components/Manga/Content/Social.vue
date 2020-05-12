<template>
  <div class="social">
    <div class="activity-feed">
      <h2>Recent Activity</h2>
      <div v-if="dataActivity.length">
        <div
          class="activity-entry activity-manga_list"
          :key="activity.id"
          v-for="(activity) in dataActivity"
        >
          <div class="wrap">
            <div class="list">
              <router-link
                class="cover"
                :to="{ name: 'Manga', params: { id: activity.media.id, name: activity.media.title.userPreferred.replace(/ /g, '-') } }"
                v-lazy:background-image="activity.media.coverImage.large"
              ></router-link>
              <div class="details">
                <div class="name">{{activity.user.name}}</div>
                <div
                  class="status"
                >Read chapter {{activity.progress}} of {{activity.media.title.userPreferred}}</div>
                <div class="avatar" v-lazy:background-image="activity.user.avatar.large"></div>
              </div>
            </div>
            <div class="time">{{fromNow(activity.createdAt)}}</div>
          </div>
        </div>
      </div>
      <scroll-loader :loader-method="fetchRecentActivity" :loader-disable="disableActivity"></scroll-loader>
    </div>
    <div class="threads-feed">
      <h2>Threads</h2>
      <scroll-loader :loader-method="fetchThreads" :loader-disable="disableThreads"></scroll-loader>
      <div class="threads" v-if="dataThreads.length">
        <div class="thread-wrap">
          <div class="thread-card small" :key="thread.id" v-for="thread in dataThreads">
            <div class="title">{{thread.title}}</div>
            <div class="footer">
              <div class="avatar" v-lazy:background-image="thread.replyUser.avatar.large"></div>
              <div class="name">
                <span>{{thread.replyUser.name}} replied 2 days ago</span>
              </div>
              <div class="categories">
                <span
                  class="category"
                  :class="thread.categories[0].name"
                >{{thread.categories[0].name}}</span>
              </div>
              <div class="info">
                <span>
                  <custom-icon name="eye" />
                  {{thread.viewCount}}
                </span>
                <span>
                  <custom-icon name="message-circle" />
                  {{thread.replyCount}}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="threads">
          <div class="thread-wrap">
            <div class="no-threads">No forum threads yet</div>
          </div>
          <!---->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import customIcon from "vue-icon/lib/vue-feather.esm";
import axios from "axios";
import { QUERY_THREADS, QUERY_ACTIVITY } from "./../../../query/query";
export default {
  name: "Social",
  data() {
    return {
      disableThreads: false,
      disableActivity: false,
      dataThreads: [],
      dataActivity: [],
      pageThreads: 1,
      pageActivity: 1
    };
  },
  components: {
    customIcon
  },
  methods: {
    fetchThreads() {
      axios({
        url: "https://graphql.anilist.co",
        method: "POST",

        data: {
          query: QUERY_THREADS,
          variables: {
            id: this.$route.params.id,
            page: this.pageThreads,
            type: "MANGA"
          }
        }
      })
        .then(result => {
          this.dataThreads = [
            ...this.dataThreads,
            ...result.data.data.Page.threads
          ];
          this.disableThreads =
            this.pageThreads == result.data.data.Page.pageInfo.lastPage;
          return this.pageThreads++;
        })
        .catch(err => console.log(err));
    },
    fetchRecentActivity() {
      axios({
        url: "https://graphql.anilist.co",
        method: "POST",

        data: {
          query: QUERY_ACTIVITY,
          variables: {
            id: this.$route.params.id,
            page: this.pageActivity,
            type: "MANGA"
          }
        }
      })
        .then(result => {
          this.dataActivity = [
            ...this.dataActivity,
            ...result.data.data.Page.activities
          ];
          this.disableActivity =
            this.pageActivity == result.data.data.Page.pageInfo.lastPage;
          return this.pageActivity++;
        })
        .catch(err => console.log(err));
    },
    fromNow(timestamp) {
      const date = new Date(timestamp * 1000);
      let delta = Math.abs(date - new Date()) / 1000;

      const days = Math.floor(delta / 86400);
      delta -= days * 86400;

      const hours = Math.floor(delta / 3600) % 24;
      delta -= hours * 3600;

      const minutes = Math.floor(delta / 60) % 60;
      delta -= minutes * 60;

      const seconds = parseInt(delta % 60);

      if (days > 0) {
        return `${days} days ago`;
      } else if (hours > 0) {
        return `${hours} hours ago`;
      } else if (minutes > 0) {
        return `${minutes} minutes ago`;
      } else {
        return `${seconds} seconds ago`;
      }
    }
  }
};
</script>

<style scoped src="./../../../assets/css/manga/content.css">
</style>