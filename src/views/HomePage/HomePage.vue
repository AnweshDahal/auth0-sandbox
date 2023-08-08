<template>
  <div class="home-page">
    <h1 class="sample-heading">This is the home page</h1>
  </div>
</template>

<script>
export default {
  name: "HomePage",
};
</script>

<style lang="scss" scoped>
.home-page {
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;

  .sample-heading {
    font-family: "Manrope", sans-serif;
  }
}
</style>
