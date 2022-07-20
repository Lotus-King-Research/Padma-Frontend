<template>
  <b-container class="wrapper" fluid>
    <b-row>
      <b-col class="co-occurence" cols="3">
        <label class="title"> Co-occurrence </label>
        <div>
          <template v-for="(mcv, idx) in results.most_common_value">
            <div :key="idx">
              <label class="text">
                {{ results.most_common_key[idx] }}
              </label>
              <label class="count">
                ( {{ results.most_common_value[idx] }} )</label
              >
            </div>
          </template>
        </div>
      </b-col>
      <b-col class="frequency" cols="9">
        <label class="title"> Frequency by: </label>
        <label class="tabs">
          <span
            @click="title = true"
            class="titleText"
            :class="{ activeTab: title }"
          >
            TITLE
          </span>
          <span
            @click="title = false"
            class="verbatim"
            :class="{ activeTab: !title }"
          >
            VERBATIM
          </span>
        </label>
        <b-container v-if="title">
          <template v-for="(pv, idx) in results.prominence_value">
            <b-row :key="idx" class="byTitle">
              <b-col class="icon" cols="1">
                <SquareRounded :fillColor="color(pv)" :size="15" />
              </b-col>
              <b-col class="value" cols="11">
                <label @click="renderText(results.prominence_key[idx])">
                  {{ results.prominence_name[idx] }}
                </label>
              </b-col>
            </b-row>
          </template>
        </b-container>
        <b-container v-else>
          <template v-for="(cov, idx) in results.co_occurance_value">
            <b-row :key="idx">
              <b-col>
                <label class="text">
                  <span v-html="highLightQuery(results.co_occurance_key[idx])">
                  </span>
                </label>
                <label class="count">
                  ( {{ results.co_occurance_value[idx] }} )
                </label>
              </b-col>
            </b-row>
          </template>
        </b-container>
      </b-col>
      <noResultsFound
        :message="noResultsFoundMsg + searchQuery"
        v-if="noResultsFound"
      />
      <noResultsFound :message="noInputMsg" v-if="noInputMessageFlag" />
    </b-row>
    <textModal :titleText="titleText" :searchQuery="searchQuery" />
  </b-container>
</template>

<script>
import { Services } from "@/services/services";
import SquareRounded from "vue-material-design-icons/SquareRounded.vue";
import noResultsFound from "@/components/Sub/noResultsFound.vue";

export default {
  name: "wordstatistics",
  components: {
    SquareRounded,
    textModal: () => import("@/components/Sub/textModal.vue"),
    noResultsFound
  },

  data() {
    return {
      results: {},
      title: true,
      titleText: "",
      tokenize: false,
      noResultsFound: false,
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
      this.doWordStatistics();
    }
  },

  mounted() {
    this.doWordStatistics();
  },

  methods: {
    async doWordStatistics() {
      // Execute word statistics query
      this.noResultsFound = false;
      this.noInputMessageFlag = false;
      if (this.searchQuery) {
        const res = await Services.wordStatistics(
          this.searchQuery,
          this.tokenize
        );
        if (res && res.data) {
          this.results = res.data;
        } else if (res.response && res.response.data) {
          if (res.response.data.detail === "Not Found") {
            this.noResultsFound = true;
          }
        }
      } else {
        this.noInputMessageFlag = true;
      }
    },

    gotoProminenceLink(idx) {
      this.$router.push(
        `/render_text?title=${this.results.prominence_key[idx]}`
      );
    },
    color(value) {
      const opacity = 0.1 + value * 0.8;
      return "rgba(134,27,21," + parseFloat(opacity) + ")";
    },
    highLightQuery(text) {
      return text.replaceAll(
        this.searchQuery,
        `<span class="highlight">${this.searchQuery}</span>`
      );
    },
    renderText(title) {
      this.titleText = title;
      this.$root.$emit("bv::show::modal", "textModal");
      this.$root.$emit("renderTextStatistics");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/index.scss";
.wrapper {
  width: 100%;
  height: calc(100vh - 10rem);
  overflow-y: scroll;
  padding-right: 1rem;
  padding-left: 0;
  $title-size: 0.8em;
  $bottom-padding-value: 1.2rem;
  $text-font-size: 2.3em;
  margin: 0;

  @include breakpoint(medium) {
    padding-right: 3rem;
  }
  @include breakpointMax(small) {
    font-size: 0.7em;
    height: 100%;
    overflow-y: none;
  }
  .co-occurence {
    border-right: solid 0.3rem $secondary-color;
    .title {
      text-transform: uppercase;
      font-size: $title-size;
      padding-bottom: $bottom-padding-value;
    }
    .text {
      display: inline;
      font-size: $text-font-size;
    }
    .count {
      color: hsla(37, 18%, 45%, 1);
    }
  }
  .frequency {
    padding-left: 3rem;
    .title {
      text-transform: uppercase;
      font-size: $title-size;
      padding-bottom: $bottom-padding-value;
      padding-right: 1rem;
    }
    .tabs {
      @extend .title;
      font-weight: bold;
      .titleText {
        padding-right: 1rem;
        cursor: pointer;
      }
      .verbatim {
        cursor: pointer;
      }
      .activeTab {
        color: $dropdown-color;
        text-decoration: underline;
        text-underline-offset: 0.4em;
        text-decoration-thickness: 0.2em;
      }
    }
    .container {
      padding: 0;
      .byTitle {
        .icon {
          padding-top: 0.3rem;
        }
        .value {
          font-size: 1.5em;
          label {
            cursor: pointer;
          }
        }
      }
      .text {
        display: inline;
        font-size: $text-font-size;
        ::v-deep .highlight {
          color: $secondary-color;
        }
      }
      .count {
        padding-left: 0.4rem;
        color: hsla(37, 18%, 45%, 1);
      }
    }
  }
}
</style>
