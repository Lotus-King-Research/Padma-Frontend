<template>
  <div class="customTextArea-Wrapper">
    <div
      class="customTextArea"
      ref="textarea"
      contenteditable="true"
      @input="updateHTML"
    >
      <span
        v-for="(token, idx) in tokens"
        :key="idx"
        :style="{
          color: colors[idx % 2]
        }"
      >
        {{ token }}
      </span>
    </div>
    <!-- <div contenteditable="true" class="customTextArea" @input="updateHTML" v-else>
      {{content}}
    </div> -->
  </div>
</template>
<script>
import { Services } from "@/services/services";

export default {
  props: {
    tokenizeQuery: {
      type: Boolean
    },
    routeQuery: {
      type: [String, Array]
    }
  },
  data() {
    return {
      content: "",
      tokens: [],
      colors: ["#372118", "#725144"],
      tokenize: false
    };
  },
  watch: {
    tokenizeQuery() {
      if (this.tokenizeQuery) {
        this.doTokenizeQuery();
      }
    },
    routeQuery() {
      if (!this.routeQuery) {
        this.$refs.textarea.innerText = "";
      } else if (this.routeQuery && this.$refs.textarea.innerText === "") {
        this.$refs.textarea.innerText = this.routeQuery;
      }
    }
  },
  methods: {
    updateHTML(e) {
      this.content = e.target.innerText.trim();
      this.$emit("input", e.target.innerText);
    },
    async doTokenizeQuery() {
      // Execute tokenize query
      this.$refs.textarea.innerText = "";
      const res = await Services.tokenize(this.content);
      this.tokens = res && res.data ? res.data.tokens : [];
      if (!this.tokens.length) {
        this.$toasted.error("No results found", { duration: 5000 });
      }
      this.tokenize = true;
      console.log("tokenized query =", this.tokens);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/index.scss";

.customTextArea-Wrapper {
  width: 100%;
  display: flex;
  justify-content: center;

  .customTextArea {
    width: 25.5rem;
    height: 37rem;
    color: hsla(17, 39%, 15%, 1);
    outline: none;
    padding-top: 60px;
    padding-left: 30px;
    font-size: 2.5em;
    font-family: $tib-font;
    border-radius: 0.2rem;
    box-shadow: 0px 9px 14px -7px rgba(55, 33, 24, 0.3);
    background-color: hsla(36, 100%, 95%, 1);

    @include breakpointMax(small) {
      width: 100%;
      height: 7.2rem;
      white-space: nowrap;
      display: inline;
      overflow-x: scroll;
      overflow-y: hidden;
      font-size: 2em;
    }

    span {
      display: inline-block;
    }
  }
}
</style>
