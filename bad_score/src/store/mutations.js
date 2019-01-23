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
      newScore.forEach((v, i) => {
        if (i >= index) {
          newScore[i] = { num: null, index: i }
        }
      })
      arr.splice(i, 1, newScore)
    })
    serveIndex = state.serves[game][server]

    let score = []
    which = whichPoint(type, server)
    score[which.current] = serverPoint

    if (type === 0) {
      score[which.other] = currentScore[which.other].reduce((p, n) => {
        return Math.max(p, n.num)
      }, 0)
    } else {
      const concatOtherArray = currentScore[which.other * 2].concat(
        currentScore[which.other * 2 + 1]
      )
      score[which.other] = concatOtherArray.reduce((p, n) => {
        return Math.max(p, n.num)
      }, 0)
    }
    state.currentOrders[game] = serveIndex
    state.currentIndexs[game] = index
    state.totalScores.splice(game, 1, score)
  },
  initGameData(state, { game, serve }) {
    const newServe = serve || state.serves[game].slice()
    state.currentIndexs[game] = 1
    state.totalScores.splice(game, 1, [0, 0])
    state.scores.splice(game, 1, newServe.map(v => score(v, newServe)))
    if (serve) state.serves.splice(game, 1, serve)
    if (state.gamesEnds[game] !== null) {
      state.gamesResults[state.gamesEnds[game]] -= 1
      state.gamesEnds[game] = null
    }
  },
  initAllGameData(state) {
    state.currentIndexs = [1, 1, 1]
    state.currentOrders = [0, 0, 0]
    state.totalScores = [[0, 0], [0, 0], [0, 0]]
    state.gamesResults = [0, 0]
    state.gamesEnds = [null, null, null]
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
