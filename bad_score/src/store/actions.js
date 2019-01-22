import { whichPoint } from '../utils'

export default {
  init({ commit }, payload) {
    commit('init', payload)
  },
  setScore({ state, commit, getters, dispatch }, { game, player, index }) {
    const { type, maxPoint, setting } = state.config

    let which
    let currentTotalPoint
    let otherTotalPoint
    let orderObj = getters.newServeObj(game)
    let currentOrder = state.currentOrders[game]

    // 現在のゲームは勝敗が決まっているので終了
    if (state.gamesEnds[game] !== null) return

    // 直したい点数をロールバックする
    if (
      state.currentIndexs[game] > index &&
      index > 0 &&
      confirm('クリックした位置まで点数を戻しますか？')
    ) {
      commit('rollbackGameData', { game, index })
      return
    }

    // 現在のindexだけclickを許可
    if (state.currentIndexs[game] !== index) return

    // サーブ権を順番どおりに変更
    if (orderObj[currentOrder + 1] === player) {
      // サービスオーバーで得点
      dispatch('setCurrentOrders', { game, add: true })
    } else if (currentOrder + 1 === getters.length && orderObj[0] === player) {
      // サービスオーバーで得点 0からスタート
      dispatch('setCurrentOrders', { game, add: false })
    } else if (orderObj[currentOrder] !== player) {
      // 上記以外で順番が合わない場合は除く
      return
    }

    // どちらのチームに得点が入るか決める
    // isOtherは settingの際に必要
    which = whichPoint(type, player)

    // 点数を追加
    currentTotalPoint = state.totalScores[game][which.current] + 1
    otherTotalPoint = state.totalScores[game][which.other]

    const conditions = [
      currentTotalPoint === 30, // 30点は無条件で、終了フラグをたてる
      !setting && currentTotalPoint === maxPoint, // １ゲームの上限に到達したのでゲーム数を加算、終了フラグをたてる
      setting &&
        Math.abs(currentTotalPoint - otherTotalPoint) > 1 &&
        currentTotalPoint >= maxPoint, // セティングありの場合
    ]

    if (conditions.some(v => v)) {
      alert(`${game + 1}ゲーム終了です`)
      commit('setGamesResults', { game, current: which.current })
    }

    commit('setScore', {
      game,
      player,
      index,
      currentTotalPoint,
      current: which.current,
    })
  },
  setCurrentOrders({ commit }, { game, add }) {
    commit('setCurrentOrders', { game, add })
  },
  initGameData({ commit, dispatch }, { game, serve, add }) {
    commit('initGameData', { game, serve })
    dispatch('setCurrentOrders', { game, add })
  },
  initAllGameData({ commit }) {
    commit('initAllGameData')
  },
}
