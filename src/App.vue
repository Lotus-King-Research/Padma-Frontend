<template>
  <div id="app">
    <router-view />
    <div v-if="loading" class="loader">
      <img src="@/assets/images/loader.png" />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "mainview",

  computed: {
    ...mapState(["loading"])
  },
  created() {
    const optionsData = JSON.parse(localStorage.getItem("options"));
    if (optionsData !== null) {
      this.$store.commit("storeDicOptions", optionsData);
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/scss/index.scss";
@font-face {
  font-family: "ZillaSlab";
  src: local("ZillaSlab"),
    url("~@/assets/fonts/ZillaSlab-Regular.ttf") format("truetype");
}
@font-face {
  font-family: "Jomolhari";
  src: local("Jomolhari"),
    url("~@/assets/fonts/Jomolhari-Regular.ttf") format("truetype");
}
body {
  padding: 0;
  font-size: 1em !important;
  font-family: ZillaSlab !important;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  background: radial-gradient(
      50% 50% at 50% 50%,
      rgba(241, 216, 195, 0.75) 0%,
      rgba(241, 216, 195, 0) 100%
    ),
    url("assets/images/old-paper-bg.png") !important;
}

input:focus,
select:focus,
textarea:focus,
button:focus {
  outline: none !important;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0) !important;
}

// button,
// input[type="submit"],
// input[type="reset"] {
//   background: none;
//   color: inherit;
//   border: none;
//   padding: 0;
//   font: inherit;
//   cursor: pointer;
//   outline: inherit;
//   opacity: 0.2;
//   transition: opacity 0.2s ease-in-out;
//   padding-top: 15px;
// }

.loader {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.178);

  img {
    display: inline-block;
    margin-left: 50vw;
    margin-top: 50vh;
    transform: translateX(-50%) translateY(-50%);
  }
}
</style>
