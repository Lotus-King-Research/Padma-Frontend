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
            <div
              class="arrow-section"
              v-if="!hideModalBody"
              v-show="hideRenderingBtn"
            >
              <div class="next-arrow single-arrow" @click="expandRender()">
                <img src="@/assets/images/single-arrow.svg" alt="render text" />
              </div>
              <div class="next-arrow double-arrow" @click="renderFullText()">
                <img
                  src="@/assets/images/double-cross.svg"
                  alt="show full text"
                />
              </div>
            </div>
          </b-col>
          <b-col cols="6">
            <!-- གཡོན་པད་མ་དཀར་པོ་བསྣམས་པ། -->
            <div class="title-text">
              {{ resultTitle }}
            </div>
          </b-col>
          <b-col cols="3">
            <div class="btn-section">
              <div
                class="minimize-arrow"
                @click="minimizeModal()"
                v-if="!hideModalBody"
              >
                <img
                  src="@/assets/images/minimize-icon.svg"
                  alt="minimize modal"
                />
              </div>
              <div class="maximize-arrow" @click="maximizeModal()" v-else>
                <img src="@/assets/images/arrow-up.svg" alt="maximize modal" />
              </div>
              <div class="close-arrow" @click="closeModal()">
                <img src="@/assets/images/close-icon.svg" alt="close modal" />
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
          {{ resultText }}
        </b-col>
      </b-row>
    </b-container>
  </b-modal>
</template>
<script>
import { Services } from "@/services/services";

export default {
  props: {
    title: {
      type: String
    },
    titleText: {
      type: String
    },
    start: {
      type: Number || String
    },
    end: {
      type: Number || String
    }
  },
  data() {
    return {
      hideModalBody: false,
      resultTitle: "",
      resultText: "",
      hideRenderingBtn: true
    };
  },
  watch: {
    title() {
      this.fetchTextToRender(this.title, this.start, this.end);
    },
    titleText() {
      this.hideRenderingBtn = false;
      this.fetchTextToRender(this.titleText);
    }
  },
  methods: {
    closeModal() {
      this.$refs["text-modal"].hide();
      this.resultTitle = "";
      this.resultText = "";
      this.hideModalBody = false;
      this.hideRenderingBtn = true;
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
    },
    renderFullText() {
      this.fetchTextToRender(this.title);
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
    overflow: scroll;
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
        .single-arrow {
          img {
            width: 20%;
          }
        }
        .double-arrow {
          img {
            width: 32%;
          }
        }
      }
      .title-text {
        display: flex;
        justify-content: center;
      }
      .btn-section {
        display: flex;
        justify-content: flex-end;
        .minimize-arrow {
          @extend .box-style;
          background-color: hsla(37, 18%, 45%, 1);
          img {
            width: 28%;
          }
        }
        .close-arrow {
          @extend .minimize-arrow;
          img {
            width: 28%;
          }
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
