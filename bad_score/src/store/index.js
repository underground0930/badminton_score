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
    totalScore: [[0, 0], [0, 0], [0, 0]],
    order: [0, 2, 1, 3],
    currentOrder: 0,
    serves: [
      ['S', '', 'R', ''],
      ['S', '', 'R', ''],
      ['S', '', 'R', ''],
      ['S', '', 'R', ''],
    ],
    scores: [
      [score(), score(), score(), score()],
      [score(), score(), score(), score()],
      [score(), score(), score(), score()],
      [score(), score(), score(), score()],
    ],
    players: [
      {
        name: 'AAAAAAAAさん',
        team: 'チームうどんこ',
      },
      {
        name: 'Bさん',
        team: 'チームうどんこ',
      },
      {
        name: 'Cさん',
        team: 'チームYYY',
      },
      {
        name: 'Dさん',
        team: 'チームZZZ',
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
      // 点数を加算する
    },
  },
  actions: {},
})

export default store
