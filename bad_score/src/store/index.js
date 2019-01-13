import Vue from 'vue'
import Vuex from 'vuex'
import { score } from '../utils'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    config: null,
    index: 0,
    currentOrder: 0,
    totalScore: [[0, 0], [0, 0], [0, 0]],
    serves: null,
    scores: null,
    players: null,
  },
  getters: {
    players: ({ players }) => {
      return index => {
        return players[index]
      }
    },
    totalScore: ({ totalScore }) => {
      return (i, j) => {
        return totalScore[i][j]
      }
    },
    config: ({ config }) => {
      return config
    },
  },
  mutations: {
    init(state, payload) {
      let { config, players } = payload
      if (config.type === 0) {
        // シングルス
        state.scores = [
          [score(), score()],
          [score(), score()],
          [score(), score()],
        ]
        state.serves = [['S', 'R'], ['S', 'R'], ['S', 'R']]
      } else {
        // ダブルス
        state.scores = [
          [score(), score(), score(), score()],
          [score(), score(), score(), score()],
          [score(), score(), score(), score()],
        ]
        state.serves = [
          ['S', '', 'R', ''],
          ['S', '', 'R', ''],
          ['S', '', 'R', ''],
        ]
      }
      state.players = players
      state.config = config
    },
    setOrder(state, payload) {
      // 最初に点数の入る順番を決める、
    },
    changeCurrentOrder(state, payload) {
      if (state.type) {
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
    setScore({ scores, type }, { game, player, index }) {
      // totalScore[game]

      scores[game][player][index]['num'] = '●'

      // テーブルの点数を更新
      if (type) {
        // シングルです
      } else {
        // ダブルスです
      }
    },
  },
  actions: {},
})

export default store
