<template>
  <b-container class="home" fluid>
    <div class="search-area" md="4">
      <div class="menu-list-items">
        <label
          :class="{ active: tabSelected === 'dictionary' }"
          @click="tabSelected = 'dictionary'"
        >
          Dictionary
        </label>
        <label
          :class="{ active: tabSelected === 'texts' }"
          @click="tabSelected = 'texts'"
        >
          Texts
        </label>
        <!-- <label
          :class="{ active: tabSelected === 'similarWords' }"
        >
          Similar Words
        </label> -->
        <label
          :class="{ active: tabSelected === 'statistics' }"
          @click="tabSelected = 'statistics'"
        >
          Statistics
        </label>
        <label
          :class="{ active: tabSelected === 'tokenize' }"
          @click="tabSelected = 'tokenize'"
        >
          Tokenize
        </label>
      </div>
      <div class="textArea">
        <div class="place-holder-text">
          <label> Enter Tibetan Text </label>
        </div>
        <customTextArea
          v-model="queryString"
          :routeQuery="routeQuery"
          :tokenizeQuery="tokenizeQuery"
        />
        <div class="textArea-footer">
          <label>
            <input type="checkbox" name="tokenize" v-model="tokenizeQuery" />
            <span>Tokenize query</span>
          </label>
          <b-button @click="lookup()">
            LOOKUP <span class="greater-than-arrow"> > </span>
          </b-button>
        </div>
      </div>
    </div>
    <div class="content-area" md="7">
      <div>
        <!-- Main content here -->
        <router-view />
      </div>
    </div>
  </b-container>
</template>

<script>
import { Services } from "@/services/services";
import customTextArea from "@/components/Sub/customTextArea.vue";

