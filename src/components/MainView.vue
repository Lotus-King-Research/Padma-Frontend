<template>
  <div id="wrapper" @contextmenu.prevent="openMenu">
    <!--- context menu --->
    <ContextMenu ref="cmenu"></ContextMenu>
    <div class="row ml-5">
      <font-awesome-icon
        :icon="['fas', 'arrow-circle-left']"
        :class="{ visible: notLandingPage }"
        class="go-back my-3 ml-2"
        size="2x"
        title="back"
        @click="goBack"
      />
      <button
        type="image"
        :class="{ visible: notLandingPage }"
        class="button-image mr-auto mr-4"
        size="2x"
        @click="goHome"
      >
        <img class="logo-navi pb-3 ml-3" src="@/assets/images/padma.png" width="70px;" />
      </button>
    </div>
    <!--- main content area --->
    <div class="container-fluid">
      <router-view />
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
    },

    goBack() {
      window.history.back();
    }
  }
};
</script>

<style lang="scss" scoped>
.go-back {
  cursor: pointer;
  opacity: 0.3;
  display: none;

  &.visible {
    display: block;
  }

  &:hover {
    opacity: 0.5;
  }
}

.button-image {
  display: none;

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
