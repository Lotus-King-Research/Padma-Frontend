<template>
  <div class="container-fixed">
    <font
      v-for="(token, idx) in tokens"
      class="tibetan-text-reader"
      :key="idx"
      :style="{
        color: colors[idx % 2]
      }"
      >{{ token }}</font
    >
  </div>
</template>

<script>
import { Services } from "@/services/services";

export default {
  name: "tokenize",
  components: {},

  data() {
    return {
      tokens: [],
      colors: ["#372118", "#725144"]
    };
  },

  computed: {
    tokenizeQuery() {
      return this.$route.query.query;
    }
  },

  watch: {
    $route() {
      this.tokens = [];
      this.doTokenize();
    }
  },

  mounted() {
    this.doTokenize();
  },

  methods: {
    async doTokenize() {
      // Execute tokenize query

      const res = await Services.tokenize(this.tokenizeQuery.replace(/,/g, ""));
      this.tokens = res && res.data ? res.data.tokens : [];
      if (!this.tokens.length) {
        this.$toasted.error("No results found", { duration: 5000 });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/index.scss";
.container-fixed {
  height: 30rem;
  overflow-y: scroll;
  padding-right: 2rem;

  .tibetan-text-reader {
    font-size: 2em;
    font-family: "Jomolhari";

    @include breakpoint(medium) {
      font-size: 3em;
    }
  }
}
</style>
