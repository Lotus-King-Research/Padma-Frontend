<template>
  <div class="container-fixed">
    <ForceDirectedGraph :graphData="apiResult"></ForceDirectedGraph>
  </div>
</template>

<script>
import { Services } from "@/services/services";
import ForceDirectedGraph from "@/components/Sub/ForceDirectedGraph";

export default {
  name: "similarwords",
  components: {
    ForceDirectedGraph
  },

  data() {
    return {
      apiResult: {}
    };
  },

  computed: {
    wordQuery() {
      return this.$route.query.query;
    }
  },

  watch: {
    $route() {
      this.apiResult = {};
      this.doSimilarWords();
    }
  },

  mounted() {
    this.doSimilarWords();
  },

  methods: {
    async doSimilarWords() {
      // Check for english chars
      if (this.wordQuery.match(/[a-z]/i)) {
        return;
      }

      // Execute similar words query
      const res = await Services.similarWords(this.wordQuery);
      this.apiResult = res && res.data ? res.data : {};
      if (!Object.keys(this.apiResult).length) {
        this.$toasted.error("No results found", { duration: 5000 });
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
