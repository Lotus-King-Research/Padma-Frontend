<template>
  <b-modal id="messageBox" hide-footer>
    <template #modal-title>
      Message Box
    </template>
    <div class="d-block text-center">
      <h3>{{ message }}</h3>
    </div>
    <b-button class="mt-3" block @click="turnOfTokenization()"
      >Close Me</b-button
    >
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
    }
  }
};
</script>
