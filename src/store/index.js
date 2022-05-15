import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

const state = {
  config: null,
  currentOrders: [0, 0, 0],
  currentIndexs: [1, 1, 1],
  totalScores: [
    [0, 0],
    [0, 0],
    [0, 0],
  ],
  gamesResults: [0, 0],
  gamesEnds: [null, null, null],
  serves: null,
  scores: null,
  players: null,
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
})
