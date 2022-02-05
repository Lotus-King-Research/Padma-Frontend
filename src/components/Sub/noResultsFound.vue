<template>
  <div class="noResultsFoundMessage">
    <p>
      No results were found with the given input.
    </p>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
.noResultsFoundMessage {
  width: 100%;
  height: 100%;
  padding-top: 30%;
  display: flex;
  justify-content: center;
  align-items: center;

  p {
    font-size: 1.5em;
    color: hsla(37, 18%, 45%, 1);
    line-height: 1.8rem;
  }
}
</style>
