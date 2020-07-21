<template>
  <div class="container-fixed vertical-center">
    <div class="tibetan-text-reader">
      {{ text }}
    </div>
    <p class="tibetan-source" id="source">
      <span class="source" id="source"> {{ title }}</span>
      <i
        class="fa fa-angle-double-right expand-icon"
        id="add"
        title="add segments"
        @click="expandRender"
      ></i>
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
      text: ""
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
      this.text = res ? res.data.text : "";
    },

    expandRender() {
      const newEnd = Number(this.end) + 2;
      this.$router.push(
        `/render_text?title=${this.title}&start=${this.start}&end=${newEnd}`
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.tibetan-text {
  font-size: 1.2em;
  font-family: "Jomolhari", serif;
}

.tibetan-source {
  opacity: 0.4;
  font-size: x-large;
  font-family: "Tinos", serif;
}

.expand-icon {
  cursor: pointer;
  opacity: 0.3;
  font-size: x-large;
  position: absolute;
  padding-left: 15px;
  padding-top: 6px;
}
</style>
