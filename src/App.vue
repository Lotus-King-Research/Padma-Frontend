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
  }
};
</script>

<style lang="scss">
body {
  margin-top: 12px !important;
  font-size: 24px !important;
  background: #fff8eb !important;
  font-family: "Tinos", serif !important;
}

.loader {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);

  img {
    display: inline-block;
    margin-left: 50vw;
    margin-top: 50vh;
    transform: translateX(-50%) translateY(-50%);
  }
}

</style>
