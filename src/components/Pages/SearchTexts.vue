<template>
  <div class="container-fixed">
    <template v-for="(t, idx) in results.title">
      <!--- handle the request from `>>` --->
      <p class="tibetan-text mb-0 pb-0" :id="results.title[idx]" :key="idx">
        {{ results.text[idx] }}
      </p>
      <span :key="'span' + idx" class="tibetan-source" id="source">
        {{ results.text_title[idx] }}
      </span>
      <font-awesome-icon
        :key="'i' + idx"
        :icon="['fas', 'angle-double-right']"
        class="expand-icon"
        size="2x"
        title="expand"
        @click="renderText(idx)"
      />
      <hr align="left" :key="'hr' + idx" />
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
      results: {}
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
      this.results = res && res.data ? res.data : {};
      if (!Object.keys(this.results).length || !this.results.title.length) {
        this.$toasted.error("No results found", { duration: 5000 });
      }
    },

    renderText(idx) {
      let startTemp = this.results.location[idx];
      let endTemp = this.results.location[idx];
      let start = startTemp;
      let end = endTemp + 2;
      this.$router.push(
        `/render_text?title=${this.results.title[idx]}&text_title=${this.results.text_title[idx]}&start=${start}&end=${end}`
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
  position: absolute;
  padding-left: 15px;

  &:hover {
    opacity: 0.5;
  }
}

hr {
  width: 30%;
  text-align: left;
  height: 0.1px;
  margin-left: 5px;
}
</style>
