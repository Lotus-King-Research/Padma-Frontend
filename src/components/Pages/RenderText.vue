<template>
  <div class="container-fixed mx-5 my-3">
    <div class="tibetan-text-reader mb-4'">
      {{ text }}
    </div>
    <p id="source" class="mt-2">
      <span class="tibetan-source-reader"> {{ textTitle }}</span>
      <font-awesome-icon
        :icon="['fas', 'angle-double-right']"
        class="expand-icon"
        size="2x"
        title="add segments"
        @click="expandRender"
      />
    </p>
  </div>
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
.tibetan-text-reader {
  font-size: 1.6em;
  font-family: "Jomolhari", serif;
}

.tibetan-source-reader {
  opacity: 0.4;
  font-size: 1.3em;
  font-family: "Tinos", serif;
}

.expand-icon {
  font-size: 35px;

  cursor: pointer;
  opacity: 0.3;
  position: absolute;
  padding-left: 15px;

  &:hover {
    opacity: 0.5;
  }
}
</style>
