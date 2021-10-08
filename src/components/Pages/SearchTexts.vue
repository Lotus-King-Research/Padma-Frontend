<template>
  <b-container fluid>
    <b-row class="text-container">
      <template v-for="(t, idx) in results.title">
        <b-col
          cols="12"
          :key="idx"
          class="tibetan-text"
          :id="results.title[idx]"
        >
          <h1>
            {{ results.text[idx] }}
          </h1>
        </b-col>
        <b-col cols="11" :key="'span' + idx" class="tibetan-source" id="source">
          <span>
            {{ results.text_title[idx] }}
          </span>
        </b-col>
        <b-col cols="1" class="arrow-icon" :key="'i' + idx">
          <div class="arrow">
            <img
              src="@/assets/images/icon-right-arrow.svg"
              @click="openTextModal(idx)"
            />
          </div>
        </b-col>
        <b-col cols="12" class="horz-line" :key="'hr' + idx">
          <hr align="left" />
        </b-col>
      </template>
      <textModal :results="results" :index="index" />
    </b-row>
  </b-container>
</template>

<script>
import { Services } from "@/services/services";

export default {
  name: "searchtexts",
  components: {
    textModal: () => import("@/components/Sub/textModal.vue")
  },

  data() {
    return {
      results: {},
      index: null
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
      const res = await Services.searchTexts(this.searchQuery);
      this.results = res && res.data ? res.data : {};
      if (!Object.keys(this.results).length || !this.results.title.length) {
        this.$toasted.error("No results found", { duration: 5000 });
      }
    },
    openTextModal(idx) {
      this.index = idx;
      this.$root.$emit("bv::show::modal", "textModal");
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
@import "@/assets/scss/index.scss";

.text-container {
  .tibetan-text {
    font-family: $tib-font;
    padding-left: 0;
  }
  .tibetan-source {
    font-family: $tib-font;
    font-size: x-large;
    padding-left: 0;
    padding-top: 0.5rem;
    padding-right: 1.5rem;
    padding-bottom: 0.8rem;
    color: $secondary-color;
  }
  .arrow-icon {
    display: grid;
    justify-content: end;
    padding-right: 0;
    .arrow {
      width: 3rem;
      height: 100%;
      background-color: $secondary-color;
      display: grid;
      justify-content: center;
      align-items: center;
    }
  }
  .horz-line {
    margin-bottom: 3rem;
    padding-right: 0;
    padding-left: 0;
    hr {
      margin: 0;
      height: 0.1rem;
      background-color: $secondary-color;
    }
  }
}
</style>
