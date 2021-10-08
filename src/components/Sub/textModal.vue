<template>
  <b-modal
    id="textModal"
    ref="text-modal"
    size="xl"
    :content-class="{ modalContent: hideModalBody }"
    header-class="modalHeader"
    :body-class="{ modalBody: hideModalBody }"
    hide-footer
  >
    <template #modal-header>
      <b-container fluid>
        <b-row>
          <b-col>
            <div class="arrow-section" v-if="!hideModalBody">
              <div class="next-arrow">
                <ChevronRight />
              </div>
              <div class="next-arrow">
                <ChevronDoubleRight />
              </div>
            </div>
          </b-col>
          <b-col>
            གཡོན་པད་མ་དཀར་པོ་བསྣམས་པ།
          </b-col>
          <b-col>
            <div class="btn-section">
              <div
                class="minimize-arrow"
                @click="minimizeModal()"
                v-if="!hideModalBody"
              >
                <WindowMinimize />
              </div>
              <div class="maximize-arrow" @click="maximizeModal()" v-else>
                <ArrowUp />
              </div>
              <div class="close-arrow" @click="closeModal()">
                <Close />
              </div>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </template>
    <b-container fluid>
      <b-row>
        <b-col>
          ཕུད་རབས་རྒྱས་པའི་སྦྱོར་རྗེས་ཀྱི་ངག་འདོན་ཉུང་ངུར་བསྡུས་པ་ <br />
        </b-col>
      </b-row>
    </b-container>
  </b-modal>
</template>
<script>
import ChevronDoubleRight from "vue-material-design-icons/ChevronDoubleRight.vue";
import ChevronRight from "vue-material-design-icons/ChevronRight.vue";
import Close from "vue-material-design-icons/Close.vue";
import WindowMinimize from "vue-material-design-icons/WindowMinimize.vue";
import ArrowUp from "vue-material-design-icons/ArrowUp.vue";

export default {
  props: {
    results: {
      type: Object
    },
    index: {
      type: Number
    }
  },
  components: {
    ChevronDoubleRight,
    ChevronRight,
    Close,
    WindowMinimize,
    ArrowUp
  },
  data() {
    return {
      hideModalBody: false
    };
  },
  methods: {
    closeModal() {
      this.$refs["text-modal"].hide();
      this.hideModalBody = false;
    },
    minimizeModal() {
      this.hideModalBody = true;
    },
    maximizeModal() {
      this.hideModalBody = false;
    }
  }
};
</script>
<style lang="scss">
@import "@/assets/scss/index.scss";

.modal-content {
  .box-style {
    width: 2rem;
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    color: hsl(0, 100%, 100%);
    margin-right: 1rem;
  }
  .modalHeader {
    font-size: 1.5rem;
    color: hsla(37, 18%, 45%, 1);
    .arrow-section {
      display: flex;
      .next-arrow {
        @extend .box-style;
        background-color: $secondary-color;
      }
    }
    .btn-section {
      display: flex;
      justify-content: flex-end;
      .minimize-arrow {
        @extend .box-style;
        background-color: hsla(37, 18%, 45%, 1);
      }
      .close-arrow {
        @extend .minimize-arrow;
      }
      .maximize-arrow {
        @extend .minimize-arrow;
      }
    }
  }
  .modal-body {
    color: $primary-color;
    font-size: 2rem;
  }
  .modalBody {
    display: none;
  }
}
.modalContent {
  position: absolute;
  top: 96vh;
  transform: translateY(-100%);
}
</style>
