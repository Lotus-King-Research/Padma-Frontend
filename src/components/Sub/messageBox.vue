<template>
  <b-modal
    id="messageBox"
    content-class="modalContent"
    hide-header-close
    hide-footer
  >
    <template #modal-title>
      <div class="close-arrow" @click="closeModal()">
        <img src="@/assets/images/close-icon.svg" alt="close modal" />
      </div>
    </template>
    <div class="d-block message text-center">
      <label v-html="hightLightText(message)"> </label>
    </div>
    <b-button @click="turnOfTokenization()">
      TURN OFF <span class="greater-than-arrow"> > </span>
    </b-button>
  </b-modal>
</template>
<script>
export default {
  props: {
    message: {
      type: String
    }
  },
  data() {
    return {};
  },
  methods: {
    turnOfTokenization() {
      this.$bvModal.hide("messageBox");
      this.$root.$emit("turnOffTokenization");
    },
    hightLightText(text) {
      return text.replaceAll(
        "Tokenize query",
        `<span class="highlight">${"Tokenize query"}</span>`
      );
    },
    closeModal() {
      this.$root.$emit("closeModal");
      this.$bvModal.hide("messageBox");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/index.scss";

::v-deep .modal-dialog {
  .modalContent {
    width: 22rem;
    margin: 0 auto;
    .modal-header {
      display: flex;
      justify-content: flex-end;

      .close-arrow {
        width: 1.5rem;
        height: 1.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        font-size: 1rem;
        color: hsl(0, 100%, 100%);
        margin-right: 1rem;
        background-color: hsla(37, 18%, 45%, 1);
        float: right;
        img {
          width: 28%;
        }
      }
    }
    .message {
      font-size: 1.2em;

      .highlight {
        color: $dropdown-color;
        font-weight: 900;
      }
    }
    .btn {
      margin: auto;
      width: 6.3rem;
      height: 1.5rem;
      font-size: 0.8em;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: $secondary-color;
      border: none;
    }
    .greater-than-arrow {
      padding-left: 0.5rem;
      font-weight: bold;
      padding-bottom: 0.15rem;
    }
  }
}
</style>
