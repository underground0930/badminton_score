import Vue from 'vue'
import Vuex from 'vuex'
import { score } from '../utils'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    config: null,
    currentOrders: [0, 0, 0],
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
    length: ({ players }) => {
      return players.length
    },
    totalScore: ({ totalScore }) => {
      return (i, j) => {
        return totalScore[i][j]
      }
    },
    getServe({ serves }, { length }) {
      return (game, player) => {
        const servesNum = serves[game][player]
        if (length === 2) {
          if (servesNum === 0) {
            return 'S'
          }
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
    newServeObj({ serves }) {
      return game => {
        const obj = {}
        serves[game].forEach((v, i) => {
          obj[v] = i
        })
        return obj
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
        serve = [0, 2, 3, 1]
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
    setScore(state, { game, player, index, point, whichPoint }) {
      state.totalScore[game].splice(whichPoint, 1, point)
      state.scores[game][player][index]['num'] = point
      state.currentIndexs[game] = state.currentIndexs[game] + 1
    },
    initTotalScore(state) {
      state.totalScore = [[0, 0], [0, 0], [0, 0]]
    },
    initScore(state, { game, serve }) {
      state.scores.splice(game, 1, serve.map(v => score(v, serve)))
    },
    initCurrentIndexs(state) {
      state.currentIndexs = [1, 1, 1]
    },
    setServe(state, { game, serve }) {
      state.serves.splice(game, 1, serve)
    },
    updateCurrentOrders(state, { game, add }) {
      if (add) {
        state.currentOrders[game] = state.currentOrders[game] + 1
      } else {
        state.currentOrders[game] = 0
      }
    },
  },
  actions: {
    setScore({ state, commit, getters, dispatch }, { game, player, index }) {
      const [type, currentIndexs] = [state.type, state.currentIndexs]
      let whichPoint
      let orderObj = getters.newServeObj(game)
      let currentOrder = state.currentOrders[game]

      // 現在のindexだけclickを許可
      if (currentIndexs[game] !== index) return

      // 点数は順番に入っていく
      if (orderObj[currentOrder] === player) {
        // 同じ人が連続で得点
      } else if (orderObj[currentOrder + 1] === player) {
        // サービスオーバーで得点
        dispatch('updateCurrentOrders', { game, add: true })
      } else if (
        currentOrder + 1 === getters.length &&
        orderObj[0] === player
      ) {
        // サービスオーバーで得点 0からスタート
        dispatch('updateCurrentOrders', { game, add: false })
      } else {
        return
      }
      // どちらのチームに得点が入るか決める
      if (type === 0) {
        whichPoint = player === 0 ? 0 : 1
      } else {
        whichPoint = player < 2 ? 0 : 1
      }
      const point = state.totalScore[game][whichPoint] + 1
      commit('setScore', { game, player, index, point, whichPoint })
    },
    updateCurrentOrders({ commit }, { game, add }) {
      commit('updateCurrentOrders', { game, add })
    },
    initCurrentIndexs({ commit }) {
      commit('initCurrentIndexs')
    },
    initScore({ commit }, { game, serve }) {
      commit('initScore', { game, serve })
    },
    setServe({ commit }, { game, serve }) {
      commit('setServe', { game, serve })
    },
    initTotalScore({ commit }) {
      commit('initTotalScore')
    },
  },
})

export default store
