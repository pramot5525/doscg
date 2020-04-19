<template lang="pug">
  .container
    .row
      .col-12
        b-card
         b-card-text X, Y, 5, 9, 15, 23, Z - Please create a new function for finding X, Y, Z value
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
    this.$axios.$get("/api/xyz").then(res => {
      this.ans = res.ans;
    });
  }
};
</script>

<style lang="scss" scoped></style>