export default {
  name: "mainview",
  components: {
    customTextArea
  },
  data() {
    return {
      queryString: "",
      routeQuery: "",
      tabSelected: "dictionary",
      selectedMenu: "Select Action",
      tokenizeQuery: false,
      tokens: [],
      colors: ["#372118", "#725144"],
      options: [
        { label: "Dictionary", value: "dictionary", id: 1 },
        { label: "Texts", value: "texts", id: 2 },
        { label: "Similar Words", value: "similarWords", id: 3 },
        { label: "Statistics", value: "statistics", id: 4 },
        { label: "Tokenize", value: "tokenize", id: 5 }
      ]
    };
  },
  computed: {
    inputStyles() {
      return {
        color: "red"
      };
    }
  },
  watch: {
    tokenizeQuery() {
      if (this.tokenizeQuery) {
        this.doTokenizeQuery();
      }
    },
    "$route.query.query"() {
      this.detectedRouterQuery();
    },
    tabSelected() {
      this.setSelectedfunction();
    }
  },
  mounted() {
    if (this.$route.query.query) {
      this.detectedRouterQuery();
    }
  },
  methods: {
    lookup() {
      this.setSelectedfunction();
    },
    detectedRouterQuery() {
      this.routeQuery = this.$route.query.query;
      if (this.$route.name === "searchtexts") {
        this.tabSelected = "texts";
      } else if (this.$route.name === "wordstatistics") {
        this.tabSelected = "statistics";
      } else if (this.$route.name === "tokenize") {
        this.tabSelected = "tokenize";
      }
    },
    doDictionaryLookup() {
      const value = "dictionary";
      this.tabSelected = value;
      this.selectedMenu = value;
      this.$router.push(`dictionary_lookup?query=${this.queryString}`);
    },
    doSearchTexts() {
      const value = "texts";
      this.tabSelected = value;
      this.selectedMenu = value;
      this.$router.push(`search_texts?query=${this.queryString}`);
    },

    // doSimilarWords() {
    //   const value = "similarWords";
    //   this.tabSelected = value;
    //   this.selectedMenu = value;
    //   this.$router.push(`find_similar?query=${this.queryString}`);
    // },

    doWordStats() {
      const value = "statistics";
      this.tabSelected = value;
      this.selectedMenu = value;
      this.$router.push(`word_statistics?query=${this.queryString}`);
    },

    doTokenize() {
      const value = "tokenize";
      this.tabSelected = value;
      this.selectedMenu = value;
      this.$router.push(`tokenize?query=${this.queryString}`);
    },
    goHome() {
      this.queryString = "";
      this.tabSelected = "dictionary";
      this.selectedMenu = "Select Action";
      this.tokenizeQuery = false;
      this.$router.push("/");
    },
    setSelectedfunction() {
      switch (this.selectedMenu.value || this.tabSelected) {
        case "dictionary":
          this.doDictionaryLookup();
          break;
        case "texts":
          this.doSearchTexts();
          break;
        case "similarWords":
          this.doSimilarWords();
          break;
        case "statistics":
          this.doWordStats();
          break;
        case "tokenize":
          this.doTokenize();
          break;
      }
    },
    async doTokenizeQuery() {
      // Execute tokenize query
      const res = await Services.tokenize(this.queryString);
      this.tokens = res && res.data ? res.data.tokens : [];
      if (!this.tokens.length) {
        this.$toasted.error("No results found", { duration: 5000 });
      }
      this.queryString = this.tokens;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "vue-select/src/scss/vue-select.scss";
@import "@/assets/scss/index.scss";

$search-area-width: 500px;
.home {
  display: flex;
  flex-direction: column;
  margin: 0;
  justify-content: center;
  padding: 0;
  label {
    cursor: pointer;
  }
  @include breakpoint(medium) {
    flex-direction: row;
    .content-area {
      width: 100%;
    }
  }
  .search-area {
    width: $search-area-width;
    height: 100%;
    // border-right: solid 1px #000;
    padding-top: 2rem;

    .menu-list-items {
      padding-left: 3rem;
      font-size: 1.1em;
      margin-bottom: 1.2rem;
      text-transform: uppercase;

      label {
        padding-right: 1.1rem;
        font-weight: 600;
      }
      .active {
        color: $dropdown-color;
        text-decoration: underline;
        text-underline-offset: 0.4em;
        text-decoration-thickness: 0.2em;
      }
    }
    .textArea {
      justify-content: center;
      display: flex;
      flex-wrap: wrap;
      position: relative;
      .place-holder-text {
        text-transform: uppercase;
        color: $dropdown-color;
        position: absolute;
        top: 18px;
        left: 80px;
        font-weight: bold;
      }
      .textArea-footer {
        width: 25.5rem;
        position: relative;

        .btn {
          position: absolute;
          right: 29px;
          top: -16px;
          width: 7rem;
          height: 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: $secondary-color;
          border: none;
        }
        .greater-than-arrow {
          padding-left: 0.5rem;
          font-weight: bold;
          padding-bottom: 0.07rem;
        }
        label {
          span {
            color: $dropdown-color;
          }
          input[type="checkbox"] {
            display: none;
          }
          input[type="checkbox"] + *::before {
            content: "";
            width: 1rem;
            height: 1rem;
            margin-right: 0.5rem;
            border-radius: 10%;
            border: solid 0.13rem $dropdown-color;
          }
          input[type="checkbox"]:checked + *::before {
            content: "✓";
            color: $dropdown-color;
            display: flex;
            align-items: center;
          }
          input[type="checkbox"]:checked + * {
            color: $dropdown-color;
          }
          input[type="checkbox"] + * {
            display: flex;
            align-items: center;
            padding-top: 1rem;
          }
        }
      }
    }
  }

  .content-area {
    width: 100%;
    height: 100%;
    padding-top: 1.7rem;
    padding-left: 3rem;

    @include breakpoint(medium) {
      width: calc(100vw - $search-area-width);
      padding-left: 0;
    }
  }

  // @include breakpoint(medium) {
  //   display: flex;
  //   height: 100vh;
  //   align-items: center;
  // }
  // .input-area {
  //   width: 100%;

  //   .greater-than-arrow {
  //     padding-left: 0.5rem;
  //     font-weight: bold;
  //     padding-bottom: 0.07rem;
  //   }
  //   label {
  //     span {
  //       color: $dropdown-color;
  //     }
  //     input[type="checkbox"] {
  //       display: none;
  //     }
  //     input[type="checkbox"] + *::before {
  //       content: "";
  //       width: 1rem;
  //       height: 1rem;
  //       margin-right: 0.5rem;
  //       border-radius: 10%;
  //       border: solid 0.13rem $dropdown-color;
  //     }
  //     input[type="checkbox"]:checked + *::before {
  //       content: "✓";
  //       color: $dropdown-color;
  //       display: flex;
  //       align-items: center;
  //     }
  //     input[type="checkbox"]:checked + * {
  //       color: $dropdown-color;
  //     }
  //     input[type="checkbox"] + * {
  //       display: flex;
  //       align-items: center;
  //       padding-top: 1rem;
  //     }
  //   }
  //   .menu-list {
  //     display: none;
  //   }
  //   @include breakpoint(medium) {
  //     textarea {
  //       height: 37rem;
  //       padding: 2rem;
  //       text-transform: uppercase;
  //     }
  //     .menu-list {
  //       display: block;
  //       font-size: 1.1em;
  //       text-transform: uppercase;

  //       label {
  //         padding-right: 2rem;
  //         font-weight: 600;
  //       }
  //       .menu-list-items {
  //         .active {
  //           color: $dropdown-color;
  //           text-decoration: underline;
  //           text-underline-offset: 0.4em;
  //           text-decoration-thickness: 0.2em;
  //         }
  //       }
  //       .main-content-area {
  //         border: none;
  //         padding-top: 2rem;
  //       }
  //     }
  //   }
  // }
  // .menu-dropdown {
  //   padding-top: 1.5rem;
  //   .for-mobile {
  //     .main-content-mobile {
  //       padding-top: 2rem;
  //     }
  //   }

  //   @include breakpoint(medium) {
  //     .for-mobile {
  //       display: none;
  //     }
  //   }
  // }
}
</style>
<style lang="scss">
@import "@/assets/scss/index.scss";
.select {
  .selectMenu {
    .vs__search::placeholder,
    .vs__dropdown-toggle {
      background: transparent;
      border-radius: 0px;
      border: none;
      border-bottom: solid 1px $dropdown-color;
      color: $dropdown-color;
      font-size: 1.2em;
      letter-spacing: 0.1rem;
      text-transform: lowercase;
      font-variant: small-caps;
    }
    .vs__dropdown-menu {
      background-color: $off-white;
    }
    .vs__actions {
      padding: 0.4rem 0.5rem;
      background-color: $dropdown-color;
    }
    .vs__open-indicator {
      fill: #fff;
    }
    .vs__selected {
      color: $dropdown-color;
    }
    .vs__dropdown-option {
      color: $primary-color;
      letter-spacing: 0.1rem;
      background-color: $off-white;
    }
    .vs__dropdown-option:hover {
      color: $dropdown-color;
    }
    .vs__dropdown-option--highlight {
      background: none;
    }
  }
}
</style>
