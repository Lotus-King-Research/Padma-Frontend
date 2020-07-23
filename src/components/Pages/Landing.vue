<template>
  <div class="landing">
    <center>
      <div class="row justify-content-center">
        <form
          class="form-inline"
          action=""
          method="post"
          id="form"
          onsubmit="parseQuery()"
          autofocus
        >
          <div class="col-12 my-auto">
            <textarea
              type="text"
              class="form-control cursor form-css"
              v-model="queryString"
              rows="15"
              placeholder="Start by entering a Tibetan word or a segment of text"
            ></textarea>
          </div>
        </form>
      </div>
      <div class="row h-100 justify-content-center">
        <div class="col-12 my-auto">
          <button
            id="rawr"
            type="image"
            class="button-image mx-auto d-block"
            @click="doDictionaryLookup"
          >
            <img src="@/assets/images/padma.png" width="80px;" />
          </button>
        </div>
      </div>
    </center>
  </div>
</template>

<script>
export default {
  name: "landing",
  components: {},

  data() {
    return {
      queryString: ""
    };
  },

  methods: {
    doDictionaryLookup() {
      this.$router.push(`dictionary_lookup?query=${this.queryString}`);
    }
  }
};
</script>

<style lang="scss" scoped>
.form-css {
  display: block;
  font-size: 24px;
  margin: 10px;
  font-family: sans-serif;
  font-weight: 400;
  color: #444;
  line-height: 1.3;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #aaa;
  border-radius: 1.5em;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  border: 1px solid #bfbfbf;
  line-height: normal;
  padding-top: 20px;
  align-content: center;

  &::-ms-expand {
    display: none;
  }

  &:hover,
  &:focus {
    border-color: #888;
    border: 1px solid #bfbfbf;
    background-color: white;
    box-shadow: 0 0 0.5px rgba(0, 0, 0, 0.014), 0 0 1px rgba(0, 0, 0, 0.028),
      0 0 2px rgba(0, 0, 0, 0.04), 0 0 4px rgba(0, 0, 0, 0.052),
      0 0 8px rgba(0, 0, 0, 0.066), 0 0 16px rgba(0, 0, 0, 0.1);
  }

  &:focus,
  &:active {
    outline: none;
  }
}

input:focus,
select:focus,
textarea:focus,
button:focus {
  outline: none !important;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0) !important;
}

button,
input[type="submit"],
input[type="reset"] {
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  opacity: 0.2;
  transition: opacity 0.2s ease-in-out;
  padding-top: 15px;
}

button:hover {
  opacity: 0.5;
}

.form-control::placeholder {
  font-size: 0.8em !important;
  font-style: italic;
}
</style>
