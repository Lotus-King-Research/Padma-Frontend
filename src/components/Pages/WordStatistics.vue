<template>
  <div class="d-flex">
    <div>
      <table class="dataframe">
        <th class="dataframe">common</th>
        <th class="dataframelast"></th>
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
        <th class="dataframelast"></th>
        <template v-for="(pv, idx) in results.prominence_value">
          <tr :key="idx">
            <td class="td-key prominence" @click="gotoProminenceLink(idx)">
              {{ results.prominence_name[idx] }}
            </td>
            <td class="td-value">{{ results.prominence_value[idx] }}</td>
          </tr>
        </template>
      </table>
    </div>
    <div>
      <table class="dataframe">
        <th class="dataframe">proximity</th>
        <th class="dataframelast"></th>
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
    },

    gotoProminenceLink(idx) {
      this.$router.push(
        `/render_text?title=${this.results.prominence_key[idx]}`
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.d-flex {
  gap: 20px;
}

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

    &.prominence {
      cursor: pointer;

      &:hover {
        color: rgba(42, 42, 42, 0.6);
      }
    }
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
