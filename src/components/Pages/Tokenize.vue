<template>
  <div class="container-fixed px-5 pb-5">
    <font
      v-for="(token, idx) in tokens"
      class="tibetan-text-reader"
      :key="idx"
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
      tokens: []
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
      const res = await Services.tokenize(this.tokenizeQuery);
      this.tokens = res && res.data ? res.data.tokens : [];
      if (!this.tokens.length) {
        this.$toasted.error("No results found", { duration: 5000 });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.tibetan-text-reader {
  font-size: 1.5em;
  font-family: "Jomolhari", serif;
  margin-right: 15px;
}

font:nth-of-type(2) {
  color: rgba(0, 0, 0, 0.705);
}
</style>
