<template>
  <b-modal id="selectDictionary" content-class="modalContent" hide-header-close>
    <template #modal-title>
      <div class="close-arrow" @click="closeModal()">
        <img src="@/assets/images/close-icon.svg" alt="close modal" />
      </div>
    </template>
    <div class="d-block dictionaryList">
      <b-form-group
        label="Select any one dictionary from the list"
        v-slot="{ dictionaryList }"
      >
        <template v-for="item in message">
          <b-form-radio
            v-model="selected"
            :aria-describedby="dictionaryList"
            name="dictionaryList"
            :value="item"
            :key="item.id"
          >
            {{ item.name }}
          </b-form-radio>
        </template>
      </b-form-group>
    </div>
    <template #modal-footer>
      <b-button @click="lookup()">
        Submit
      </b-button>
    </template>
  </b-modal>
</template>
<script>
export default {
  props: {
    message: {
      type: Array
    }
  },
  data() {
    return {
      selected: null,
      dictionarySelected: []
    };
  },
  methods: {
    turnOfTokenization() {
      this.$bvModal.hide("selectDictionary");
      this.$root.$emit("turnOffTokenization");
    },
    closeModal() {
      this.$bvModal.hide("selectDictionary");
    },
    lookup() {
      this.dictionarySelected = [];
      this.dictionarySelected.push(this.selected);
      this.$root.$emit("partialSearch", this.dictionarySelected);
      this.closeModal();
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
    .dictionaryList {
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
      font-size: 1em;
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
