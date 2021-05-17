<template>
  <header class="header">
    <div class="container">
      <div class="header__box">
        <div class="header__left">
          <div
            @click="TOGGLE_MENU(true)"
            class="header__burger burger"
          >
            <span />
          </div>
          <div class="header__title">
            {{ title }}
          </div>
        </div>

        <the-logo />

        <div class="header__right">
          <div class="clocks">
            <img src="@/assets/icons/clocks.svg">
            <div class="clocks__text">
              <div class="clocks__date">
                {{ days[$dayjs().day()] }}, {{ $dayjs().format('D MMM') }}
              </div>
              <div class="clocks__time">
                {{ $dayjs().format('HH:mm') }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { mapMutations } from 'vuex'
import TheLogo from '@/components/shared/TheLogo'

export default {
  name: 'TheHeader',
  components: {
    TheLogo
  },
  data () {
    return {
      days: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
    }
  },
  computed: {
    title () {
      return this.$route.meta && this.$route.meta.title
    }
  },
  methods: {
    ...mapMutations('layout', ['TOGGLE_MENU'])
  }
}
</script>
