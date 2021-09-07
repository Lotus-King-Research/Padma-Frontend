<template>
  <b-container class="render-text-container">
    <b-row>
      <b-col class="tibetan-text-reader mb-4'" cols="12">
        <h1>{{ text }}</h1>
      </b-col>
      <b-col id="source" cols="10" class="tibetan-source-reader">
        <span> {{ textTitle }} </span>
      </b-col>
      <b-col cols="2" class="arrow-icon">
        <div class="arrow">
          <img
            src="@/assets/images/icon-right-arrow.svg"
            @click="expandRender"
          />
        </div>
      </b-col>
      <b-col cols="12" class="horz-line">
        <hr />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { Services } from "@/services/services";

export default {
  name: "rendertext",
  components: {},

  data() {
    return {
      text: "",
      textTitle: ""
    };
  },

  computed: {
    title() {
      return this.$route.query.title;
    },

    start() {
      return this.$route.query.start;
    },

    end() {
      return this.$route.query.end;
    }
  },

  watch: {
    $route() {
      this.text = "";
      this.fetchTextToRender();
    }
  },

  mounted() {
    this.fetchTextToRender();
  },

  methods: {
    async fetchTextToRender() {
      const res = await Services.renderText(this.title, this.start, this.end);
      this.text = res && res.data ? res.data.text : "";
      this.textTitle = res && res.data ? res.data.text_title : "";
      if (this.text === "") {
        this.$toasted.error("No results found", { duration: 5000 });
      }
    },

    expandRender() {
      const newEnd = Number(this.end) + 2;
      this.$router.push(
        `/render_text?title=${this.title}&text_title=${this.textTitle}&start=${this.start}&end=${newEnd}`
      );
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/index.scss";
.render-text-container {
  .tibetan-text-reader {
    font-family: $tib-font;
    padding-left: 0;
  }
  .tibetan-source-reader {
    font-family: $tib-font;
    font-size: x-large;
    padding-left: 0;
    padding-top: 0.5rem;
    padding-bottom: 0.8rem;
    color: $secondary-color;
  }
  .arrow-icon {
    display: grid;
    justify-content: end;
    padding-right: 0;
    .arrow {
      width: 3rem;
      height: 100%;
      background-color: $secondary-color;
      display: grid;
      justify-content: center;
      align-items: center;
    }
  }
  .horz-line {
    margin-bottom: 3rem;
    padding-right: 0;
    padding-left: 0;
    hr {
      margin: 0;
      height: 0.1rem;
      background-color: $secondary-color;
    }
  }
}
</style>
