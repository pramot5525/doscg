<template lang="pug">
  .container
    .row
      .col-12
        b-card
         b-card-text If A = 21, A + B = 23, A + C = -21 - Please create a new function for finding B and C value

        b-card.mt-3
          b-card-text {{ ans }}
    .row.mt-3
      .col-12
        label server/controllers/DOSCG.js

</template>

<script>
export default {
  data() {
    return {
      ans: null
    };
  },

  mounted() {
    this.$axios.$get("/api/findBC").then(res => {
      this.ans = res;
    });
  }
};
</script>

<style lang="scss" scoped></style>
