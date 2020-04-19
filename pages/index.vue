<template lang="pug">
  .container
    .row
      .col-12
        p(v-text="ans")
</template>

<script>
export default {
  data() {
    return {
      ans: null
    };
  },

  mounted() {
    this.$axios.$get("/api/xyz").then(res => {
      this.ans = res;
    });
  }
};
</script>

<style lang="scss" scoped></style>
