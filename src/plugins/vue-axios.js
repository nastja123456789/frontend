import Vue from 'vue'
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://192.168.255.133/api',
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 3000
})

Vue.prototype.$api = api

export default api
