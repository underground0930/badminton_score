import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const score = () => {
  return [...Array(100)].map((item, index) => {
    return { num: null, input: false, index: index }
  })
}

const store = new Vuex.Store({
  state: {
    totalScoreA: [0, 0, 0],
    totalScoreB: [0, 0, 0],
    order: [0, 2, 1, 3],
    currentOrder: 0,
    players: [
      {
        name: 'AAAAAAAAさん',
        team: 'チームうどんこ',
        serve: 'S',
        score: [score(), score(), score()],
      },
      {
        name: 'Bさん',
        team: 'チームうどんこ',
        serve: '',
        score: [score(), score(), score()],
      },
      {
        name: 'Cさん',
        team: 'チームYYY',
        serve: '',
        score: [score(), score(), score()],
      },
      {
        name: 'Dさん',
        team: 'チームZZZ',
        serve: 'R',
        score: [score(), score(), score()],
      },
    ],
  },
  getters: {},
  mutations: {
    setOrder(state, payload) {
      // 最初に点数の入る順番を決める、
    },
    changeCurrentOrder(state, payload) {
      // 現在の得点者を切り替える
    },
    setTotalScore(state, payload) {
      // 点数を
    },
  },
  actions: {},
})

export default store
