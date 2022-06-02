<template>
  <b-container class="home" fluid>
    <div class="search-area" md="4">
      <div class="menu-list-items">
        <label
          :class="{ active: tabSelected === 'dictionary' }"
          @click="selectedTab('dictionary')"
        >
          Dictionary
        </label>
        <label
          :class="{ active: tabSelected === 'texts' }"
          @click="selectedTab('texts')"
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
          @click="selectedTab('statistics')"
        >
          Statistics
        </label>
        <label
          :class="{ active: tabSelected === 'tokenize' }"
          @click="selectedTab('tokenize')"
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
          :setTokenizeQuery="setTokenizeQuery"
        />
        <div class="textArea-footer">
          <label>
            <input
              type="checkbox"
              name="tokenize"
              v-model="setTokenizeQuery"
              :disabled="disableTokenization"
            />
            <span :class="{ disable: disableTokenization }">Tokenize</span>
          </label>
          <b-dropdown
            @click="lookup()"
            split
            :text="btnLabel"
            class="look-up-btn m-2"
            v-if="tabSelected === 'dictionary'"
          >
            <b-dropdown-item href="#" @click="searchType = 'exact'">
              <div class="selectedIcon">
                <img
                  src="@/assets/images/done.svg"
                  v-show="searchType === 'exact'"
                />
              </div>
              Exact Match
            </b-dropdown-item>
            <b-dropdown-item href="#" @click="searchType = 'partial'">
              <div class="selectedIcon">
                <img
                  src="@/assets/images/done.svg"
                  v-show="searchType === 'partial'"
                />
              </div>
              Partial Match
            </b-dropdown-item>
          </b-dropdown>
          <b-button @click="lookup()" v-else>
            LOOKUP <span class="greater-than-arrow"> > </span>
          </b-button>
          <!-- <b-dropdown
            aria-role="list"
            v-bind:text="
              selectedSearch.id == 0 ? 'LOOKUP' : selectedSearch.name
            "
            v-if="tabSelected === 'dictionary'"
          >
            <b-dropdown-item
              v-for="(searchItem, index) in searchTypeList"
              :key="index"
              aria-role="listitem"
              @click="setItem(searchItem)"
              >{{ searchItem.name }}</b-dropdown-item
            >
          </b-dropdown>
          <b-button @click="lookup()" v-else>
            LOOKUP <span class="greater-than-arrow"> > </span>
          </b-button> -->
        </div>
      </div>
    </div>
    <div class="content-area" md="7">
      <div>
        <!-- Main content here -->
        <router-view />
      </div>
    </div>
    <messageBox :message="errorMessage" />
    <selectDictionary :message="selectedDictionary" />
  </b-container>
</template>

<script>
import { Services } from "@/services/services";
import customTextArea from "@/components/Sub/customTextArea.vue";
import messageBox from "@/components/Sub/messageBox.vue";
import selectDictionary from "@/components/Sub/selectDictionary.vue";
import { mapState } from "vuex";

