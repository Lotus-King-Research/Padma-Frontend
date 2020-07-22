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
      this.apiResult = res.data;
    }
  }
};
</script>

<style lang="scss" scoped></style>
