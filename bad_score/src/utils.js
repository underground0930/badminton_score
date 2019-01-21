export const score = (v, arr) => {
  let zero = 0
  const isFour = arr.length === 4
  if ((isFour && v === 1) || (isFour && v === 2)) {
    zero = null
  }
  return [...Array(70)].map((item, index) => {
    if (index === 0) {
      return { num: zero }
    }
    return { num: null }
  })
}

export const whichPoint = (type, player) => {
  const obj = {}
  if (type === 0) {
    if (player === 0) {
      obj.current = 0
      obj.other = 1
    } else {
      obj.current = 1
      obj.other = 0
    }
  } else {
    if (player < 2) {
      obj.current = 0
      obj.other = 1
    } else {
      obj.current = 1
      obj.other = 0
    }
  }
  return obj
}
