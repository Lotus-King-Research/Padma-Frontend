<template>
  <div class="d-flex">
    <div>
      <table class="dataframe">
        <th class="dataframe">most common</th>
        <th class="dataframe"></th>
        <template v-for="(mcv, idx) in results.most_common_value">
          <tr :key="idx">
            <td class="td-key">{{ results.most_common_key[idx] }}</td>
            <td class="td-value">{{ results.most_common_value[idx] }}</td>
          </tr>
        </template>
      </table>
    </div>
    <div>
      <table class="dataframe">
        <th class="dataframe">prominence</th>
        <th class="dataframe"></th>
        <template v-for="(pv, idx) in results.prominence_value">
          <tr :key="idx">
            <td class="td-key">{{ results.prominence_key[idx] }}</td>
            <td class="td-value">{{ results.prominence_value[i] }}%</td>
          </tr>
        </template>
      </table>
    </div>
    <div>
      <table class="dataframe">
        <th class="dataframe">co-occuring</th>
        <th class="dataframe"></th>
        <template v-for="(cov, idx) in results.co_occurance_value">
          <tr :key="idx">
            <td class="td-key">{{ results.co_occurance_key[idx] }}</td>
            <td class="td-value">{{ results.co_occurance_value[idx] }}</td>
          </tr>
        </template>
      </table>
    </div>
  </div>
</template>

<script>
import { Services } from "@/services/services";

export default {
  name: "wordstatistics",
  components: {},

  data() {
    return {
      results: []
    };
  },

  computed: {
    searchQuery() {
      return this.$route.query.query;
    }
  },

  mounted() {
    this.doWordStatistics();
  },

  methods: {
    async doWordStatistics() {
      // Execute word statistics query
      const res = await Services.wordStatistics(this.searchQuery);
      this.results = res.data;
    }
  }
};
</script>

<style lang="scss" scoped>
.d-flex {
  gap: 20px;
}
</style>
