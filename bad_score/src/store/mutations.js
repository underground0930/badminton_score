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
    state.totalScores[game].splice(isCurrent, 1, currentTotalPoint)
    state.scores[game][player][index]['num'] = currentTotalPoint
    state.currentIndexs[game] = state.currentIndexs[game] + 1
  },
  rollbackGameData(state, { game, index }) {
    state.currentIndexs[game] = index - 1
    state.scores[game].forEach((v, i, arr) => {
      let newScore = v.slice()
      newScore.fill({ num: null }, index)
      arr.splice(i, 1, newScore)
    })

    /// ////////////
  },
  initGameData(state, { game, serve }) {
    state.currentIndexs[game] = 1
    state.totalScores.splice(game, 1, [0, 0])
    state.scores.splice(game, 1, serve.map(v => score(v, serve)))
    state.serves.splice(game, 1, serve)
    if (state.gamesEnds[game] !== null) {
      state.gamesResults[state.gamesEnds[game]] -= 1
      state.gamesEnds[game] = null
    }
  },
  setGamesResults(state, { game, isCurrent }) {
    state.gamesResults[isCurrent] += 1
    state.gamesEnds[game] = isCurrent
  },
  setCurrentOrders(state, { game, add }) {
    if (add) {
      state.currentOrders[game] = state.currentOrders[game] + 1
    } else {
      state.currentOrders[game] = 0
    }
  },
}
