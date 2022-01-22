<template>
  <div class="dictionarylookup">
    <div class="container-fluid">
      <multiselect
        v-model="value"
        :options="options"
        :multiple="true"
        :close-on-select="false"
        :clear-on-select="false"
        :preserve-search="true"
        :show-labels="false"
        placeholder="Select Dictionary"
        label="name"
        track-by="name"
        @select="onSelect($event)"
        @remove="onRemove($event)"
      >
        <template
          slot="option"
          slot-scope="props"
          @click.self="select(props.option)"
        >
          <input
            v-model="props.option.checked"
            type="checkbox"
            @focus.prevent
          />
          <span class="option__desc">
            <span class="option__title">{{ props.option.name }}</span>
          </span>
        </template>
        <template slot="selection" slot-scope="{ values, isOpen }">
          <span
            class="multiselect__single"
            v-if="values.length &amp;&amp; !isOpen"
          >
            {{ values.length }} dictionaries selected
          </span>
        </template>
      </multiselect>
      <div class="default-text" v-if="!searchQuery">
        <p>
          Start by entering a Tibetan word or a segment of text inside the white
          textarea on the left ...
        </p>
      </div>
      <template v-for="(token, idx) in results.tokens" v-else>
        <div class="dictionary-results" :key="idx">
          <h1>{{ token }}</h1>
          <!-- <template v-for="(item, idx2) in results.text[idx]">
            <p :key="idx2">
              {{ item }}
            </p>
          </template> -->
          <template v-for="(item, idx2) in resultArray">
            <p :key="idx2">
              <span class="dic_source_wrapper">
                <span class="dic_source">
                  {{ item.source.split("_").join(" ") }}
                </span>
                <span class="close-btn" @click="removeSelectedDic(item)">
                  <img src="@/assets/images/close-icon-dic.svg" alt="remove" />
                </span>
              </span>
              {{ item.text }}
            </p>
          </template>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { Services } from "@/services/services";
import multiselect from "vue-multiselect";
import { mapState } from "vuex";

export default {
  name: "dictionarylookup",
  components: {
    multiselect
  },

  data() {
    return {
      results: {},
      value: []
    };
  },

  computed: {
    ...mapState(["options"]),
    searchQuery() {
      return this.$route.query.query;
    },
    resultArray() {
      let ar1 = [].concat.apply([], this.results.source[0]);
      let ar2 = [].concat.apply([], this.results.text[0]);
      let res = [];
      ar1.forEach(function(v, i) {
        var obj = {};
        obj.source = v;
        obj.text = ar2[i];
        res.push(obj);
      });
      return res;
    }
  },

  watch: {
    $route() {
      this.results = {};
      this.doSearch();
    }
  },

  mounted() {
    this.filterDictionaries();
    this.doSearch();
  },
  methods: {
    async doSearch() {
      // Execute search query
      let selectedDictionaries = this.value.map(a =>
        a.name.replace(/ /g, "_").toLowerCase()
      );
      const res = await Services.dictionaryLookup(
        this.searchQuery,
        selectedDictionaries
      );
      this.results = res && res.data ? res.data : {};
      if (!Object.keys(this.results).length) {
        this.$toasted.error("No results found", { duration: 5000 });
      }
    },
    filterDictionaries() {
      if (this.options.length > 0) {
        let filteredDictionaries = this.options.filter(a => {
          if (a.checked === true) return a;
        });
        this.value = [...filteredDictionaries];
      }
    },
    onSelect(option) {
      let index = this.options.findIndex(item => item.name === option.name);
      this.options[index].checked = true;
      this.$store.commit("updateDictionary", this.value);
      this.filterDictionaries();
      if (this.searchQuery) {
        this.doSearch();
      }
    },
    onRemove(option) {
      let index = this.options.findIndex(item => item.id === option.id);
      this.options[index].checked = false;
      this.$store.commit("updateDictionary", this.value);
      this.filterDictionaries();
      if (this.searchQuery) {
        this.doSearch();
      }
    },
    removeSelectedDic(item) {
      let value = item.source.split("_").join(" ");
      let result = this.options.filter(a => a.name.toLowerCase() == value);
      this.onRemove(result[0]);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/index.scss";
.dictionarylookup {
  height: calc(100vh - 10rem);
  text-transform: lowercase;

  @include breakpointMax(small) {
    padding-right: 1rem;
  }
  .container-fluid {
    height: 100%;
    padding-left: 0;

    input[type="checkbox"] {
      appearance: none;
      background-color: hsl(100, 100%, 100%);
      margin-right: 0.5rem;
      color: $dropdown-color;
      width: 1.15em;
      height: 1.15em;
      border: 0.15em solid $dropdown-color;
      border-radius: 0.15em;
      transform: translateY(-0.075em);
      display: inline-grid;
      place-content: center;
      &::before {
        content: "\2713";
        color: $dropdown-color;
        display: grid;
        place-content: center;
        width: 0.65em;
        height: 0.65em;
        transform: scale(0);
        transition: 120ms transform ease-in-out;
        box-shadow: inset 1em 1em var(--form-control-color);
        background-color: hsl(100, 100%, 100%);
      }
      &:checked {
        &::before {
          transform: scale(1);
        }
      }
    }
    h1 {
      font-family: $tib-font;
      margin-bottom: 2rem;
    }
    .multiselect {
      width: 100%;
      margin-bottom: 2rem;

      @include breakpoint(medium) {
        width: 44%;
      }
    }
    .dic_source_wrapper {
      display: block;
      margin-bottom: 0.5rem;
      .dic_source {
        color: hsl(17, 39%, 15%);
        text-transform: uppercase;
        font-size: 0.7em;
        padding: 0.2rem 0.5rem;
        border-top-left-radius: 0.5rem;
        border-bottom-left-radius: 0.5rem;
        background-color: hsla(17, 39%, 15%, 0.17);
      }
      .close-btn {
        padding: 0.2rem 0.5rem;
        font-size: 0.7em;
        border-top-right-radius: 0.5rem;
        border-bottom-right-radius: 0.5rem;
        background-color: hsla(17, 39%, 15%, 0.1);
        cursor: pointer;
        img {
          color: hsl(17, 39%, 15%);
          height: 0.7rem;
          width: 0.5rem;
          margin-bottom: 0.1rem;
        }
      }
    }
    .default-text {
      height: 78%;
      display: flex;
      align-items: center;

      p {
        font-size: 1.5em;
        color: hsla(37, 18%, 45%, 1);
        line-height: 1.8rem;
      }
    }
    .dictionary-results {
      height: calc(100vh - 14.5rem);
      overflow-y: scroll;
      padding-right: 2rem;
    }
  }
}
</style>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style lang="scss">
@import "@/assets/scss/index.scss";
$font-color: hsl(0, 0%, 0%);
.multiselect__option--highlight,
.multiselect__option--highlight::after {
  color: $font-color !important;
  background: none !important;
}
.multiselect__tag {
  color: $font-color !important;
  background-color: hsla(36, 100%, 95%, 1);
}
.multiselect__option--selected,
.multiselect__option--selected::after {
  color: $font-color !important;
  background: none !important;
}
.option__title {
  color: $dropdown-color;
}
.multiselect__tag-icon:after {
  color: $font-color;
}
.multiselect__tag-icon:focus,
.multiselect__tag-icon:hover {
  background: $dropdown-color;
}
</style>