export default {
  name: "mainview",
  components: {
    customTextArea,
    messageBox,
    selectDictionary
  },
  data() {
    return {
      queryString: "",
      routeQuery: "",
      tabSelected: "dictionary",
      selectedMenu: "Select Action",
      setTokenizeQuery: false,
      tokens: [],
      colors: ["#372118", "#725144"],
      errorMessage: "",
      disableTokenization: false,
      previousTab: "",
      counter: 0,
      partial_match: false,
      selectedDictionary: [],
      searchType: "exact",
      btnLabel: "LOOKUP",
      searchTypeList: [
        {
          id: 1,
          name: "Exact Search"
        },
        {
          id: 2,
          name: "Partial Search"
        }
      ],
      selectedSearch: {
        id: 0,
        name: ""
      }
    };
  },
  computed: {
    ...mapState(["lktSessionStart", "options"])
  },
  watch: {
    searchType() {
      this.searchType === "partial"
        ? (this.btnLabel = "PARTIAL")
        : (this.btnLabel = "LOOKUP");
    },
    $route() {
      if (this.$route.name === "lkt") {
        this.tabSelected = "lkt";
        this.$store.commit("updateLktSession", true);
        this.setDefaultDic();
      }
    },
    setTokenizeQuery() {
      if (this.setTokenizeQuery && this.queryString) {
        this.doTokenizeQuery();
      }
    },
    "$route.query.query"() {
      this.detectedRouterQuery();
    },
    tabSelected() {
      if (this.tabSelected === "texts" || this.tabSelected === "statistics") {
        this.disableTokenization = true;
      } else if (this.tabSelected === "tokenize") {
        this.setTokenizeQuery = true;
        this.disableTokenization = true;
      } else {
        this.disableTokenization = false;
      }
    }
  },
  mounted() {
    this.detectedRouterQuery();
    this.$root.$on("turnOffTokenization", () => {
      if (this.tabSelected === "tokenize") {
        this.setTokenizeQuery = true;
        this.callSelectedTabFunction();
      } else {
        this.setTokenizeQuery = false;
        this.callSelectedTabFunction();
      }
    });
    this.$root.$on("partialSearch", val => {
      console.log("main view partial =", val);
      this.setSelectedfunction();
    });
    this.$root.$on("closeModal", () => {
      this.tabSelected = this.previousTab;
    });
    this.$root.$on("onEnterSearch", () => {
      this.lookup();
    });
    if (!this.lktSessionStart) {
      this.setDefaultDic();
    }
  },
  methods: {
    lookup() {
      if (this.tabSelected === "dictionary") {
        if (this.searchType === "partial") {
          this.partialMatch();
        } else {
          this.partial_match = false;
          this.setSelectedfunction();
        }
      } else {
        this.setSelectedfunction();
      }
    },
    selectedTab(val) {
      this.previousTab = this.tabSelected;
      this.tabSelected = val;
      this.callSelectedTabFunction();
    },
    callSelectedTabFunction() {
      if (this.setTokenizeQuery) {
        if (this.tabSelected === "texts") {
          this.errorMessage =
            "You have to turn Tokenize off before searching texts";
          this.showMessageBox();
        } else if (this.tabSelected === "statistics") {
          this.errorMessage =
            "You have to turn Tokenize off before analyzing word statistics";
          this.showMessageBox();
        } else {
          this.setSelectedfunction();
        }
      } else if (this.tabSelected === "dictionary") {
        this.partial_match ? this.partialMatch() : this.setSelectedfunction();
      } else {
        this.setSelectedfunction();
        this.btnLabel = "LOOKUP";
        this.searchType = "exact";
        this.partial_match = false;
      }
    },
    setDefaultDic() {
      const list = [
        {
          id: 8,
          name: "Tony duff",
          value: "tony_duff",
          checked: true
        },
        {
          id: 9,
          name: "Lotus king",
          value: "lotus_king_trust",
          checked: true
        }
      ];
      this.$store.commit("setDicToDefaultList", list);
    },
    detectedRouterQuery() {
      this.routeQuery = this.$route.query.query;
      if (this.$route.name === "searchtexts") {
        this.tabSelected = "texts";
      } else if (this.$route.name === "wordstatistics") {
        this.tabSelected = "statistics";
      } else if (this.$route.name === "tokenize") {
        this.tabSelected = "tokenize";
      } else if (this.$route.name === "lkt") {
        this.tabSelected = "lkt";
        this.$store.commit("updateLktSession", true);
      }
    },
    doLktLookup() {
      this.$router.push(
        `lkt?query=${this.queryString}&tokenize=${this.setTokenizeQuery}`
      );
    },
    doDictionaryLookup() {
      this.counter++;
      this.$router.push(
        `dictionary_lookup?query=${this.queryString}&partial_match=${this.partial_match}&tokenize=${this.setTokenizeQuery}&count=${this.counter}`
      );
    },
    doSearchTexts() {
      this.$router.push(`search_texts?query=${this.queryString}`);
    },
    doWordStats() {
      this.$router.push(`word_statistics?query=${this.queryString}`);
    },
    doTokenize() {
      this.$router.push(`tokenize?query=${this.queryString}`);
    },
    setSelectedfunction() {
      switch (this.tabSelected) {
        case "lkt":
          this.doLktLookup();
          break;
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
      this.queryString = this.tokens.join("");
    },
    showMessageBox() {
      this.$root.$emit("bv::show::modal", "messageBox");
    },
    setItem(product) {
      this.selectedProduct = product;
      product.id === 1 ? this.exactMatch() : this.partialMatch();
    },
    partialMatch() {
      this.partial_match = true;
      this.selectedDictionary = this.options.filter(a => a.checked);
      if (this.setTokenizeQuery) {
        this.errorMessage =
          "You have to turn Tokenize off before doing partial search";
        this.showMessageBox();
      } else {
        this.$root.$emit("bv::show::modal", "selectDictionary");
      }
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

    @include breakpointMax(small) {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }

    .menu-list-items {
      padding-left: 3rem;
      font-size: 1.1em;
      margin-bottom: 1.2rem;
      text-transform: uppercase;

      @include breakpointMax(small) {
        width: 88%;
        padding-left: 0;
        font-size: 0.8em;
      }

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
      @include breakpointMax(small) {
        width: 88%;

        .place-holder-text {
          left: 29px;
          font-size: 0.8em;
        }
      }
      .textArea-footer {
        display: flex;
        justify-content: space-between;
        padding-top: 1rem;
        align-items: center;
        width: 25.5rem;
        position: relative;

        @include breakpointMax(small) {
          width: 98%;
        }

        .disable {
          opacity: 0.3;
        }

        .look-up-btn {
          width: 9rem;
          height: 2rem;
          border: none;
          margin-right: 0 !important;
          box-shadow: 0px 2px 2px rgba(55, 33, 24, 0.25);

          .selectedIcon {
            display: inline-block;
            width: 1.5rem;
            img {
              width: 1.5rem;
              padding-right: 0.3rem;
            }
          }
        }
        .greater-than-arrow {
          padding-left: 0.5rem;
          font-weight: bold;
          padding-bottom: 0.07rem;
        }
        label {
          margin-bottom: 0;
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
          }
        }
      }
    }
  }

  .content-area {
    width: 100%;
    height: 100%;
    padding-top: 5.5rem;
    padding-left: 3rem;

    @include breakpoint(medium) {
      width: calc(100vw - $search-area-width);
      padding-left: 0;
    }
    @include breakpointMax(small) {
      padding-top: 2rem;
      padding-left: 2.4rem;
      height: 100%;
    }
  }
}
</style>
<style lang="scss">
@import "@/assets/scss/index.scss";
.btn {
  background-color: $secondary-color !important;
  border-color: $footer-text-color !important;
  height: 2rem !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
}
// .dropdown-toggle::after {
//   margin-left: 1em !important;
// }
.dropdown-item {
  padding-left: 0.6rem !important;
}
</style>
