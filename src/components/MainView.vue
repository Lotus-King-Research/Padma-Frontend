<template>
  <b-container class="home" fluid>
    <div class="search-area" md="4">
      <div class="menu-list-items">
        <label
          :class="{ active: tabSelected === 'dictionary' }"
          @click="selectedTab('dictionary')"
        >
          Tibetan
        </label>
        <label
          :class="{ active: tabSelected === 'description' }"
          @click="selectedTab('description')"
        >
          Description
        </label>
        <!-- <label
          :class="{ active: tabSelected === 'texts' }"
          @click="selectedTab('texts')"
        >
          Texts
        </label> -->
        <!-- <label
          :class="{ active: tabSelected === 'similarWords' }"
        >
          Similar Words
        </label> -->
        <!-- <label
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
        </label> -->
      </div>
      <div class="textArea">
        <div class="place-holder-text">
          <label> {{ placeHolderText }} </label>
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
            v-if="tabSelected === 'dictionary' || tabSelected === 'lkt'"
          >
            <b-dropdown-item href="#" @click="matching = 'exact'">
              <div class="item-container">
                <div class="selectedIcon">
                  <img
                    src="@/assets/images/done.svg"
                    v-show="matching === 'exact'"
                  />
                </div>
                Exact Match
                <p>
                  Return the results that match exactly from one or more
                  dictionaries.
                </p>
              </div>
            </b-dropdown-item>
            <b-dropdown-item href="#" @click="matching = 'partial'">
              <div class="item-container">
                <div class="selectedIcon">
                  <img
                    src="@/assets/images/done.svg"
                    v-show="matching === 'partial'"
                  />
                </div>
                Partial Match
                <p>
                  Return the results that match partially from a single
                  dictionary.
                </p>
              </div>
            </b-dropdown-item>
            <b-dropdown-item href="#" @click="matching = 'similar'">
              <div class="item-container">
                <div class="selectedIcon">
                  <img
                    src="@/assets/images/done.svg"
                    v-show="matching === 'similar'"
                  />
                </div>
                Similar Match
                <p>
                  Return the results that have similar meaning from a single
                  dictionary.
                </p>
              </div>
            </b-dropdown-item>
            <b-dropdown-item href="#" @click="matching = 'fuzzy'">
              <div class="item-container">
                <div class="selectedIcon">
                  <img
                    src="@/assets/images/done.svg"
                    v-show="matching === 'fuzzy'"
                  />
                </div>
                Fuzzy Match
                <p>
                  Return the results that have a similar string from a single
                  dictionary.
                </p>
              </div>
            </b-dropdown-item>
          </b-dropdown>
          <b-button @click="lookup()" v-else-if="tabSelected === 'description'">
            Search Descriptions <span class="greater-than-arrow"> > </span>
          </b-button>
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
              v-for="(searchItem, index) in matchingList"
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
import lktDicList from "@/components/docs/lktDictionaryList.json";
import defaultDicList from "@/components/docs/defaultDicList.json";

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
      placeHolderText: "Enter Tibetan Text",
      tabSelected: "dictionary",
      selectedMenu: "Select Action",
      setTokenizeQuery: false,
      tokens: [],
      colors: ["#372118", "#725144"],
      errorMessage: "",
      disableTokenization: false,
      previousTab: "",
      counter: 0,
      selectedDictionary: [],
      matching: "exact",
      btnLabel: "EXACT MATCH",
      defaultDicData: [],
      localStoreValue: [],
      matchingList: [
        {
          id: 1,
          name: "Exact Search"
        },
        {
          id: 2,
          name: "Partial Search"
        },
        {
          id: 3,
          name: "Similar Search"
        },
        {
          id: 4,
          name: "Fuzzy Search"
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
    defaultDicData() {
      const firstArray = [...JSON.parse(localStorage.getItem("options"))];
      const secondArray = [...JSON.parse(JSON.stringify(this.defaultDicData))];
      const filterArray = firstArray.filter(object1 => {
        return !secondArray.some(object2 => {
          return object1.name === object2.name;
        });
      });
      if (filterArray.length > 0) {
        const finalArray = secondArray.filter(val => {
          return !filterArray.find(item => {
            return val.id === item.id;
          });
        });
        if (finalArray.length > 0) {
          localStorage.setItem("options", JSON.stringify(secondArray));
        }
      } else {
        localStorage.setItem("options", JSON.stringify(secondArray));
      }
      this.$store.commit("newDicAdded", secondArray);
      this.$root.$emit("viewUpdate");
    },
    matching() {
      switch (this.matching) {
        case "partial":
          this.btnLabel = "PARTIAL MATCH";
          break;
        case "exact":
          this.btnLabel = "EXACT MATCH";
          break;
        case "similar":
          this.btnLabel = "SIMILAR MATCH";
          break;
        case "fuzzy":
          this.btnLabel = "FUZZY MATCH";
          break;
      }
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
      // changing the input place holder text for description
      if (this.tabSelected === "description") {
        this.placeHolderText = "Enter Text";
      } else {
        this.placeHolderText = "Enter Tibetan Text";
      }
    }
  },
  mounted() {
    this.defaultDicData = [...defaultDicList];
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
      if (this.tabSelected === "dictionary" || this.tabSelected === "lkt") {
        if (this.matching === "exact") {
          this.$store.commit("revertDictionaryList");
          this.setSelectedfunction();
        } else {
          this.partialMatch();
        }
      } else if (this.tabSelected === "description") {
        this.matching = "description";
        this.partialMatch();
      } else {
        this.setSelectedfunction();
      }
    },
    selectedTab(val) {
      this.previousTab = this.tabSelected;
      this.tabSelected = val;
      if (this.tabSelected === "dictionary") {
        if (this.lktSessionStart) {
          this.tabSelected = "lkt";
          this.matching = "exact";
        }
        this.matching = "exact";
      }
      if (this.tabSelected === "description") {
        if (this.queryString === "") {
          this.routeQuery = "";
          this.$root.$emit("clearInputTextArea", "description");
        } else {
          this.callSelectedTabFunction();
        }
      } else {
        this.callSelectedTabFunction();
      }
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
        if (this.matching === "exact") {
          this.lookup();
        } else {
          this.partialMatch();
        }
      } else if (this.tabSelected === "description") {
        this.matching = "description";
        this.partialMatch();
      } else {
        this.setSelectedfunction();
        this.btnLabel = "EXACT MATCH";
        this.matching = "exact";
      }
    },
    setDefaultDic() {
      this.$store.commit("setDicToDefaultList", lktDicList);
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
        `lkt?query=${this.queryString}&matching=${this.matching}&tokenize=${this.setTokenizeQuery}&count=${this.counter}`
      );
    },
    doDictionaryLookup() {
      this.counter++;
      this.$router.push(
        `dictionary_lookup?query=${this.queryString}&matching=${this.matching}&tokenize=${this.setTokenizeQuery}&count=${this.counter}`
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
        case "description":
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
      let checkedDicList = [];
      if (this.lktSessionStart) {
        checkedDicList = localStorage.getItem("lktOptions");
      } else {
        checkedDicList = localStorage.getItem("options");
      }
      const parsedDicList = [...JSON.parse(checkedDicList)];
      this.selectedDictionary = parsedDicList;
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
          width: 12rem;
          height: 2rem;
          border: none;
          margin-right: 0 !important;
          box-shadow: 0px 2px 2px rgba(55, 33, 24, 0.25);

          .item-container {
            height: 3rem;
            .selectedIcon {
              display: inline-block;
              width: 1.5rem;
              img {
                width: 1.5rem;
                padding-right: 0.3rem;
              }
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
.dropdown {
  .dropdown-menu {
    padding: 0;

    a {
      border-bottom: solid 1px rgb(142, 145, 146);
    }
    .dropdown-item {
      padding-left: 0.6rem !important;

      p {
        padding-left: 1.7rem;
        font-size: 0.9em;
        color: rgb(142, 145, 146);
      }
    }
  }
}
</style>
