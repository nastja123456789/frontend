<template>
  <div class="news">
    <div class="container">
      <div class="news__box">
        <div class="news__list">
          <div
            v-for="(item, i) in list"
            :key="i"
            class="news__item"
          >
            <div class="news__image">
              <img :src="item.img">
            </div>
            <div class="news__description">
              <div class="news__title">
                {{ item.title }}
              </div>
              <div class="news__text">
                {{ item.text }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageNews',
  data () {
    return {
      list: null
    }
  },
  mounted () {
    this.getNews()
  },
  methods: {
    async getNews () {
      try {
        const response = await this.$api.get('/news')
        this.list = response.data
      } catch (e) {
        console.log('err: ', e)
      }
    }
  }
}
</script>
