<template lang="pug">
  .container
    .row
      .col-12
        b-card
         b-card-text Please create a small project using Line messaging API for getting a notification when your Line Bot can not answer a question to the customer more than 10 second
        b-card.mt-3
          b-card-text LINE Bot ID: @442fzklh
          img.qrcode(src="/img/442fzklh.png")
          p say: Hello
          p bot: Hello

          p say: >> other word <<
          p bot: Delay 10s for send noti
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
  }
};
</script>

<style lang="scss" scoped>
.qrcode {
  max-width: 200px;
}
</style>
