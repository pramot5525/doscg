<template lang="pug">
  .container
    .row
      .col-12
        b-card
         b-card-text Please use “Google API” for finding the best way to go to Central World from SCG Bangsue

        b-card.mt-3(v-if="ans")
          b-card-text.mb-3 Best way to Central World from SCG Bangsue
          p
            b Start
            | : {{ ans[0].start_address }}
          p
            b End
            | : {{ ans[0].end_address }}
          p
            b Time
            | : {{ ans[0].duration.text }}
          p
            b Distance
            | : {{ ans[0].distance.text }}

          p.mt-2: b Route:
          ul
            li(v-for="(route, i) in ans[0].steps")
              p(v-html="route")


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
    this.$axios.$get("/api/googleAPI").then(res => {
      this.ans = res.routes
        .map(o =>
          o.legs.map(n => ({
            start_address: n.start_address,
            end_address: n.end_address,
            distance: n.distance,
            duration: n.duration,
            steps: n.steps.map(p => p.html_instructions)
          }))
        )
        .flat();
    });
  }
};
</script>

<style lang="scss" scoped></style>
