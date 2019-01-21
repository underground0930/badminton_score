import { score, whichPoint } from '../utils'

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
  setScore(state, { game, player, index, currentTotalPoint, current }) {
    state.totalScores[game].splice(current, 1, currentTotalPoint)
    state.scores[game][player][index]['num'] = currentTotalPoint
    state.currentIndexs[game] = state.currentIndexs[game] + 1
  },
  rollbackGameData(state, { game, index }) {
    let type = state.config.type
    let server, serverPoint, serveIndex, which
    let currentScore = state.scores[game]

    currentScore.forEach((v, i, arr) => {
      if (v[index - 1].num !== null) {
        server = i
        serverPoint = v[index - 1].num
      }
      let newScore = v.slice()
      newScore.fill({ num: null }, index)
      arr.splice(i, 1, newScore)
    })
    serveIndex = state.serves[game].indexOf(server)

    which = whichPoint(type, server)
    let score = []
    score[which.current] = serverPoint
    console.log(serverPoint)

    if (type === 0) {
      score[which.ohter] = Math.max(...currentScore[which.other])
    } else {
      const concatOtherArray = currentScore[which.other * 2].concat(
        currentScore[which.other * 2 + 1]
      )
      score[which.ohter] = Math.max(...concatOtherArray)
    }
    state.currentOrders[game] = serveIndex
    state.currentIndexs[game] = index - 1
    state.totalScores[game] = score
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
  setGamesResults(state, { game, current }) {
    state.gamesResults[current] += 1
    state.gamesEnds[game] = current
  },
  setCurrentOrders(state, { game, add }) {
    if (add) {
      state.currentOrders[game] = state.currentOrders[game] + 1
    } else {
      state.currentOrders[game] = 0
    }
  },
}
