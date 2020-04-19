<template lang="pug">
  .app
    my-header
    .body
      nuxt
    my-footer
</template>

<script>
import Header from "../components/Header";
import Footer from "../components/Footer";

export default {
  components: {
    myHeader: Header,
    myFooter: Footer
  }
};
</script>
<style lang="scss">
.app {
  .body {
    margin-top: 40px;
    min-height: calc(100vh - 128px);
  }
}
</style>
