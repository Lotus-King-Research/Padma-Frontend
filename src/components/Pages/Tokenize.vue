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
    <div class="noResultsFoundMessage" v-if="noResultsFound">
      <p>
        No results were found with the given input.
      </p>
    </div>
    <div class="noResultsFoundMessage" v-if="noInputMessageFlag">
      <p>
        Start by entering a word or a segment of text in Tibetan or Wylie
      </p>
    </div>
  </div>
</template>

<script>
import { Services } from "@/services/services";

export default {
  name: "tokenize",
  data() {
    return {
      tokens: [],
      colors: ["#372118", "#725144"],
      noResultsFound: false,
      noInputMessageFlag: false
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
      this.noResultsFound = false;
      this.noInputMessageFlag = false;
      if (this.tokenizeQuery) {
        const res = await Services.tokenize(
          this.tokenizeQuery.replace(/,/g, "")
        );
        if (res && res.data) {
          this.tokens = res.data;
        } else if (res.response && res.response.data) {
          if (res.response.data.detail === "Not Found") {
            this.noResultsFound = true;
          }
        }
      } else {
        this.noInputMessageFlag = true;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/index.scss";
.container-fixed {
  height: calc(100vh - 10rem);
  overflow-y: scroll;
  padding-right: 3rem;

  .tibetan-text-reader {
    font-size: 2em;
    font-family: "Jomolhari";

    @include breakpoint(medium) {
      font-size: 3em;
    }
  }
  .noResultsFoundMessage {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;

    p {
      font-size: 1.5em;
      color: hsla(37, 18%, 45%, 1);
      line-height: 1.8rem;
    }
  }
}
</style>
