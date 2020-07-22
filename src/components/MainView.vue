<template>
  <div id="wrapper" @contextmenu.prevent="openMenu">
    <!--- context menu --->
    <ContextMenu ref="cmenu"></ContextMenu>

    <!--- main content area --->
    <div class="container-fluid">
      <button
        type="image"
        :class="{ visible: notLandingPage }"
        class="button-image float-right"
        @click="goHome"
      >
        <img class="logo-navi" src="@/assets/images/padma.png" width="50px;" />
      </button>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import ContextMenu from "./ContextMenu";

export default {
  name: "mainview",
  components: {
    ContextMenu
  },

  computed: {
    notLandingPage() {
      return !this.$root.$route.path.includes("/home");
    }
  },

  methods: {
    goHome() {
      this.$router.push("/home");
    },

    openMenu(event, data) {
      this.$refs.cmenu.openMenu(event, data);
    }
  }
};
</script>

<style lang="scss" scoped>
button {
  display: none;
  margin-right: 25px;

  &.visible {
    display: block;
  }
}
</style>

<style lang="scss">
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
</style>
