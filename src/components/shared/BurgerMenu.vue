<template>
  <div class="burger-menu">
    <transition
      name="fade"
      mode="out-in"
    >
      <div
        v-if="menu"
        @click="TOGGLE_MENU(false)"
        class="burger-menu__bg"
      />
    </transition>

    <div
      :class="{'burger-menu__box--open' : menu}"
      class="burger-menu__box"
    >
      <div class="burger-menu__logo">
        <a
          @click.prevent="TOGGLE_MENU(false), $router.push('/')"
          href="/"
        >
          <img src="@/assets/img/menu-logo.png">
        </a>
      </div>

      <div class="burger-menu__block">
        <ul class="burger-menu__list">
          <li
            v-for="(item, i) in list"
            :key="i"
            class="burger-menu__item"
          >
            <a
              @click.prevent="item.link ? (TOGGLE_MENU(false), $router.push(item.link)) : (openSubmenu($event, !item.submenu), item.submenu = !item.submenu)"
              :href="item.link ? item.link : '#'"
              :class="{'burger-menu__link--active' : $route.fullPath === item.link}"
              class="burger-menu__link"
            >
              <div class="burger-menu__icon">
                <img :src="require(`@/assets/img/menu/${item.icon}`)">
              </div>

              <div class="burger-menu__text">
                {{ item.title }}
              </div>

              <div
                v-if="item.childrens"
                :class="{'burger-menu__arrow--open' : item.submenu}"
                class="burger-menu__arrow"
              >
                <img src="@/assets/icons/arrow.svg">
              </div>
            </a>

            <div
              v-if="item.childrens"
              class="burger-menu__submenu"
            >
              <div class="burger-menu__sublist">
                <a
                  @click.prevent="TOGGLE_MENU(false), $router.push(child.link)"
                  v-for="(child, c) in item.childrens"
                  :key="c"
                  :href="child.link"
                  :class="{'burger-menu__sublink--active' : $route.fullPath === child.link}"
                  class="burger-menu__sublink"
                >
                  {{ child.title }}
                </a>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'BurgerMenu',
  data () {
    return {
      list: [
        { icon: 'tasks.png', title: 'Расписание', link: '/schedule' },
        {
          icon: 'dining.png',
          title: 'Столовая',
          submenu: false,
          childrens: [
            { title: 'Комплексный обед', link: '/complex' },
            { title: 'Меню', link: '/menu' }
          ]
        },
        { icon: 'news.png', title: 'Новости', link: '/news' },
        { icon: 'free.png', title: 'Свободные аудитории', link: '/free' },
        { icon: 'navigation.png', title: 'Навигация', link: '/navigation' }
      ]
    }
  },
  computed: {
    menu () {
      return this.$store.state.layout.menu
    }
  },
  methods: {
    ...mapMutations('layout', ['TOGGLE_MENU']),

    openSubmenu (e, st) {
      const el = this.$funcs.findParent(e.target, 'burger-menu__item')

      if (el && el.children && el.children[1]) {
        const sub = el.children[1]

        if (st) {
          sub.style = `height: ${sub.scrollHeight}px`
        } else {
          sub.style = 'height: 0px'
        }
      }
    }
  }
}
</script>
