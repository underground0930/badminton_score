import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    totalScore: [0, 0],
    order: [0, 2, 1, 3],
    currentOrder: 0,
    players: [
      {
        name: 'Aさん',
        serve: 'S',
        score: [0, 1, 2],
      },
      {
        name: 'Bさん',
        serve: '',
        score: [null, null, null],
      },
      {
        name: 'Cさん',
        serve: '',
        score: [null, null, null],
      },
      {
        name: 'Dさん',
        serve: 'R',
        score: [null, null, null],
      },
    ],
  },
  getters: {},
  mutations: {},
  actions: {},
})

export default store
