import Vue from 'vue'

import dayjs from 'dayjs'
import 'dayjs/locale/ru'
import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.locale('ru')
dayjs.extend(customParseFormat)

Vue.prototype.$dayjs = dayjs
