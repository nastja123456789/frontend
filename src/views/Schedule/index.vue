<template>
  <div class="schedule">
    <div class="container">
      <div class="schedule__box">
        <div class="schedule__top">
          <div class="schedule__left">
            <v-btn
              @click="getStudents()"
              :loading="loading"
              :disabled="loading"
              class="schedule__btn btn-orange btn--medium btn--center"
            >
              Студент
            </v-btn>

            <div class="schedule__input">
              <v-input
                v-model="name"
                @input="clearError('name')"
                :error="errors.name"
                class-el="inpt__input--default"
              />
              <span
                @click="name = '', clearError('name')"
                class="schedule__clear"
              >
                <img src="@/assets/icons/close.svg">
              </span>
            </div>
          </div>

          <div class="schedule__datepicker">
            <date-picker
              v-model="date"
              @change="clearError('date'), (current ? getSchedule(current) : '')"
              format="DD.MM.YYYY"
              value-type="YYYY-MM-DD"
              placeholder="ДД.ММ.ГГГГ"
            />
            <transition
              name="fade"
              mode="out-in"
            >
              <div
                v-if="errors.date.status"
                class="error__text"
              >
                {{ errors.date.text }}
              </div>
            </transition>
          </div>
        </div>

        <div class="schedule__list">
          <div
            @click="getSchedule(item)"
            v-for="(item, i) in list"
            :key="i"
            class="schedule__link"
          >
            <div class="schedule__link-name">
              {{ item.label }}
            </div>
            <div class="schedule__link-desc">
              {{ item.description }}
            </div>
          </div>

          <div
            v-for="(item, i) in schedule"
            :key="i"
            class="schedule__item"
          >
            <div class="schedule__date">
              {{ item[0].day }}
              <span>
                {{ $dayjs(i, 'YYYY.MM.DD').format('DD') }}
              </span>
              {{ $dayjs(i, 'YYYY.MM.DD').format('MMMM') }}
            </div>

            <div class="schedule__lessons">
              <div
                v-for="(child, c) in item"
                :key="c"
                class="schedule__lesson"
              >
                <div class="schedule__info">
                  <div class="schedule__time">
                    {{ child.item.beginLesson }} - {{ child.item.endLesson }}
                  </div>
                  {{ child.item.lessonNumberStart }}-я пара
                </div>

                <div class="schedule__block">
                  <div class="schedule__name">
                    {{ child.item.discipline }}
                  </div>
                  <div class="schedule__row">
                    <div class="schedule__icon">
                      <img src="@/assets/icons/type.svg">
                    </div>
                    <div class="schedule__value schedule__value--type">
                      {{ child.item.kindOfWork }}
                    </div>
                  </div>
                  <div class="schedule__row">
                    <div class="schedule__icon">
                      <img src="@/assets/icons/location.svg">
                    </div>
                    <div class="schedule__value">
                      {{ child.item.auditorium }} <span>({{ child.item.building }})</span>
                    </div>
                  </div>
                  <div class="schedule__row">
                    <div class="schedule__icon">
                      <img src="@/assets/icons/user.svg">
                    </div>
                    <div class="schedule__value">
                      {{ child.item.lecturer }}
                    </div>
                  </div>
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
  name: 'PageSchedule',
  data () {
    return {
      name: '',
      date: '',
      list: null,
      schedule: null,
      current: null,
      loading: false,
      errors: {
        name: {
          status: false,
          text: ''
        },
        date: {
          status: false,
          text: ''
        }
      }
    }
  },
  methods: {
    clearError (type) {
      this.errors[type].status = false
      this.errors[type].text = ''
    },

    async getStudents () {
      this.schedule = null
      this.current = null
      if (!this.name) {
        this.errors.name.status = true
        this.errors.name.text = 'Введите ФИО'
        return false
      }
      if (!this.date) {
        this.errors.date.status = true
        this.errors.date.text = 'Укажите дату'
        return false
      }

      try {
        this.loading = true
        const response = await this.$api.get('/search', {
          params: {
            str: this.name
          }
        })
        this.loading = false
        if (response && response.data) {
          this.list = response.data
        }
      } catch (e) {
        console.log('err: ', e)
      }
    },

    async getSchedule (item) {
      this.list = null
      this.current = item
      try {
        const response = await this.$api.get('/schedule', {
          params: {
            type: item.type,
            id: item.id,
            start: this.date,
            finish: this.date
          }
        })
        if (response && response.data) {
          this.schedule = response.data.reduce((arr, item) => {
            if (!arr[item.date]) {
              arr[item.date] = []
            }
            arr[item.date].push({
              day: item.dayOfWeekString,
              date: item.date,
              item
            })
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
