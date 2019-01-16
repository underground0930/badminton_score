import Vue from 'vue'
import Vuex from 'vuex'
import { score } from '../utils'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    config: null,
    currentIndexs: [1, 1, 1],
    totalScore: [[0, 0], [0, 0], [0, 0]],
    serves: null,
    scores: null,
    players: null,
  },
  getters: {
    getPlayer: ({ players }) => {
      return index => {
        return players[index]
      }
    },
    totalScore: ({ totalScore }) => {
      return (i, j) => {
        return totalScore[i][j]
      }
    },
    getServe({ serves }) {
      return (game, player) => {
        const servesNum = serves[game][player]
        const length = serves[game].length
        if (length === 2 && servesNum === 0) {
          return 'S'
        } else if (length === 2 && servesNum === 1) {
          return 'R'
        }
        if (servesNum === 0) {
          return 'S'
        } else if (servesNum === 3) {
          return 'R'
        }
        return ''
      }
    },
  },
  mutations: {
    init(state, payload) {
      let { config, players } = payload
      let serve

      if (config.type === 0) {
        serve = [0, 1]
      } else {
        serve = [0, 3, 2, 1]
      }
      state.serves = [serve, serve, serve]
      state.scores = [
        serve.map(v => score(v, serve)),
        serve.map(v => score(v, serve)),
        serve.map(v => score(v, serve)),
      ]
      state.players = players
      state.config = config
    },
    setScore(state, { game, player, index, point, which }) {
      state.totalScore[game].splice(which, 1, point)
      state.scores[game][player][index]['num'] = point
      state.currentIndexs[game] = state.currentIndexs[game] + 1
    },
    clearScore(state, { game, serve }) {
      state.scores.splice(game, 1, serve.map(v => score(v, serve)))
    },
    setServe(state, { game, serve }) {
      state.serves.splice(game, 1, serve)
    },
  },
  actions: {
    setScore({ state, commit }, { game, player, index }) {
      // 現在のインデックス以外をクリックしても無視
      if (state.currentIndexs[game] !== index) return
      // どちらに点数を入れるかを決める
      const which = player % 2 === 0 ? 0 : 1
      // 現在トータルのスコアに１点追加
      const point = state.totalScore[game][which] + 1
      commit('setScore', { game, player, index, point, which })
    },
    clearScore({ commit }, { game, serve }) {
      commit('clearScore', { game, serve })
    },
    setServe({ commit }, { game, serve }) {
      commit('setServe', { game, serve })
    },
  },
})

export default store
