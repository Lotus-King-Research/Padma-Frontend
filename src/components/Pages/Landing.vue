<template>
  <b-container class="landing" fluid>
    <b-row class="padma-logo-mobile">
      <b-col>
        <img src="@/assets/images/padma.png" />
      </b-col>
    </b-row>
    <b-row class="row input-area">
      <b-col md="4">
        <textarea
          type="text"
          class="form-control cursor form-css"
          v-model="queryString"
          placeholder="Start by entering a Tibetan word or a segment of text..."
        ></textarea>
      </b-col>
      <b-col class="padma-logo justify-content-center" md="2">
        <img src="@/assets/images/padma.png" />
      </b-col>
      <b-col class="menu-list">
        <b-row>
          <b-col cols="2">
            <label @click="doDictionaryLookup"> Dictionary </label>
          </b-col>
          <b-col cols="2">
            <label> Texts </label>
          </b-col>
          <b-col cols="3">
            <label> Similar Words </label>
          </b-col>
          <b-col cols="2">
            <label> Statistics </label>
          </b-col>
          <b-col cols="2">
            <label> Tokenize </label>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            Main content here
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <b-row class="menu-dropdown">
      <b-col class="for-mobile">
        <div>
          <b-dropdown id="dropdown-1" text="Dropdown Button" class="m-md-2">
            <b-dropdown-item>First Action</b-dropdown-item>
            <b-dropdown-item>Second Action</b-dropdown-item>
            <b-dropdown-item>Third Action</b-dropdown-item>
          </b-dropdown>
        </div>
      </b-col>
    </b-row>
  </b-container>
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
@import "@/assets/scss/index.scss";
.landing {
  padding: 2.5rem 2.5rem 0 2.5rem;
  .padma-logo-mobile {
    img {
      width: 4rem;
    }
    @include breakpoint(medium) {
      display: none;
    }
  }
  .input-area {
    textarea {
      height: 20rem;
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
      }
      .padma-logo {
        display: block;
        img {
          width: 4rem;
        }
      }
      .menu-list {
        display: block;
        font-size: 0.8em;
        text-transform: uppercase;
      }
    }
  }
  .menu-dropdown {
    @include breakpoint(medium) {
      .for-mobile {
        display: none;
      }
    }
  }
}
// .form-css {
//   display: block;
//   font-family: "Tinos", serif;
//   font-weight: 400;
//   color: #ccc;
//   line-height: 1.3;
//   border: 1px solid #bfbfbf;
//   align-content: center;

//   &::-ms-expand {
//     display: none;
//   }

//   &:hover,
//   &:focus {
//     border-color: #888;
//     border: 1px solid #bfbfbf;
//     background-color: white;
//     box-shadow: 0 0 0.5px rgba(0, 0, 0, 0.014), 0 0 1px rgba(0, 0, 0, 0.028),
//       0 0 2px rgba(0, 0, 0, 0.04), 0 0 4px rgba(0, 0, 0, 0.052),
//       0 0 8px rgba(0, 0, 0, 0.066), 0 0 16px rgba(0, 0, 0, 0.1);
//   }

//   &:focus,
//   &:active {
//     outline: none;
//   }
// }

// .form-control::placeholder {
//   font-size: 0.8em !important;
//   font-style: italic;
// }
</style>
