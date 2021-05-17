<template>
  <div class="free">
    <div class="container">
      <div class="free__box">
        <div class="free__top">
          Интервал: <small>(свободные аудитории с {{ from }} по {{ to }} пару)</small>

          <div class="free__lines">
            <div class="free__line">
              с
              <div class="free__input">
                <v-input
                  type="number"
                  v-model="from"
                  @input="getRooms()"
                  class-el="inpt__input--default"
                />
              </div>
            </div>

            <div class="free__line">
              по
              <div class="free__input">
                <v-input
                  type="number"
                  v-model="to"
                  @input="getRooms()"
                  class-el="inpt__input--default"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="free__list">
          <div
            v-for="(item, i) in rooms"
            :key="i"
            class="free__item"
          >
            <div class="free__floor">
              {{ i }} этаж
            </div>
            <div class="free__numbers">
              <div
                v-for="(child, c) in item"
                :key="c"
                class="free__number"
              >
                {{ child.number }}
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
  name: 'PageFree',
  data () {
    return {
      from: 1,
      to: 8,
      rooms: null
    }
  },
  mounted () {
    this.getRooms()
  },
  methods: {
    async getRooms () {
      try {
        const response = await this.$api.get(`https://api.hseapp.ru/gateway/ruz/rooms/2211?classes=${this.from}${this.to}`)
        if (response && response.data && response.data.rooms) {
          this.rooms = response.data.rooms.reduce((arr, item) => {
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
