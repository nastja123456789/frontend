import * as TYPES from './types'

const namespaced = true

const state = () => ({
  menu: false
})

const actions = {}

const mutations = {
  [TYPES.TOGGLE_MENU] (state, payload) {
    state.menu = payload
  },

  // [TYPES.CHANGE_STATE] (state, payload) {
  //   state[payload.type] = payload.data
  // }
}

const getters = {}

export default {
  namespaced,
  actions,
  state,
  mutations,
  getters
}
