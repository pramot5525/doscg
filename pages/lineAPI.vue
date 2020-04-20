<template lang="pug">
  .container
    .row
      .col-12
        b-card
         b-card-text Please create a small project using Line messaging API for getting a notification when your Line Bot can not answer a question to the customer more than 10 second
        b-card.mt-3
          b-card-text Please allow notification permission
          b-card-text then add Line Bot
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
  },

  mounted() {
    this.requiredAndSaveNotification();
  },

  methods: {
    urlBase64ToUint8Array(base64String) {
      const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
      const base64 = (base64String + padding)
        .replace(/-/g, "+")
        .replace(/_/g, "/");

      const rawData = window.atob(base64);
      const outputArray = new Uint8Array(rawData.length);

      for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
      }
      return outputArray;
    },

    async requiredAndSaveNotification() {
      const publicVapidKey =
        "BOjcXS9MFm1Lg6IXZO0blgkPQ0xunhn69i0CQmnNLwo24YPL47V94QGUdFF1QKUJRBawt8AqNhM1_PjGEkoHQyg";
      if ("serviceWorker" in navigator) {
        const register = await navigator.serviceWorker.register("/sw.js", {
          scope: "/"
        });

        const subscription = await register.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: this.urlBase64ToUint8Array(publicVapidKey)
        });

        // save endpoit to databse mongo
        await this.$axios.$post("/api/saveDevice", {
          subscription,
          endpoint: subscription.endpoint
        });
      } else {
        console.error("Service workers are not supported in this browser");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.qrcode {
  max-width: 200px;
}
</style>
