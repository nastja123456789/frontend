<template>
  <div id="app">
    <the-header />

    <div class="wrapper">
      <router-view />
    </div>

    <burger-menu />
  </div>
</template>

<script>
import TheHeader from '@/components/layout/TheHeader'
import BurgerMenu from '@/components/shared/BurgerMenu'

export default {
  name: 'App',
  components: {
    TheHeader,
    BurgerMenu
  }
}
</script>
