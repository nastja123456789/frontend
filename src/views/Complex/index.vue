<template>
  <div class="complex">
    <div class="container">
      <div class="complex__box">
        <div class="complex__top">
          <div class="complex__title">
            КОМПЛЕКСНЫЙ ОБЕД - 135 РУБЛЕЙ
          </div>
          <div class="complex__time">
            с 11:30 до 16:00
          </div>
        </div>

        <div class="complex__list">
          <div class="complex__item complex__item--header">
            <div class="complex__name">
              Наименование
            </div>
            <div class="complex__value">
              Масса, г
            </div>
          </div>
          <div
            v-for="(item, i) in list"
            :key="i"
            class="complex__item"
          >
            <div class="complex__name">
              {{ item.name }}
            </div>
            <div class="complex__value">
              <span>
                {{ item.weight }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageComplex',
  data () {
    return {
      list: null
    }
  },
  mounted () {
    this.getMenu()
  },
  methods: {
    async getMenu () {
      try {
        const response = await this.$api.get('/food')
        this.list = response.data && response.data.complex
      } catch (e) {
        console.log('err: ', e)
      }
    }
  }
}
</script>
