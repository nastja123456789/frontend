import Vue from 'vue'
import VueRouter from 'vue-router'

const Index = () => import('@/views/Index')
const News = () => import('@/views/News')
const Complex = () => import('@/views/Complex')
const Menu = () => import('@/views/Menu')
const Schedule = () => import('@/views/Schedule')
const Free = () => import('@/views/Free')
const Navigation = () => import('@/views/Navigation')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'PageIndex',
    component: Index
  },
  {
    path: '/news',
    name: 'PageNews',
    component: News,
    meta: {
      title: 'Новости'
    }
  },
  {
    path: '/complex',
    name: 'PageComplex',
    component: Complex,
    meta: {
      title: 'Комплексный обед'
    }
  },
  {
    path: '/menu',
    name: 'PageMenu',
    component: Menu,
    meta: {
      title: 'Меню'
    }
  },
  {
    path: '/schedule',
    name: 'PageSchedule',
    component: Schedule,
    meta: {
      title: 'Расписание'
    }
  },
  {
    path: '/free',
    name: 'PageFree',
    component: Free,
    meta: {
      title: 'Свободные аудитории'
    }
  },
  {
    path: '/navigation',
    name: 'PageNavigation',
    component: Navigation,
    meta: {
      title: 'Навигация'
    }
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
