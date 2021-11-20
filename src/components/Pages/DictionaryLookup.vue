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
        :preselect-first="true"
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
        <div :key="idx">
          <h1>{{ token }}</h1>
          <template v-for="(item, idx2) in results.text[idx]">
            <p :key="idx2">
              {{ item }}
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

export default {
  name: "dictionarylookup",
  components: {
    multiselect
  },

  data() {
    return {
      results: {},
      value: [],
      options: [
        { name: "Mahavyutpatti", checked: false },
        { name: "Erik pema kunsang", checked: false },
        { name: "Ives waldo", checked: false },
        { name: "Jeffrey hopkins", checked: false },
        { name: "Lobsang monlam", checked: false },
        { name: "Tibetan multi", checked: false },
        { name: "Tibetan medicine", checked: false },
        { name: "Verb lexicon", checked: false }
      ]
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
      const res = await Services.dictionaryLookup(this.searchQuery);
      this.results = res && res.data ? res.data : {};
      console.log("results =", this.results);
      if (!Object.keys(this.results).length) {
        this.$toasted.error("No results found", { duration: 5000 });
      }
    },
    onSelect(option) {
      let index = this.options.findIndex(item => item.name === option.name);
      this.options[index].checked = true;
    },
    onRemove(option) {
      let index = this.options.findIndex(item => item.name === option.name);
      this.options[index].checked = false;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/index.scss";
.dictionarylookup {
  height: 100%;
  text-transform: lowercase;
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
      width: 44%;
      margin-bottom: 2rem;
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
  background: none;
}
.multiselect__option--selected,
.multiselect__option--selected::after {
  color: $font-color !important;
  background: none !important;
}
.multiselect__tag-icon:after {
  color: $font-color;
}
.multiselect__tag-icon:focus,
.multiselect__tag-icon:hover {
  background: $dropdown-color;
}
</style>
