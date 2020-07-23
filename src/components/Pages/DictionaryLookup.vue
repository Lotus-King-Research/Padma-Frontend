<template>
  <div class="dictionarylookup">
    <div class="container-fluid pt-3 pb-2 pl-4">
      <font class="tibetan-text-reader">{{ searchQuery }}</font>
    </div>
    <div class="container-fluid">
      <template v-for="(token, idx) in results.tokens">
        <table class="dataframe mb-4" :key="idx">
          <th>{{ token }}</th>
          <th class="dataframelast"></th>
          <template v-for="(item, idx2) in results.text[idx]">
            <tr :key="idx2">
              <td class="td-key">{{ item }}</td>
              <td class="td-value">{{ results.source[idx][idx2] }}</td>
            </tr>
          </template>
        </table>
      </template>
    </div>
  </div>
</template>

<script>
import { Services } from "@/services/services";

export default {
  name: "dictionarylookup",
  components: {},

  data() {
    return {
      results: {}
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
      if (!Object.keys(this.results).length) {
        this.$toasted.error("No results found", { duration: 5000 });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.dataframe {
  margin: 10px;
  border-collapse: separate;
  border-spacing: 0px;
  border: 0px solid #bfbfbf;
  border-radius: 20px 20px 0 0;
  border-width: 1.5px;
  border-color: rgb(179, 179, 179);
  box-shadow: 0 0 5.5px rgba(0, 0, 0, 0.014), 0 0 11px rgba(0, 0, 0, 0.028),
    0 0 22px rgba(0, 0, 0, 0.04), 0 0 34px rgba(0, 0, 0, 0.052),
    0 0 48px rgba(0, 0, 0, 0.066), 0 0 56px rgba(0, 0, 0, 0.1);

  th,
  td {
    text-align: left;
    border-width: 0px;
    padding: 14px;
    padding-left: 20px;
    font-size: x-large;
    color: #2c2c2c;
    font-family: "Tinos", serif;
  }

  th {
    background-color: #5f1c26;
    color: white;
  }

  td {
    border-bottom-width: 1px;
    border-color: rgba(0, 0, 0, 0.26);
    border-radius: 0px;
  }

  tr:nth-child(odd) {
    background-color: #fff8eb;
  }

  tr:nth-child(even) {
    background-color: #fff8eb;
  }

  th:first-child {
    border-radius: 18.7px 0 0 0;
  }

  .dataframelast {
    border-radius: 0 18.7px 0 0;
  }

  th:only-child {
    border-radius: 20px 20px 0 0;
  }
}
</style>
