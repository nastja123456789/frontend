<template>
  <div class="index">
    <div class="index__box">
      <div class="index__left">
        <div class="index__slider">
          <swiper
            ref="swiper"
            :options="options"
            class="index__swiper"
          >
            <swiper-slide
              v-for="(item, i) in news"
              :key="i"
              class="index__slide"
            >
              <div class="index__image">
                <img :src="item.img">
              </div>
              <div class="index__description">
                <div class="index__title">
                  {{ item.title }}
                </div>
                <div class="index__text">
                  {{ item.text }}
                </div>
              </div>
            </swiper-slide>
          </swiper>
        </div>
      </div>

      <div class="index__right">
        <div class="index__sidebar">
          <div class="index__frees">
            <div>
              Свободные аудитории на 7 пару
            </div>
            <div>
              (18:10 - 19:30)
            </div>
          </div>

          <div class="index__items">
            <div
              v-for="(item, i) in rooms"
              :key="i"
              class="index__item"
            >
              <div class="index__floor">
                {{ i }} Этаж
              </div>
              <div class="index__numbers">
                <div
                  v-for="(child, c) in item"
                  :key="c"
                  class="index__number"
                >
                  {{ child.number }}<small>({{ child.capacity }})</small>
                </div>
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
  name: 'PageIndex',
  data () {
    return {
      news: null,
      rooms: null,
      options: {
        slidesPerView: 1,
        autoplay: {
          delay: 3000
        }
      }
    }
  },
  mounted () {
    this.getNews()
    this.getNumbers()
  },
  methods: {
    async getNews () {
      try {
        const response = await this.$api.get('/news')
        this.news = response.data
      } catch (e) {
        console.log('err: ', e)
      }
    },

    async getNumbers () {
      try {
        const response = await this.$api.get('https://api.hseapp.ru/gateway/ruz/rooms/2211?classes=18')
        const rooms = response.data && response.data.rooms

        if (rooms) {
          this.rooms = rooms.reduce((arr, item) => {
            if (item.floor) {
              if (!arr[item.floor]) {
                arr[item.floor] = []
              }
              arr[item.floor].push(item)
            }
            return arr
          }, {})
        }
      } catch (e) {
        console.log('err: ', e)
      }
    }
  }
}
</script>
