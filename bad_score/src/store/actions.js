export default {
  setScore({ state, commit, getters, dispatch }, { game, player, index }) {
    const { type, maxPoint, setting } = state.config
    let isCurrent
    let isOther
    let currentTotalPoint
    let otherTotalPoint
    let orderObj = getters.newServeObj(game)
    let currentOrder = state.currentOrders[game]

    // 現在のindexだけclickを許可
    if (state.currentIndexs[game] !== index) return

    // 現在のゲームは勝敗が決まっているので終了
    if (state.gamesEnds[game] === true) return

    // サーブ権を順番どおりに変更
    if (orderObj[currentOrder + 1] === player) {
      // サービスオーバーで得点
      dispatch(' setCurrentOrders', { game, add: true })
    } else if (currentOrder + 1 === getters.length && orderObj[0] === player) {
      // サービスオーバーで得点 0からスタート
      dispatch(' setCurrentOrders', { game, add: false })
    } else if (orderObj[currentOrder] !== player) {
      // 上記以外で順番が合わない場合は除く
      return
    }

    // どちらのチームに得点が入るか決める
    // isOtherは settingの際に必要
    if (type === 0) {
      if (player === 0) {
        isCurrent = 0
        isOther = 1
      } else {
        isCurrent = 1
        isOther = 0
      }
    } else {
      if (player < 2) {
        isCurrent = 0
        isOther = 1
      } else {
        isCurrent = 1
        isOther = 0
      }
    }

    // 点数を追加
    currentTotalPoint = state.totalScores[game][isCurrent] + 1
    otherTotalPoint = state.totalScores[game][isOther]

    /// /////// ここにセティングの処理を書く

    const conditions = {
      a: currentTotalPoint === 30, // 30点は無条件で、終了フラグをたてる
      b: !setting && currentTotalPoint === maxPoint, // １ゲームの上限に到達したのでゲーム数を加算、終了フラグをたてる
      c:
        setting &&
        Math.abs(currentTotalPoint - otherTotalPoint) > 1 &&
        currentTotalPoint >= maxPoint, // セティングありの場合
    }

    if (conditions['a'] || conditions['b'] || conditions['c']) {
      commit('setGamesResults', { game, isCurrent })
    }

    commit('setScore', { game, player, index, currentTotalPoint, isCurrent })
  },
  setCurrentOrders({ commit }, { game, add }) {
    commit(' setCurrentOrders', { game, add })
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
  initTotalScores({ commit }) {
    commit('initTotalScores')
  },
}
