<template>
  <b-container class="home" fluid>
    <b-row class="padma-logo-mobile">
      <b-col class="padma-logo-img justify-content-center">
        <img src="@/assets/images/padma.png" @click="goHome" />
      </b-col>
    </b-row>
    <b-row class="row input-area">
      <b-col md="4">
        <customTextArea
          v-model="queryString"
          :routeQuery="queryString"
          :tokenizeQuery="tokenizeQuery"
        />
        <label>
          <input type="checkbox" name="tokenize" v-model="tokenizeQuery" />
          <span>Tokenize query</span>
        </label>
        <b-button @click="lookup()">
          LOOKUP <span class="greater-than-arrow"> > </span>
        </b-button>
      </b-col>
      <b-col class="padma-logo justify-content-center" md="1">
        <img src="@/assets/images/padma.png" @click="goHome" />
      </b-col>
      <b-col class="menu-list" md="7">
        <b-row class="menu-list-items">
          <b-col>
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
          </b-col>
        </b-row>
        <b-row class="main-content-area">
          <b-col>
            <!-- Main content here -->
            <router-view />
          </b-col>
        </b-row>
        <b-row class="footer">
          <b-col>
            <label> About </label>
            <label> Privacy </label>
            <label> Terms & Condition </label>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <b-row class="menu-dropdown">
      <b-col class="for-mobile">
        <b-row class="select">
          <b-col>
            <v-select
              :options="options"
              @input="setSelectedfunction"
              v-model="selectedMenu"
              class="selectMenu"
              :clearable="false"
            >
            </v-select>
          </b-col>
        </b-row>
        <b-row class="main-content-mobile">
          <b-col>
            <!-- Main content here for mobile -->
            <router-view />
          </b-col>
        </b-row>
        <b-row class="footer-mobile">
          <b-col>
            <label> About </label>
            <label> Privacy </label>
            <label> Terms & Condition </label>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
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
    }
  },
  mounted() {
    if (this.$route.query.query) {
      this.queryString = this.$route.query.query;
    }
  },
  methods: {
    lookup() {
      this.setSelectedfunction();
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
.home {
  margin: 0;
  justify-content: center;
  padding: 0rem 2.5rem 0 2.5rem;
  label {
    cursor: pointer;
  }
  @include breakpoint(medium) {
    display: flex;
    height: 100vh;
    align-items: center;
  }
  .padma-logo-mobile {
    margin-bottom: 2rem;
    .padma-logo-img {
      display: grid;
      img {
        width: 4rem;
        opacity: 0.5;
        transition: opacity 2s;
      }
      img:hover {
        opacity: 1;
        cursor: pointer;
      }
    }
    @include breakpoint(medium) {
      display: none;
    }
  }
  .input-area {
    width: 100%;

    .btn {
      float: right;
      margin-right: 1rem;
      margin-top: 0.6rem;
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
    .padma-logo {
      display: none;
    }
    .menu-list {
      display: none;
    }
    @include breakpoint(medium) {
      textarea {
        height: 37rem;
        padding: 2rem;
        text-transform: uppercase;
      }
      .padma-logo {
        display: grid;
        align-items: center;
        img {
          width: 5rem;
        }
        img:hover {
          opacity: 1;
          cursor: pointer;
        }
      }
      .menu-list {
        display: block;
        font-size: 1em;
        text-transform: uppercase;
        padding-top: 1rem;

        label {
          padding-right: 2rem;
          font-weight: 600;
        }
        .menu-list-items {
          .active {
            color: $dropdown-color;
            text-decoration: underline;
            text-underline-offset: 0.4em;
            text-decoration-thickness: 0.2em;
          }
        }
        .main-content-area {
          border: none;
          height: 30rem;
          overflow-y: scroll;
          padding-top: 2rem;
        }
        .footer {
          text-transform: none;
          color: $footer-text-color;
          padding-top: 5rem;
          display: grid;
          justify-content: start;

          label {
            font-weight: normal;
          }
        }
      }
    }
  }
  .menu-dropdown {
    padding-top: 1.5rem;
    .for-mobile {
      .main-content-mobile {
        padding-top: 2rem;
      }
      .footer-mobile {
        color: $footer-text-color;
        padding-top: 2rem;
        label {
          padding-right: 2rem;
        }
      }
    }

    @include breakpoint(medium) {
      .for-mobile {
        display: none;
      }
    }
  }
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
