export default {
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
}
