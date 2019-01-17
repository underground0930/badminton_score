import { score } from '../utils'

export default {
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
  setScore(state, { game, player, index, currentTotalPoint, isCurrent }) {
    state.totalScore[game].splice(isCurrent, 1, currentTotalPoint)
    state.scores[game][player][index]['num'] = currentTotalPoint
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
  updateGamesResults(state, { game, isCurrent }) {
    state.gamesResults[isCurrent] += 1
    state.gamesEnds[game] = true
  },
  updateCurrentOrders(state, { game, add }) {
    if (add) {
      state.currentOrders[game] = state.currentOrders[game] + 1
    } else {
      state.currentOrders[game] = 0
    }
  },
}
