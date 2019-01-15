export const score = v => {
  let zero = null
  if (v !== '') {
    zero = 0
  }
  return [...Array(70)].map((item, index) => {
    if (index === 0) {
      return { num: zero, index: index }
    }
    return { num: null, index: index }
  })
}
