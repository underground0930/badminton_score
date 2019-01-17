export default {
  setScore({ state, commit, getters, dispatch }, { game, player, index }) {
    const { type, point } = state.config
    let whichPoint
    let totalPoint
    let orderObj = getters.newServeObj(game)
    let currentOrder = state.currentOrders[game]

    // 現在のindexだけclickを許可
    if (state.currentIndexs[game] !== index) return

    // 現在のゲームは勝敗が決まっているので終了
    if (state.gamesEnds[game] === true) return

    // サーブ権を順番どおりに変更
    if (orderObj[currentOrder] === player) {
      // 同じ人が連続で得点
    } else if (orderObj[currentOrder + 1] === player) {
      // サービスオーバーで得点
      dispatch('updateCurrentOrders', { game, add: true })
    } else if (currentOrder + 1 === getters.length && orderObj[0] === player) {
      // サービスオーバーで得点 0からスタート
      dispatch('updateCurrentOrders', { game, add: false })
    } else {
      // 上記以外は除く
      return
    }

    // どちらのチームに得点が入るか決める
    if (type === 0) {
      whichPoint = player === 0 ? 0 : 1
    } else {
      whichPoint = player < 2 ? 0 : 1
    }

    // 点数を追加
    totalPoint = state.totalScore[game][whichPoint] + 1

    // １ゲームの上限に到達したのでゲーム数を加算、終了フラグをたてる
    if (totalPoint === point) {
      commit('updateGamesResults', { game, whichPoint })
    }

    commit('setScore', { game, player, index, totalPoint, whichPoint })
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
}
