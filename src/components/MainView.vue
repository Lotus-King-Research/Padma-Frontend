<template>
  <b-container class="home" fluid>
    <b-row class="padma-logo-mobile">
      <b-col class="padma-logo-img justify-content-center">
        <img src="@/assets/images/padma.png" @click="goHome" />
      </b-col>
    </b-row>
    <b-row class="row input-area">
      <b-col md="4">
        <textarea
          type="text"
          class="form-control cursor form-css"
          v-model="queryString"
          placeholder="Enter Tibetan Text"
        ></textarea>
      </b-col>
      <b-col class="padma-logo justify-content-center" md="2">
        <img src="@/assets/images/padma.png" @click="goHome" />
      </b-col>
      <b-col class="menu-list">
        <b-row>
          <b-col>
            <label @click="doDictionaryLookup"> Dictionary </label>
            <label> Texts </label>
            <label> Similar Words </label>
            <label> Statistics </label>
            <label> Tokenize </label>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <!-- Main content here -->
            <router-view />
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <b-row class="menu-dropdown">
      <b-col class="for-mobile">
        <b-row class="select">
          <b-col>
            <v-select
              :options="options"
              v-model="selectedMenu"
              class="selectMenu"
              :clearable="false"
            >
            </v-select>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <!-- Main content here for mobile -->
            <router-view />
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "mainview",
  data() {
    return {
      queryString: "",
      selectedMenu: "Select Action",
      // options: ["Dictionary", "Texts", "Similar Words", "Statistics", "Tokenize"],
      options: [
        { label: "Dictionary", value: "Dictionary", id: 1 },
        { label: "Texts", value: "Texts", id: 2 },
        { label: "Similar Words", value: "Similar Words", id: 3 },
        { label: "Statistics", value: "Statistics", id: 4 },
        { label: "Tokenize", value: "Tokenize", id: 5 }
      ]
    };
  },
  methods: {
    doDictionaryLookup() {
      this.$router.push(`/dictionary_lookup?query=${this.queryString}`);
    },
    goHome() {
      this.$router.push("/");
    }

    // goHome() {
    //   this.$router.push("/home");
    // },

    // openMenu(event, data) {
    //   this.$refs.cmenu.openMenu(event, data);
    // },

    // goBack() {
    //   window.history.back();
    // }
  }
};
</script>
<style lang="scss" scoped>
@import "vue-select/src/scss/vue-select.scss";
@import "@/assets/scss/index.scss";
.home {
  margin: 0;
  padding: 2.5rem 2.5rem 0 2.5rem;
  .padma-logo-mobile {
    margin-bottom: 2rem;
    .padma-logo-img {
      display: grid;
      img {
        width: 4rem;
        opacity: 0.5;
        transition: opacity 2s;
      }
      img:hover {
        opacity: 1;
        cursor: pointer;
      }
    }
    @include breakpoint(medium) {
      display: none;
    }
  }
  .input-area {
    textarea {
      height: 20rem;
      letter-spacing: 0.1rem;
      padding: 1.5rem;
    }
    textarea::placeholder {
      color: $dropdown-color;
    }
    .padma-logo {
      display: none;
    }
    .menu-list {
      display: none;
    }
    @include breakpoint(medium) {
      textarea {
        height: 40rem;
        padding: 2rem;
        text-transform: uppercase;
      }
      .padma-logo {
        display: grid;
        align-items: center;
        img {
          width: 5rem;
          opacity: 0.5;
          transition: opacity 2s;
        }
        img:hover {
          opacity: 1;
          cursor: pointer;
        }
      }
      .menu-list {
        display: block;
        font-size: 1em;
        text-transform: uppercase;

        label {
          padding-right: 2rem;
        }
      }
    }
  }
  .menu-dropdown {
    padding-top: 1.5rem;

    @include breakpoint(medium) {
      .for-mobile {
        display: none;
      }
    }
  }
}
</style>
<style lang="scss">
@import "@/assets/scss/index.scss";
.select {
  .selectMenu {
    .vs__search::placeholder,
    .vs__dropdown-toggle {
      background: transparent;
      border-radius: 0px;
      border: none;
      border-bottom: solid 1px $dropdown-color;
      color: $dropdown-color;
      font-size: 1.2em;
      letter-spacing: 0.1rem;
      text-transform: lowercase;
      font-variant: small-caps;
    }
    .vs__dropdown-menu {
      background-color: $off-white;
    }
    .vs__actions {
      padding: 0.4rem 0.5rem;
      background-color: $dropdown-color;
    }
    .vs__open-indicator {
      fill: #fff;
    }
    .vs__selected {
      color: $dropdown-color;
    }
    .vs__dropdown-option {
      color: $primary-color;
      letter-spacing: 0.1rem;
      background-color: $off-white;
    }
    .vs__dropdown-option:hover {
      color: $dropdown-color;
    }
    .vs__dropdown-option--highlight {
      background: none;
    }
  }
}
</style>
