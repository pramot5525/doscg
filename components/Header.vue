<template lang="pug">
  b-navbar(type="dark" variant="dark")
    .container
      ul.nav
        li.nav-item
          n-link(:to="{ name: 'index' }" exact) Find X Y Z
        li.nav-item
          n-link(:to="{ name: 'findBC' }") Find B C
        li.nav-item
          n-link(:to="{ name: 'googleRoute' }") Google route
        li.nav-item
          n-link(:to="{ name: 'lineAPI' }") Line Messaging API

      button.btn.btn-primary(
        type='button'
        @click="$router.push({ name: 'portFolio' })"
        ) Port folio



</template>

<script></script>

<style lang="scss" scoped>
@import "~assets/scss/_variables.scss";

.nav {
  .nav-item {
    font-size: 1.2rem;
    margin: 0 10px;

    a {
      color: white;

      &:hover {
        color: $color-primary;
        // text-decoration: none;
      }

      &.nuxt-link-active {
        color: $color-primary;
      }
    }
  }
}
</style>
