<template>
  <b-container fluid>
    <b-row class="text-container">
      <template v-for="(t, idx) in textData.title">
        <b-col
          cols="12"
          :key="idx"
          class="tibetan-text"
          :id="textData.title[idx]"
        >
          <h1>
            {{ textData.text_title[idx] }}
          </h1>
        </b-col>
        <b-col cols="11" :key="'span' + idx" class="tibetan-source" id="source">
          <span>
            {{ textData.text[idx] }}
          </span>
        </b-col>
        <b-col cols="1" class="arrow-icon" :key="'i' + idx">
          <div class="arrow" @click="openTextModal(idx)">
            <img src="@/assets/images/icon-right-arrow.svg" />
          </div>
        </b-col>
        <b-col cols="12" class="horz-line" :key="'hr' + idx">
          <hr align="left" />
        </b-col>
      </template>
      <noResultsFound
        :message="noResultsFoundMsg + searchQuery"
        v-if="noResultsFound"
      />
      <noResultsFound :message="noInputMsg" v-if="noInputMessageFlag" />
      <textModal :title="title" :start="start" :end="end" />
      <infinite-loading
        @infinite="fetchMoreData"
        v-if="searchQuery"
        ref="infiniteLoadingCom"
        spinner="spiral"
      >
        <span slot="no-more">{{ endOfResultText }}</span>
      </infinite-loading>
    </b-row>
  </b-container>
</template>

<script>
import { Services } from "@/services/services";
import InfiniteLoading from "vue-infinite-loading";
import noResultsFound from "@/components/Sub/noResultsFound.vue";

export default {
  name: "searchtexts",
  components: {
    textModal: () => import("@/components/Sub/textModal.vue"),
    InfiniteLoading,
    noResultsFound
  },

  data() {
    return {
      results: {},
      title: "",
      start: "",
      end: "",
      limit: 10,
      textData: {},
      tokenize: false,
      noResultsFound: false,
      endOfResultText: "",
      noInputMessageFlag: false,
      noResultsFoundMsg: "No results found for ",
      noInputMsg:
        "Start by entering a word or a segment of text in Tibetan or Wylie"
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
      this.endOfResultText = "";
      this.noResultsFound = false;
      this.noInputMessageFlag = false;
      this.textData = {};
      if (this.searchQuery) {
        const res = await Services.searchTexts(this.searchQuery, this.tokenize);
        if (res && res.data) {
          this.results = res.data;
          if (Object.keys(this.results).length && this.results.title.length) {
            this.$refs.infiniteLoadingCom.stateChanger.reset();
            this.loadMoreData();
          } else {
            this.noResultsFound = true;
          }
        } else if (res.response && res.response.data) {
          if (res.response.data.detail === "Not Found") {
            this.noResultsFound = true;
          }
        }
      } else {
        this.noInputMessageFlag = true;
      }
    },
    fetchMoreData($state) {
      setTimeout(() => {
        if (Object.keys(this.results).length && this.results.title.length) {
          this.loadMoreData($state);
        }
      }, 300);
    },
    loadMoreData($state) {
      const data = {};
      let count = 0;
      if (Object.keys(this.textData).length > 0) {
        count = this.textData.location.length;
      }
      (data.query = this.results.query),
        (data.location = this.results.location.slice(
          count,
          count + this.limit
        )),
        (data.text = this.results.text.slice(count, count + this.limit)),
        (data.text_title = this.results.text_title.slice(
          count,
          count + this.limit
        )),
        (data.title = this.results.title.slice(count, count + this.limit)),
        (data.start = "");
      if (Object.keys(this.textData).length > 0) {
        data.location.forEach((item, index) => {
          this.textData.location.push(data.location[index]);
          this.textData.text_title.push(data.text_title[index]);
          this.textData.title.push(data.title[index]);
          this.textData.text.push(data.text[index]);
        });
        if (this.results.location.length === this.textData.location.length) {
          this.endOfResultText = "You have reached the end of the results.";
          $state.complete();
        } else {
          $state.loaded();
        }
      } else {
        this.textData = { ...data };
      }
      this.$forceUpdate();
    },
    async openTextModal(idx) {
      let renderTextResult = await this.renderText(idx);
      if (renderTextResult) {
        this.$root.$emit("bv::show::modal", "textModal");
        this.$root.$emit("renderText");
      }
    },

    renderText(idx) {
      let startTemp = this.results.location[idx];
      let endTemp = this.results.location[idx];
      this.start = startTemp;
      this.end = endTemp + 2;
      this.title = this.results.title[idx];
      return true;
      // this.$router.push(
      //   `/render_text?title=${this.results.title[idx]}&text_title=${this.results.text_title[idx]}&start=${start}&end=${end}`
      // );
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/index.scss";

.container-fluid {
  height: calc(100vh - 10rem);
  overflow-y: scroll;
  padding-right: 3.5rem;
  padding-top: 0.3rem;
  @include breakpoint(medium) {
    padding-right: 3rem;
  }
  @include breakpointMax(small) {
    padding-right: 3rem;
    height: calc(100vh - 15rem);
  }
  .text-container {
    .tibetan-text {
      font-family: $tib-font;
      padding-left: 0;

      @include breakpointMax(small) {
        h1 {
          font-size: 2em;
        }
      }
    }
    .tibetan-source {
      font-family: $tib-font;
      font-size: x-large;
      padding-left: 0;
      padding-top: 0.5rem;
      padding-right: 1.5rem;
      padding-bottom: 0.8rem;
      color: $secondary-color;

      @include breakpointMax(small) {
        font-size: 1.2em;
      }
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
        cursor: pointer;
      }
    }
    .horz-line {
      margin-bottom: 3rem;
      padding-right: 0;
      padding-left: 0;
      hr {
        margin: 0;
        height: 2px;
        background-color: $secondary-color;
      }
      @include breakpointMax(small) {
        margin-bottom: 2.5rem;
      }
    }
  }
}
</style>
