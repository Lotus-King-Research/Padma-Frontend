<template>
  <div class="noResultsFoundMessage">
    <p>
      {{ message }}
    </p>
  </div>
</template>
<script>
export default {
  props: {
    message: {
      type: String
    }
  }
};
</script>
<style lang="scss" scoped>
.noResultsFoundMessage {
  width: 100%;
  height: 100%;
  padding-top: 30%;
  display: flex;
  align-items: center;

  p {
    font-size: 1.5em;
    color: hsla(37, 18%, 45%, 1);
    line-height: 1.8rem;
    padding-left: 1rem;
  }
}
</style>
