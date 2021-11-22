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
          <b-col cols="3">
            <div class="arrow-section" v-if="!hideModalBody">
              <div class="next-arrow" @click="expandRender()">
                <ChevronRight />
              </div>
              <div class="next-arrow">
                <ChevronDoubleRight />
              </div>
            </div>
          </b-col>
          <b-col cols="6">
            <!-- གཡོན་པད་མ་དཀར་པོ་བསྣམས་པ། -->
            {{ resultText }}
          </b-col>
          <b-col cols="3">
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
          <!-- ཕུད་རབས་རྒྱས་པའི་སྦྱོར་རྗེས་ཀྱི་ངག་འདོན་ཉུང་ངུར་བསྡུས་པ་ <br /> -->
          {{ resultTitle }}
        </b-col>
      </b-row>
    </b-container>
  </b-modal>
</template>
<script>
import { Services } from "@/services/services";
import ChevronDoubleRight from "vue-material-design-icons/ChevronDoubleRight.vue";
import ChevronRight from "vue-material-design-icons/ChevronRight.vue";
import Close from "vue-material-design-icons/Close.vue";
import WindowMinimize from "vue-material-design-icons/WindowMinimize.vue";
import ArrowUp from "vue-material-design-icons/ArrowUp.vue";

export default {
  props: {
    title: {
      type: String
    },
    start: {
      type: Number || String
    },
    end: {
      type: Number || String
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
      hideModalBody: false,
      resultTitle: "",
      resultText: ""
    };
  },
  watch: {
    title() {
      this.fetchTextToRender(this.title, this.start, this.end);
    }
  },
  methods: {
    closeModal() {
      this.$refs["text-modal"].hide();
      this.resultTitle = "";
      this.resultText = "";
      this.hideModalBody = false;
    },
    minimizeModal() {
      this.hideModalBody = true;
    },
    maximizeModal() {
      this.hideModalBody = false;
    },
    async fetchTextToRender(titleValue, startValue, endValue) {
      const res = await Services.renderText(titleValue, startValue, endValue);
      this.resultText = res && res.data ? res.data.text : "";
      this.resultTitle = res && res.data ? res.data.text_title : "";
      if (titleValue === "") {
        this.$toasted.error("No results found", { duration: 5000 });
      }
    },
    expandRender() {
      const newEnd = Number(this.end) + 2;
      this.fetchTextToRender(this.title, this.start, newEnd);
    }
  }
};
</script>
<style lang="scss">
@import "@/assets/scss/index.scss";

.modal-dialog {
  width: 100%;
  margin: 0;
  .modal-content {
    width: 100vw;
    height: 100vh;
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
    height: auto;
    position: absolute;
    top: 100vh;
    transform: translateY(-100%);
  }
}
</style>
