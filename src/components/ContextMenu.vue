<template>
  <vue-context class="dropdown-menu" ref="menu">
    <li>
      <a id="dictionary_lookup" @click.prevent="doDictLookup"
        >dictionary lookup</a
      >
    </li>
    <li>
      <a id="search_texts" @click.prevent="doSearchTexts">search texts</a>
    </li>
    <li>
      <a id="render_words" @click.prevent="doSimilarWords">similar words</a>
    </li>
    <li>
      <a id="word_statistics" @click.prevent="doWordStats">word statistics</a>
    </li>
    <li>
      <a id="tokenize" @click.prevent="doTokenize">tokenize</a>
    </li>
  </vue-context>
</template>

<script>
import { VueContext } from "vue-context";

export default {
  name: "contextmenu",

  components: {
    VueContext
  },

  data() {
    return {
      selectedText: ""
    };
  },

  methods: {
    openMenu(event, data) {
      // Store selection, as menu opening clears this
      this.selectedText = this.getSelectionText();

      this.$refs.menu.open(event, data);
    },

    doDictLookup() {
      this.$router.push(`/dictionary_lookup?query=${this.selectedText}`);
    },

    doSearchTexts() {
      this.$router.push(`/search_texts?query=${this.selectedText}`);
    },

    doSimilarWords() {},

    doWordStats() {
      this.$router.push(`/word_statistics?query=${this.selectedText}`);
    },

    doTokenize() {
      this.$router.push(`/tokenize?query=${this.selectedText}`);
    },

    getSelectionText() {
      let text = "";
      if (window.getSelection) {
        text = window.getSelection().toString();
      } else if (document.selection && document.selection.type !== "Control") {
        text = document.selection.createRange().text;
      }
      return text;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~vue-context/src/sass/vue-context";

.dropdown-menu {
  z-index: 1000;
  background-color: white;
  border-width: 2px;
  border-radius: 5px;
  border-style: solid;
  border-color: black;
  font-size: x-large;
  font-family: "Tinos", serif;

  li {
    cursor: pointer;
  }
}
</style>
