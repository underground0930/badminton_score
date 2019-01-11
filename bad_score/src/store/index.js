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
    isSingle: false,
    index: 0,
    totalScore: [[0, 0], [0, 0], [0, 0]],
    order: [0, 3, 1, 2],
    currentOrder: 0,
    serves: [['S', '', 'R', ''], ['S', '', 'R', ''], ['S', '', 'R', '']],
    scores: [
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
      if (state.isSingle) {
        // シングルです
      } else {
        // ダブルスです
      }

      // 現在の得点者を切り替える
      return state.order[state.changeCurrentOrder]
    },
    setTotalScore(state, payload) {
      // 点数を加算する
    },
    setScore({ scores, isSingle }, { game, player, index }) {
      // totalScore[game]

      scores[game][player][index]['num'] = '●'

      // テーブルの点数を更新
      if (isSingle) {
        // シングルです
      } else {
        // ダブルスです
      }
    },
  },
  actions: {},
})

export default store
