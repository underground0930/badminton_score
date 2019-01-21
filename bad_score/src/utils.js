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
