<template>
  <b-container class="home" fluid>
    <b-row class="padma-logo-mobile">
      <b-col class="padma-logo-img justify-content-center">
        <img src="@/assets/images/padma.png" @click="goHome" />
      </b-col>
    </b-row>
    <b-row class="row input-area">
      <b-col md="4">
        <textarea
          type="text"
          class="form-control cursor form-css"
          v-model="queryString"
          placeholder="Enter Tibetan Text"
        ></textarea>
        <label>
          <input type="checkbox" name="tokenize" />
          <span>Tokenize query</span>
        </label>
      </b-col>
      <b-col class="padma-logo justify-content-center" md="1">
        <img src="@/assets/images/padma.png" @click="goHome" />
      </b-col>
      <b-col class="menu-list">
        <b-row class="menu-list-items">
          <b-col>
            <label
              :class="{ active: tabSelected === 'dictionary' }"
              @click="doDictionaryLookup"
            >
              Dictionary
            </label>
            <label
              :class="{ active: tabSelected === 'texts' }"
              @click="doSearchTexts"
            >
              Texts
            </label>
            <label
              :class="{ active: tabSelected === 'similarWords' }"
              @click="doSimilarWords"
            >
              Similar Words
            </label>
            <label
              :class="{ active: tabSelected === 'statistics' }"
              @click="doWordStats"
            >
              Statistics
            </label>
            <label
              :class="{ active: tabSelected === 'tokenize' }"
              @click="doTokenize"
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
export default {
  name: "mainview",
  data() {
    return {
      queryString: "",
      tabSelected: "dictionary",
      selectedMenu: "Select Action",
      options: [
        { label: "Dictionary", value: "dictionary", id: 1 },
        { label: "Texts", value: "texts", id: 2 },
        { label: "Similar Words", value: "similarWords", id: 3 },
        { label: "Statistics", value: "statistics", id: 4 },
        { label: "Tokenize", value: "tokenize", id: 5 }
      ]
    };
  },
  mounted() {
    if (this.$route.query.query) {
      this.queryString = this.$route.query.query;
    }
  },
  methods: {
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

    doSimilarWords() {
      const value = "similarWords";
      this.tabSelected = value;
      this.selectedMenu = value;
      this.$router.push(`find_similar?query=${this.queryString}`);
    },

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
      this.$router.push("/");
    },
    setSelectedfunction() {
      switch (this.selectedMenu.value) {
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
    }

    // goHome() {
    //   this.$router.push("/home");
    // },

    // openMenu(event, data) {
    //   this.$refs.cmenu.openMenu(event, data);
    // },

    // goBack() {
    //   window.history.back();
    // }
  }
};
</script>
<style lang="scss" scoped>
@import "vue-select/src/scss/vue-select.scss";
@import "@/assets/scss/index.scss";
.home {
  margin: 0;
  padding: 0rem 2.5rem 0 2.5rem;
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
    textarea {
      height: 20rem;
      letter-spacing: 0.1rem;
      font-family: $tib-font;
      padding: 1.5rem;
      font-size: 2.5rem;
      border: none;
      outline: none;
      box-shadow: 0px 9px 14px -7px rgba(55, 33, 24, 0.3);
    }
    textarea::placeholder {
      font-size: 1rem;
      font-family: $en-font;
      color: $dropdown-color;
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
          opacity: 0.5;
          transition: opacity 2s;
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
