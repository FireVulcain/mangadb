<template>
  <div class="overview">
    <div class="relations" v-if="mangaInfo.relations.edges.length">
      <h2>Relations</h2>
      <div class="grid-wrap">
        <div
          class="media-preview-card"
          :key="index"
          v-for="(relation, index) in mangaInfo.relations.edges"
        >
          <router-link
            v-if="relation.node.type == 'MANGA'"
            :to="{
                            name: 'Manga',
                            params: {
                                id: relation.node.id,
                                name: relation.node.title.userPreferred.replace(/ /g, '-'),
                            },
                        }"
            class="cover"
            v-lazy:background-image="relation.node.coverImage.large"
          ></router-link>
          <div v-else class="cover" v-lazy:background-image="relation.node.coverImage.large"></div>
          <div class="content">
            <div class="info-header">
              <div>{{ relation.relationType | clean }}</div>
            </div>
            <router-link
              v-if="relation.node.type == 'MANGA'"
              :to="{
                                name: 'Manga',
                                params: {
                                    id: relation.node.id,
                                    name: relation.node.title.userPreferred.replace(/ /g, '-'),
                                },
                            }"
              class="title"
            >{{ relation.node.title.userPreferred }}</router-link>
            <div v-else class="title">{{ relation.node.title.userPreferred }}</div>
            <div
              class="info"
              v-if="relation.node.status"
            >{{ relation.node.type | capitalize }} · {{ relation.node.status | capitalize }}</div>
            <div class="info" v-else>{{ relation.node.type | capitalize }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="characters" v-if="mangaInfo.characterPreview.edges.length">
      <h2>Characters</h2>
      <div class="grid-wrap">
        <div
          class="role-card view-character"
          :key="index"
          v-for="(character, index) in mangaInfo.characterPreview.edges"
        >
          <div class="character">
            <div class="cover" v-lazy:background-image="character.node.image.large"></div>
            <div class="content">
              <div class="name">{{ character.node.name.full }}</div>
              <div class="role">{{ character.role | capitalize }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="staff" v-if="mangaInfo.staffPreview.edges.length">
      <h2>Staff</h2>
      <div class="grid-wrap">
        <div
          class="role-card view-staff"
          :key="index"
          v-for="(staff, index) in mangaInfo.staffPreview.edges"
        >
          <div class="staff">
            <div class="cover" v-lazy:background-image="staff.node.image.large"></div>
            <div class="content">
              <div class="name">{{ staff.node.name.full }}</div>
              <div class="role">{{ staff.role | capitalize }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="grid-section-wrap" v-if="mangaInfo.trailer">
      <div class="trailer">
        <h2>Trailer</h2>
        <youtube
          player-width="100%"
          player-height="230px"
          class="video"
          :video-id="mangaInfo.trailer.id"
        ></youtube>
      </div>
    </div>
    <div class="recommendations" v-if="mangaInfo.recommendations.nodes.length">
      <h2>Recommendations</h2>
      <div class="wrap">
        <div
          class="recommendation-card"
          :key="index"
          v-for="(recommendation, index) in mangaInfo.recommendations.nodes"
        >
          <router-link
            :to="{
                            name: 'Manga',
                            params: {
                                id: recommendation.mediaRecommendation.id,
                                name: recommendation.mediaRecommendation.title.userPreferred.replace(/ /g, '-'),
                            },
                        }"
            class="cover"
            v-lazy:background-image="recommendation.mediaRecommendation.coverImage.large"
          ></router-link>
          <router-link
            :to="{
                            name: 'Manga',
                            params: {
                                id: recommendation.mediaRecommendation.id,
                                name: recommendation.mediaRecommendation.title.userPreferred.replace(/ /g, '-'),
                            },
                        }"
            class="title"
          >{{ recommendation.mediaRecommendation.title.userPreferred }}</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Overview",
  props: ["mangaInfo"]
};
</script>

<style scoped src="./../../../assets/css/manga/content.css"></style>
