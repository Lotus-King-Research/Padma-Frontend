<template>
  <div class="container-fixed">
    <template v-for="(t, idx) in results.title">
      <!--- handle the request from `>>` --->
      <p class="tibetan-text" :id="results.title[idx]" :key="idx">
        {{ results.text[idx] }}
        <br />
        <span class="tibetan-source" id="source">{{ results.title[idx] }}</span>
        <i
          class="fa fa-angle-double-right expand-icon"
          title="expand"
          @click="renderText(idx)"
        ></i>
      </p>
    </template>
  </div>
</template>

<script>
import { Services } from "@/services/services";

export default {
  name: "searchtexts",
  components: {},

  data() {
    return {
      results: []
    };
  },

  computed: {
    searchQuery() {
      return this.$route.query.query;
    }
  },

  mounted() {
    this.doSearch();
  },

  methods: {
    async doSearch() {
      // Execute search query
      const res = await Services.searchTexts(this.searchQuery);
      this.results = res.data;
    },

    renderText(idx) {
      let startTemp = this.results.location[idx];
      let endTemp = this.results.location[idx];
      let start = startTemp;
      let end = endTemp + 2;
      this.$router.push(
        `/render_text?title=${this.results.title[idx]}&start=${start}&end=${end}`
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.tibetan-text {
  font-size: 1.2em;
  font-family: "Jomolhari", serif;
}

.tibetan-source {
  opacity: 0.4;
  font-size: x-large;
  font-family: "Tinos", serif;
}

.expand-icon {
  cursor: pointer;
  opacity: 0.3;
  font-size: x-large;
  position: absolute;
  padding-left: 15px;
  padding-top: 22px;
}
</style>
