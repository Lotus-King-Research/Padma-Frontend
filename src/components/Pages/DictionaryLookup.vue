<template>
  <div class="dictionarylookup">
    <div class="container-fluid">
      <template v-for="(token, idx) in results.tokens">
        <div :key="idx">
          <h1>{{ token }}</h1>
          <template v-for="(item, idx2) in results.text[idx]">
            <p :key="idx2">
              {{ item }}
            </p>
          </template>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { Services } from "@/services/services";

export default {
  name: "dictionarylookup",
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

  watch: {
    $route() {
      this.results = {};
      this.doSearch();
    }
  },

  mounted() {
    this.doSearch();
  },

  methods: {
    async doSearch() {
      // Execute search query
      const res = await Services.dictionaryLookup(this.searchQuery);
      this.results = res && res.data ? res.data : {};
      console.log("results =", this.results);
      if (!Object.keys(this.results).length) {
        this.$toasted.error("No results found", { duration: 5000 });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/index.scss";
.dictionarylookup {
  text-transform: lowercase;
  .container-fluid {
    padding-left: 0;
    h1 {
      font-family: $tib-font;
      margin-bottom: 2rem;
    }
  }
}
</style>
